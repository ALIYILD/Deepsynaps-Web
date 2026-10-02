import { createServer } from 'node:http';
import { isIP } from 'node:net';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { randomUUID, timingSafeEqual } from 'node:crypto';
import { MAX_BODY, sha256, sign } from './attestation.mjs';

// HTTP transport only: authorization and domain behavior remain in the handlers.
// No request header can select production/preview context or a client identity.
export function createFunctionServer({ functions, origin, published = true, maxBody = 6 * 1024 * 1024,
  timeoutMs = 60_000, maxRateKeys = 10_000, attestationSecret }) {
  if (maxBody > MAX_BODY || (attestationSecret && attestationSecret.length < 32)) throw new Error('Invalid ingress configuration');
  const base = new URL(origin);
  if (base.pathname !== '/' || base.search || base.hash || base.username || base.password
    || (base.protocol !== 'https:' && !(base.protocol === 'http:' && ['127.0.0.1', 'localhost'].includes(base.hostname)))) {
    throw new Error('A fixed HTTPS public origin is required');
  }
  const routes = new Map(), counters = new Map(), nonces = new Map();
  for (const entry of functions) {
    // Event handlers and schedules have no public endpoint on Netlify.
    if (entry.config?.schedule || typeof entry.handler !== 'function') continue;
    const paths = entry.config?.path ?? `/.netlify/functions/${entry.name}`;
    for (const path of Array.isArray(paths) ? paths : [paths]) {
      if (!path.startsWith('/') || /[:*?]/.test(path) || routes.has(path)) throw new Error('Unsupported or duplicate route');
      routes.set(path, entry);
    }
  }
  const json = (response, status, code) => {
    response.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' });
    response.end(JSON.stringify({ error: code }));
  };
  const server = createServer(async (incoming, outgoing) => {
    let timer;
    const abort = new AbortController();
    outgoing.on('close', () => { if (!outgoing.writableEnded) abort.abort(); });
    try {
      if (!incoming.url?.startsWith('/') || incoming.url.startsWith('//')) return json(outgoing, 400, 'invalid_path');
      const url = new URL(incoming.url, base);
      if (url.pathname === '/healthz' && incoming.method === 'GET') {
        outgoing.writeHead(200, { 'content-type': 'application/json', 'cache-control': 'no-store' });
        return outgoing.end(JSON.stringify({ status: 'ok', routes: routes.size, schedulers: 'disabled' }));
      }
      const entry = routes.get(url.pathname);
      if (!entry) return json(outgoing, 404, 'not_found');
      const methods = entry.config?.method;
      if (methods && !(Array.isArray(methods) ? methods : [methods]).includes(incoming.method)) return json(outgoing, 405, 'method_not_allowed');
      const peer = incoming.socket.remoteAddress?.replace(/^::ffff:/, '');
      if (!isIP(peer ?? '')) return json(outgoing, 400, 'invalid_peer');
      const declaredLength = Number(incoming.headers['content-length'] ?? 0);
      if (!Number.isSafeInteger(declaredLength) || declaredLength < 0 || declaredLength > maxBody) return json(outgoing, 413, 'payload_too_large');
      let size = 0;
      const chunks = [];
      for await (const chunk of incoming.iterator({ destroyOnReturn: false })) {
        size += chunk.length;
        if (size > maxBody) {
          outgoing.setHeader('connection', 'close');
          json(outgoing, 413, 'payload_too_large');
          incoming.resume();
          return;
        }
        chunks.push(chunk);
      }
      const body = Buffer.concat(chunks);
      let ip = peer;
      if (attestationSecret) {
        const timestamp = incoming.headers['x-ds-edge-ts'];
        const clientIp = incoming.headers['x-ds-edge-ip'];
        const nonce = incoming.headers['x-ds-edge-nonce'];
        const bodyHash = incoming.headers['x-ds-edge-body-sha'];
        const signature = incoming.headers['x-ds-edge-signature'];
        const now = Date.now();
        if (typeof timestamp !== 'string' || !/^\d{13}$/.test(timestamp) || Math.abs(now - Number(timestamp)) > 30_000
          || typeof clientIp !== 'string' || !isIP(clientIp)
          || typeof nonce !== 'string' || !/^[a-f0-9]{32}$/.test(nonce)
          || typeof bodyHash !== 'string' || !/^[a-f0-9]{64}$/.test(bodyHash)
          || typeof signature !== 'string' || !/^[a-f0-9]{64}$/.test(signature)
          || bodyHash !== await sha256(body)) return json(outgoing, 401, 'ingress_rejected');
        const expected = await sign(attestationSecret, { method: incoming.method, target: url.pathname + url.search,
          timestamp, clientIp, nonce, bodyHash });
        if (!timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expected, 'hex')))
          return json(outgoing, 401, 'ingress_rejected');
        if (nonces.size >= maxRateKeys) for (const [value, until] of nonces) if (until <= now) nonces.delete(value);
        if (nonces.has(nonce)) return json(outgoing, 401, 'ingress_rejected');
        if (nonces.size >= maxRateKeys) return json(outgoing, 503, 'ingress_capacity');
        nonces.set(nonce, now + 30_000);
        ip = clientIp;
      }
      const rate = entry.config?.rateLimit ?? { windowLimit: 60, windowSize: 60 };
      const now = Date.now(), key = `${entry.name}:${ip}`;
      if (counters.size >= maxRateKeys) for (const [stored, value] of counters) if (value.until <= now) counters.delete(stored);
      if (!counters.has(key) && counters.size >= maxRateKeys) return json(outgoing, 503, 'rate_capacity');
      let counter = counters.get(key);
      if (!counter || counter.until <= now) {
        counter = { count: 0, until: now + rate.windowSize * 1000 };
        counters.set(key, counter);
      }
      if (++counter.count > rate.windowLimit) return json(outgoing, 429, 'rate_limited');
      const headers = new Headers();
      for (const [name, value] of Object.entries(incoming.headers)) {
        if (['host', 'connection', 'transfer-encoding', 'forwarded', 'x-real-ip', 'true-client-ip', 'cf-connecting-ip'].includes(name)
          || name.startsWith('x-forwarded-') || name.startsWith('x-nf-') || name.startsWith('x-netlify-') || name.startsWith('x-ds-edge-')) continue;
        if (value !== undefined) headers.set(name, Array.isArray(value) ? value.join(', ') : value);
      }
      headers.set('x-nf-client-connection-ip', ip);
      const request = new Request(url, { method: incoming.method, headers, signal: abort.signal,
        ...(!['GET', 'HEAD'].includes(incoming.method) ? { body } : {}) });
      const background = [];
      const context = Object.freeze({ ip, requestId: randomUUID(), params: Object.freeze({}),
        deploy: Object.freeze({ context: published ? 'production' : 'branch-deploy', published }),
        waitUntil: promise => background.push(Promise.resolve(promise).catch(() => { console.error('background_function_failed'); })) });
      const expired = new Promise(resolve => {
        timer = setTimeout(() => { abort.abort(); resolve(new Response(null, { status: 504 })); }, timeoutMs);
      });
      const response = await Promise.race([Promise.resolve().then(() => entry.handler(request, context)), expired]);
      if (!(response instanceof Response)) throw new Error('Handler did not return Response');
      outgoing.statusCode = response.status;
      for (const [name, value] of response.headers) {
        if (!['set-cookie', 'connection', 'transfer-encoding', 'keep-alive', 'upgrade', 'trailer', 'proxy-authenticate', 'proxy-authorization', 'te'].includes(name)) outgoing.setHeader(name, value);
      }
      const cookies = response.headers.getSetCookie();
      if (cookies.length) outgoing.setHeader('set-cookie', cookies);
      outgoing.setHeader('x-content-type-options', 'nosniff');
      if (incoming.method === 'HEAD' || !response.body) outgoing.end();
      else await pipeline(Readable.fromWeb(response.body), outgoing);
      await Promise.allSettled(background);
    } catch {
      if (!outgoing.headersSent) json(outgoing, 500, 'request_failed');
      else outgoing.destroy();
      // Never log request body, credentials, URL queries or upstream exceptions.
      console.error('function_transport_failed');
    } finally { clearTimeout(timer); }
  });
  server.requestTimeout = timeoutMs;
  server.headersTimeout = Math.min(timeoutMs, 15_000);
  return server;
}
