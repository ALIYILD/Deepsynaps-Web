/**
 * The small primitives every Deepy module needs, plus the CORS boundary.
 *
 * `netlify/functions/_deepy/` is not a function directory: Netlify skips any
 * path segment beginning with `_`, so these files are bundled INTO `deepy.mjs`
 * by esbuild and are never routed to as endpoints of their own.
 *
 * CORS MATTERS HERE in a way it does not on a single-origin site. One function,
 * deployed with the React site on deepsynaps.com, answers three properties:
 * the academy and lab sites are separate Netlify deployments on their own
 * domains and reach this endpoint cross-origin. So the allow-list is an
 * explicit, closed set rather than a reflected `Origin`, and an origin outside
 * it is refused with 403 before any body is read.
 */

/** Exactly the origins that may call this function. Nothing is reflected. */
export const ALLOWED_ORIGINS = Object.freeze([
  'https://deepsynaps.com',
  'https://deepsynapsacademy.com',
  'https://deepsynapslab.com',
  'http://localhost:5173',
  'http://localhost:8888',
]);

export const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * A same-origin request (no `Origin` header, e.g. curl or a server-side call)
 * is allowed and gets no CORS headers, because there is nothing to grant. A
 * request that names an origin gets a decision: allowed, or refused.
 */
export function corsDecision(origin) {
  if (origin === null || origin === undefined || origin === '') {
    return { allowed: true, origin: null };
  }
  return { allowed: ALLOWED_ORIGINS.includes(origin), origin };
}

/** `vary: origin` is not optional: the response differs per origin and a CDN must not mix them. */
export function corsHeaders(origin) {
  const base = { vary: 'origin' };
  if (!origin) return base;
  return {
    ...base,
    'access-control-allow-origin': origin,
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'access-control-max-age': '86400',
  };
}

export const json = (status, value, extraHeaders = {}) => new Response(JSON.stringify(value), {
  status,
  headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...extraHeaders },
});

/** A refusal that must reach the caller as a status code, not as an answer. */
export class Refused extends Error {
  constructor(status, code) { super(code); this.status = status; this.code = code; }
}

export const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const clip = (value, limit) => (value.length > limit ? `${value.slice(0, limit - 1)}…` : value);
