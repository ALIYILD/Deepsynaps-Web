import { MAX_BODY, sha256, sign } from './attestation.mjs';

const BLOCKED = new Set(['host', 'connection', 'content-length', 'transfer-encoding', 'forwarded',
  'x-real-ip', 'true-client-ip', 'cf-connecting-ip']);

export function createEdgeProxy({ paths, env, fetcher = fetch }) {
  const allowed = new Set(paths);
  return async (request, context) => {
    const source = new URL(request.url);
    if (!allowed.has(source.pathname) || env.get('HETZNER_FUNCTIONS_PROXY') !== 'on') return context.next();
    const origin = env.get('HETZNER_FUNCTIONS_URL');
    const secret = env.get('HETZNER_EDGE_SECRET');
    let target;
    try { target = new URL(origin); } catch { return new Response('Backend unavailable', { status: 503 }); }
    if (target.protocol !== 'https:' || target.hostname !== 'api.deepsynaps.ai'
      || target.pathname !== '/' || target.search || target.hash || target.username || target.password
      || !secret || secret.length < 32 || !context.ip) return new Response('Backend unavailable', { status: 503 });
    if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY) return new Response('Request too large', { status: 413 });
    const chunks = []; let size = 0;
    try {
      if (!['GET', 'HEAD'].includes(request.method)) {
        const reader = request.body?.getReader();
        if (reader) {
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              size += value.byteLength;
              if (size > MAX_BODY) { await reader.cancel(); return new Response('Request too large', { status: 413 }); }
              chunks.push(value);
            }
          } finally { reader.releaseLock(); }
        }
      }
      const body = new Uint8Array(size); let offset = 0;
      for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
      const timestamp = Date.now().toString();
      const nonce = crypto.randomUUID().replaceAll('-', '');
      const bodyHash = await sha256(body);
      const targetPath = source.pathname + source.search;
      const signature = await sign(secret, { method: request.method, target: targetPath,
        timestamp, clientIp: context.ip, nonce, bodyHash });
      const headers = new Headers();
      for (const [name, value] of request.headers) {
        if (BLOCKED.has(name) || name.startsWith('x-forwarded-') || name.startsWith('x-nf-')
          || name.startsWith('x-netlify-') || name.startsWith('x-ds-edge-')) continue;
        headers.set(name, value);
      }
      headers.set('x-ds-edge-ts', timestamp);
      headers.set('x-ds-edge-ip', context.ip);
      headers.set('x-ds-edge-nonce', nonce);
      headers.set('x-ds-edge-body-sha', bodyHash);
      headers.set('x-ds-edge-signature', signature);
      return await fetcher(new URL(targetPath, target), { method: request.method, headers,
        redirect: 'manual', signal: AbortSignal.timeout(35_000),
        ...(!['GET', 'HEAD'].includes(request.method) ? { body } : {}) });
    } catch {
      return new Response('Backend unavailable', { status: 503 });
    }
  };
}
