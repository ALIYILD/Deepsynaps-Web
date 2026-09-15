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
  const self = 'https://deepsynaps.com/.netlify/functions/deepy';
  assert.equal(corsDecision('https://evil.example', self).allowed, false);
  assert.equal(corsDecision('https://deepsynaps.com.evil.example', self).allowed, false);
  // A near miss on the allow-list: the scheme matters there, and with no
  // request URL there is no same-host rule to fall back on.
  assert.equal(corsDecision('http://deepsynaps.com').allowed, false);
});

test('the same-host rule deliberately ignores the scheme, and that is not a hole', () => {
  // http://deepsynaps.com is NOT on the allow-list, yet it is allowed when the
  // function is itself being served from deepsynaps.com. That is the documented
  // consequence of comparing hosts: it is the same site, and the host still has
  // to match exactly. Pinned so the behaviour is a decision, not a surprise.
  assert.equal(
    corsDecision('http://deepsynaps.com', 'https://deepsynaps.com/.netlify/functions/deepy').allowed,
    true,
  );
  // Whereas the same origin against a DIFFERENT host is refused as ever.
  assert.equal(
    corsDecision('http://deepsynaps.com', 'https://deepsynapslab.com/.netlify/functions/deepy').allowed,
    false,
  );
});

test('a page may always call the function on the host it was served from', () => {
  // The bug this fixes: on a deploy preview the React widget calls its own
  // relative /.netlify/functions/deepy, so the browser sends the preview host
  // as the Origin. No fixed allow-list can contain it — every preview and
  // branch deploy invents a new hostname — and refusing it refused the site
  // its own function.
  const preview = 'https://deploy-preview-1--deepsynaps-web.netlify.app';
  const decision = corsDecision(preview, preview + '/.netlify/functions/deepy');
  assert.equal(decision.allowed, true);
  assert.equal(decision.origin, preview);
});

test('the host must match exactly — another netlify.app deployment is still foreign', () => {
  const self = 'https://deploy-preview-1--deepsynaps-web.netlify.app/.netlify/functions/deepy';
  for (const origin of [
    'https://deploy-preview-2--deepsynaps-web.netlify.app',
    'https://someone-elses-site.netlify.app',
    'https://evil--deepsynaps-web.netlify.app',
    // A suffix that merely ends with the real host is not the real host.
    'https://not-deploy-preview-1--deepsynaps-web.netlify.app',
  ]) {
    assert.equal(corsDecision(origin, self).allowed, false, `${origin} must be refused`);
  }
});

test('same-host allowance compares hosts, not schemes, so a proxied http request URL still works', () => {
  // `netlify dev` and some proxies hand the function an http:// request URL
  // while the browser reports the https:// origin for the same site. Treating
  // that as foreign would reintroduce the same bug one layer down.
  const decision = corsDecision(
    'https://deploy-preview-1--deepsynaps-web.netlify.app',
    'http://deploy-preview-1--deepsynaps-web.netlify.app/.netlify/functions/deepy',
  );
  assert.equal(decision.allowed, true);
});

test('a malformed Origin is refused rather than crashing the comparison', () => {
  const self = 'https://deepsynaps.com/.netlify/functions/deepy';
  for (const origin of ['null', 'not a url', '://', 'https://']) {
    assert.equal(corsDecision(origin, self).allowed, false, `${origin} must be refused`);
  }
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

test('the handler answers a POST from a preview host it is itself served from', async () => {
  resetRateLimits();
  const preview = 'https://deploy-preview-1--deepsynaps-web.netlify.app';
  const request = new Request(`${preview}/.netlify/functions/deepy`, {
    method: 'POST',
    headers: { origin: preview, 'content-type': 'application/json' },
    body: JSON.stringify({ site: 'web', question: 'what services do you offer?' }),
  });
  const response = await handler(request, { env: {} }, deps);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('access-control-allow-origin'), preview);
});

test('the handler still refuses a foreign origin on that same preview host', async () => {
  resetRateLimits();
  const request = new Request('https://deploy-preview-1--deepsynaps-web.netlify.app/.netlify/functions/deepy', {
    method: 'POST',
    headers: { origin: 'https://someone-elses-site.netlify.app', 'content-type': 'application/json' },
    body: JSON.stringify({ question: 'hi' }),
  });
  const response = await handler(request, { env: {} }, deps);
  assert.equal(response.status, 403);
  assert.equal(response.headers.get('access-control-allow-origin'), null);
});
