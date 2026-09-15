/**
 * The CORS boundary.
 *
 * This is the one piece of the function that exists only because three
 * properties share one endpoint, so it is the piece with no precedent to
 * inherit and the piece most worth pinning. The rule under test: exactly five
 * origins may call, an `Origin` outside that set gets 403 with no
 * `access-control-allow-origin` at all, and a preflight is answered.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../deepy.mjs';
import { ALLOWED_ORIGINS, corsDecision } from './common.mjs';
import { resetRateLimits } from './visitor.mjs';

const post = (origin, body = { question: 'hello' }) => new Request('https://deepsynaps.com/.netlify/functions/deepy', {
  method: 'POST',
  headers: origin ? { origin, 'content-type': 'application/json' } : { 'content-type': 'application/json' },
  body: JSON.stringify(body),
});

const deps = {
  fetch: async () => { throw new Error('no network in tests'); },
  createModelClient: () => { throw new Error('no model in tests'); },
  now: () => new Date('2026-09-15T10:00:00Z'),
};

test('every allowed origin is accepted and echoed back', () => {
  for (const origin of ALLOWED_ORIGINS) {
    const decision = corsDecision(origin);
    assert.equal(decision.allowed, true, `${origin} should be allowed`);
  }
  assert.deepEqual([...ALLOWED_ORIGINS], [
    'https://deepsynaps.com',
    'https://deepsynapsacademy.com',
    'https://deepsynapslab.com',
    'http://localhost:5173',
    'http://localhost:8888',
  ]);
});

test('a request with no Origin is same-origin and carries no CORS grant', () => {
  const decision = corsDecision(null);
  assert.equal(decision.allowed, true);
  assert.equal(decision.origin, null);
});

test('an unknown origin is refused', () => {
  assert.equal(corsDecision('https://evil.example').allowed, false);
  assert.equal(corsDecision('https://deepsynaps.com.evil.example').allowed, false);
  // A near miss: the scheme matters.
  assert.equal(corsDecision('http://deepsynaps.com').allowed, false);
});

test('handler answers a preflight from an allowed origin with 204 and the grant', async () => {
  resetRateLimits();
  const request = new Request('https://deepsynaps.com/.netlify/functions/deepy', {
    method: 'OPTIONS',
    headers: { origin: 'https://deepsynapsacademy.com' },
  });
  const response = await handler(request, { env: {} }, deps);
  assert.equal(response.status, 204);
  assert.equal(response.headers.get('access-control-allow-origin'), 'https://deepsynapsacademy.com');
  assert.match(response.headers.get('access-control-allow-methods') ?? '', /POST/);
  assert.equal(response.headers.get('vary'), 'origin');
});

test('handler refuses a POST from a disallowed origin with 403 and no grant', async () => {
  resetRateLimits();
  const response = await handler(post('https://evil.example'), { env: {} }, deps);
  assert.equal(response.status, 403);
  assert.deepEqual(await response.json(), { error: 'origin_not_allowed' });
  assert.equal(response.headers.get('access-control-allow-origin'), null);
});

test('handler refuses a preflight from a disallowed origin too', async () => {
  resetRateLimits();
  const request = new Request('https://deepsynaps.com/.netlify/functions/deepy', {
    method: 'OPTIONS',
    headers: { origin: 'https://evil.example' },
  });
  const response = await handler(request, { env: {} }, deps);
  assert.equal(response.status, 403);
});

test('handler allows a POST from the lab site and grants that exact origin', async () => {
  resetRateLimits();
  const response = await handler(
    post('https://deepsynapslab.com', { site: 'lab', question: 'what are the HAC chips?' }),
    { env: {} },
    deps,
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('access-control-allow-origin'), 'https://deepsynapslab.com');
});

test('a GET is refused as method_not_allowed, not silently answered', async () => {
  resetRateLimits();
  const request = new Request('https://deepsynaps.com/.netlify/functions/deepy', {
    method: 'GET',
    headers: { origin: 'https://deepsynaps.com' },
  });
  const response = await handler(request, { env: {} }, deps);
  assert.equal(response.status, 405);
});
