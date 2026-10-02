import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { after, test } from 'node:test';
import { createFunctionServer } from './runtime.mjs';
import { createEdgeProxy } from './edge-proxy.mjs';
import { sha256, sign } from './attestation.mjs';
import deepy, { config as deepyConfig } from '../../netlify/functions/deepy.mjs';
import { resetRateLimits } from '../../netlify/functions/_deepy/visitor.mjs';

const servers = [];
after(async () => { for (const server of servers) await new Promise(resolve => server.close(resolve)); });

async function start(secret) {
  const server = createFunctionServer({
    origin: 'https://deepsynaps.ai', attestationSecret: secret,
    functions: [{ name: 'deepy', config: { rateLimit: { windowLimit: 20, windowSize: 60 } },
      handler: async (request, context) => Response.json({
        ip: context.ip, headerIp: request.headers.get('x-nf-client-connection-ip'),
        origin: new URL(request.url).origin, body: await request.text(),
        spoof: request.headers.get('x-forwarded-for'),
      }) }],
  });
  servers.push(server);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  return `http://127.0.0.1:${server.address().port}/.netlify/functions/deepy`;
}

test('production ingress refuses unsigned, tampered and replayed requests', async () => {
  const secret = 'synthetic-only-secret-value-over-32-bytes';
  const url = await start(secret);
  const body = JSON.stringify({ question: 'Synthetic test', site: 'web' });
  assert.equal((await fetch(url, { method: 'POST', body })).status, 401);
  const fields = { method: 'POST', target: '/.netlify/functions/deepy',
    timestamp: String(Date.now()), clientIp: '203.0.113.7',
    nonce: randomBytes(16).toString('hex'), bodyHash: await sha256(new TextEncoder().encode(body)) };
  const headers = { 'x-ds-edge-ts': fields.timestamp, 'x-ds-edge-ip': fields.clientIp,
    'x-ds-edge-nonce': fields.nonce, 'x-ds-edge-body-sha': fields.bodyHash,
    'x-ds-edge-signature': await sign(secret, fields), 'x-nf-client-connection-ip': '198.51.100.1',
    'x-forwarded-for': '198.51.100.2' };
  const valid = await fetch(url, { method: 'POST', headers, body });
  assert.equal(valid.status, 200);
  assert.deepEqual(await valid.json(), { ip: fields.clientIp, headerIp: fields.clientIp,
    origin: 'https://deepsynaps.ai', body, spoof: null });
  assert.equal((await fetch(url, { method: 'POST', headers, body })).status, 401);
  assert.equal((await fetch(url, { method: 'POST', headers: { ...headers,
    'x-ds-edge-nonce': randomBytes(16).toString('hex') }, body })).status, 401);
});

test('Netlify edge switch keeps original function until enabled and validates target', async () => {
  const request = new Request('https://deepsynaps.ai/.netlify/functions/deepy', { method: 'POST', body: '{}' });
  const original = new Response('original');
  let called = 0;
  const context = { ip: '203.0.113.9', next: () => { called++; return original; } };
  const off = createEdgeProxy({ paths: ['/.netlify/functions/deepy'], env: { get: () => undefined },
    fetcher: () => { throw new Error('unexpected backend call'); } });
  assert.equal(await off(request, context), original);
  assert.equal(called, 1);
  const wrong = createEdgeProxy({ paths: ['/.netlify/functions/deepy'],
    env: { get: key => ({ HETZNER_FUNCTIONS_PROXY: 'on',
      HETZNER_FUNCTIONS_URL: 'https://untrusted.example',
      HETZNER_EDGE_SECRET: 'synthetic-only-secret-value-over-32-bytes' })[key] } });
  assert.equal((await wrong(request, context)).status, 503);
});

test('enabled edge signer forwards exact bytes only to approved DeepSynaps origin', async () => {
  const raw = new Uint8Array([123, 34, 120, 34, 58, 49, 125]);
  let forwarded;
  const proxy = createEdgeProxy({ paths: ['/.netlify/functions/deepy'],
    env: { get: key => ({ HETZNER_FUNCTIONS_PROXY: 'on',
      HETZNER_FUNCTIONS_URL: 'https://api.deepsynaps.ai',
      HETZNER_EDGE_SECRET: 'synthetic-only-secret-value-over-32-bytes' })[key] },
    fetcher: async (url, init) => { forwarded = { url: String(url), ...init }; return new Response('target'); } });
  const request = new Request('https://deepsynaps.ai/.netlify/functions/deepy?test=1', {
    method: 'POST', headers: { 'x-forwarded-for': '198.51.100.2', 'x-ds-edge-ip': '198.51.100.1' }, body: raw });
  const result = await proxy(request, { ip: '203.0.113.9', next: () => { throw new Error('unexpected next'); } });
  assert.equal(result.status, 200);
  assert.equal(forwarded.url, 'https://api.deepsynaps.ai/.netlify/functions/deepy?test=1');
  assert.deepEqual(forwarded.body, raw);
  assert.equal(forwarded.headers.get('x-ds-edge-ip'), '203.0.113.9');
  assert.equal(forwarded.headers.get('x-forwarded-for'), null);
  assert.match(forwarded.headers.get('x-ds-edge-signature'), /^[a-f0-9]{64}$/);
});

test('real Deepy handler answers synthetic Academy question and refuses undeliverable lead', async () => {
  resetRateLimits();
  const server = createFunctionServer({ origin: 'https://deepsynaps.ai', maxBody: 16_000,
    functions: [{ name: 'deepy', config: deepyConfig,
      handler: (request, context) => deepy(request, { ...context, env: {} }) }] });
  servers.push(server);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/.netlify/functions/deepy`;
  const headers = { origin: 'https://deepsynapsacademy.com', 'content-type': 'application/json' };
  const question = await fetch(url, { method: 'POST', headers,
    body: JSON.stringify({ site: 'academy', page: '/', question: 'What is DeepSynaps Academy?' }) });
  assert.equal(question.status, 200);
  const answer = await question.json();
  assert.equal(answer.site, 'academy');
  assert.ok(answer.answer.length > 10);
  const lead = await fetch(url, { method: 'POST', headers, body: JSON.stringify({
    action: 'lead', site: 'academy', page: '/',
    lead: { fullName: 'Synthetic Clinician', email: 'synthetic@example.com',
      interest: 'academy-waitlist', source: 'academy-signup',
      message: 'Synthetic rehearsal only.', consent: true },
  }) });
  assert.equal(lead.status, 503);
  assert.deepEqual(await lead.json(), { error: 'lead_service_unavailable' });
});
