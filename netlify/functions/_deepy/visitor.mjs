/**
 * Who is calling, and how often they may.
 *
 * THE HASH IS DERIVED, NEVER SUPPLIED. The Türkiye deployment learned this the
 * expensive way: a per-visitor rate limit keyed on a value the browser
 * generates is a courtesy, because the browser can rotate it. The identity here
 * comes from the real client address plus a server-side salt the browser never
 * sees. With no salt configured there is no per-visitor identity, and the
 * limiter falls back to a single shared bucket rather than pretending.
 *
 * IN-MEMORY, AND HONEST ABOUT IT. Netlify runs many containers, so this caps
 * abuse per container rather than globally. It is a brake on a loop in one
 * browser tab, not a defence against a distributed flood; Netlify's own
 * `config.rateLimit` in `deepy.mjs` is the edge-level cap. Keeping it in memory
 * means no store to provision and no failure mode where the limiter's outage
 * takes the assistant down with it.
 */
import { createHash } from 'node:crypto';

/**
 * Salted hash of the client IP. Exported for the test: the salt must actually
 * change the output, or a rainbow table over the IPv4 space defeats it.
 */
export function visitorHashFor(ip, salt) {
  if (!ip || !salt) return null;
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32);
}

/**
 * Netlify sets `x-nf-client-connection-ip`; `x-forwarded-for` is the fallback
 * and its FIRST entry is the client. Taking the last would let a caller prepend
 * a forged address and mint a new bucket per request.
 */
export function clientIp(headers) {
  const direct = headers.get('x-nf-client-connection-ip');
  if (direct) return direct.trim();
  const fwd = headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return null;
}

const WINDOW_MS = 60_000;
const QUESTION_LIMIT = 12;
const LEAD_LIMIT = 4;
/** Above this many tracked identities the oldest windows are dropped, so a
 *  long-lived container cannot grow this map without bound. */
const MAX_BUCKETS = 5000;

const buckets = new Map();

function prune(now) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
  if (buckets.size <= MAX_BUCKETS) return;
  // Map preserves insertion order, so the head is the oldest window.
  const excess = buckets.size - MAX_BUCKETS;
  let dropped = 0;
  for (const key of buckets.keys()) {
    buckets.delete(key);
    if (++dropped >= excess) break;
  }
}

/**
 * One call per request. `kind` separates the two budgets: a visitor who has
 * used up their questions can still send the one contact request that the
 * conversation was for.
 */
export function rateLimit(identity, kind, now = Date.now()) {
  prune(now);
  const limit = kind === 'lead' ? LEAD_LIMIT : QUESTION_LIMIT;
  const key = `${kind}:${identity ?? 'anonymous'}`;
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }
  if (bucket.count >= limit) {
    return { allowed: false, retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)) };
  }
  bucket.count += 1;
  return { allowed: true, retryAfter: 0 };
}

/** Test seam only: the limiter is process-wide state and tests must not inherit it. */
export function resetRateLimits() {
  buckets.clear();
}
