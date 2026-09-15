/**
 * Deepy — the public visitor assistant for all three DeepSynaps sites.
 *
 * TWO SHAPES, ONE ENDPOINT. A body with no `action` is a question. A body with
 * `action: 'lead'` is a consented contact request. They share this endpoint so
 * one CORS allow-list and one rate limit cover both, and so the widget has a
 * single network origin to declare.
 *
 * THREE SITES, ONE FUNCTION. This is deployed with the React site on
 * deepsynaps.com, and the academy and lab pages call it cross-origin from their
 * own domains. The `site` field of the request selects the knowledge module and
 * the persona; the `Origin` header decides whether the caller may call at all.
 * Those are separate questions and are answered separately.
 *
 * DEGRADATION IS ASYMMETRIC, DELIBERATELY. Every dependency of the QUESTION
 * path is optional and fails to something honest: no model key means the
 * knowledge base answers by keyword, no match means a reviewed sentence, no
 * Telegram means no ping. The LEAD path is the exception: Telegram is REQUIRED,
 * because a contact request that reaches nobody must never be reported as sent.
 *
 * WHERE THE REST OF IT LIVES. `_deepy/` is not a function directory — Netlify
 * ignores a leading underscore — so those files are bundled into this one.
 */
import Anthropic from '@anthropic-ai/sdk';
import { Refused, UUID_PATTERN, corsDecision, corsHeaders, json } from './_deepy/common.mjs';
import { SITE_IDS, isSiteId, siteFor } from './_deepy/sites.mjs';
import { SAFETY_COPY, classify } from './_deepy/safety.mjs';
import { keywordAnswer } from './_deepy/knowledge/index.mjs';
import { askModel, modelFailureDetail, resolveProvider } from './_deepy/model.mjs';
import { isTelegramConfigured, notifyLead, notifyQuestion } from './_deepy/telegram.mjs';
import { readLeadRequest, summarise } from './_deepy/lead.mjs';
import { storeLead, supabaseConfig } from './_deepy/store.mjs';
import { clientIp, rateLimit, visitorHashFor } from './_deepy/visitor.mjs';

export { resolveProvider, SITE_IDS };

const MAX_BODY = 16_000;
const MAX_QUESTION = 1800;
const MAX_HISTORY_TURNS = 12;
const MAX_HISTORY_CHARS = 2000;
const PAGE_PATTERN = /^\/[A-Za-z0-9\-/_#?=&.]{0,300}$/;

export const defaultDeps = {
  fetch: (...args) => globalThis.fetch(...args),
  createModelClient: (apiKey) => new Anthropic({ apiKey, timeout: 20_000, maxRetries: 1 }),
  now: () => new Date(),
};

/* ------------------------------------------------------------ validation */

function readBody(raw) {
  let body;
  try { body = JSON.parse(raw); } catch { throw new Refused(400, 'malformed_body'); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Refused(400, 'malformed_body');
  return body;
}

/** Which of the three properties is asking. Refused rather than defaulted: a
 *  caller that names the wrong site would get answers about the wrong company. */
function readSite(body) {
  if (body.site === undefined || body.site === null || body.site === '') return 'web';
  if (!isSiteId(body.site)) throw new Refused(422, 'invalid_site');
  return body.site;
}

/** The transcript the widget is carrying in memory. */
function readHistory(body) {
  const history = [];
  if (body.history === undefined) return history;
  if (!Array.isArray(body.history) || body.history.length > MAX_HISTORY_TURNS) {
    throw new Refused(422, 'invalid_history');
  }
  for (const turn of body.history) {
    if (!turn || typeof turn !== 'object' || Array.isArray(turn)) throw new Refused(422, 'invalid_history');
    if (turn.role !== 'user' && turn.role !== 'assistant') throw new Refused(422, 'invalid_history');
    if (typeof turn.content !== 'string' || turn.content.length > MAX_HISTORY_CHARS) {
      throw new Refused(422, 'invalid_history');
    }
    history.push({ role: turn.role, content: turn.content });
  }
  return history;
}

function readPage(body) {
  if (body.page === undefined || body.page === null || body.page === '') return '/';
  if (typeof body.page !== 'string' || !PAGE_PATTERN.test(body.page)) throw new Refused(422, 'invalid_page');
  return body.page;
}

/** The widget mints this in sessionStorage; it groups turns, and nothing more. */
function readSession(body) {
  if (body.session_id === undefined || body.session_id === null || body.session_id === '') return null;
  if (typeof body.session_id !== 'string' || !UUID_PATTERN.test(body.session_id)) {
    throw new Refused(422, 'invalid_session');
  }
  return body.session_id;
}

function readQuestion(body) {
  const question = typeof body.question === 'string' ? body.question.trim() : '';
  if (question.length < 1 || question.length > MAX_QUESTION) throw new Refused(422, 'invalid_question');
  return question;
}

/* ------------------------------------------------------------ the lead */

/**
 * A consented contact request.
 *
 * Order matters. Every field is validated before anything leaves this process,
 * so a missing consent or an interest outside the published set costs no
 * upstream call. Only then is Telegram required — and if it is missing the
 * visitor is told, because a contact request that reaches no one must never be
 * reported as a success. The Supabase copy is attempted afterwards and cannot
 * change the outcome.
 */
async function handleLead(body, env, deps, cors) {
  const site = readSite(body);
  const page = readPage(body);
  const history = readHistory(body);
  // Chat leads carry the conversation as the context; the two site forms carry
  // a written message instead, so those require one.
  const fromChat = typeof body.lead?.source === 'string' && body.lead.source.startsWith('chat-');
  const lead = readLeadRequest(body, { requireMessage: !fromChat });
  const now = deps.now();

  if (!isTelegramConfigured(env)) {
    console.warn('[deepy] lead refused: telegram not configured');
    return json(503, { error: 'lead_service_unavailable' }, cors);
  }

  const summary = fromChat ? summarise(history) : null;
  const delivered = await notifyLead(deps, env, {
    site,
    source: lead.source,
    fullName: lead.fullName,
    email: lead.email,
    phone: lead.phone,
    organisation: lead.organisation,
    interest: lead.interest,
    message: lead.message,
    summary,
    page,
    at: now,
  });

  if (!delivered) {
    // Telegram accepted nothing. The consent was taken and the request reached
    // no one, so this is a 502 rather than a receipt.
    return json(502, { error: 'lead_not_delivered' }, cors);
  }

  // Durable copy, best effort, after delivery. Its failure is logged inside
  // `storeLead` and never reaches the visitor.
  await storeLead(deps, supabaseConfig(env), lead, {
    site, page, summary, consentAt: now.toISOString(),
  });

  // No identifier travels back: the browser has no use for one.
  return json(200, { ok: true }, cors);
}

/* ------------------------------------------------------------ the question */

async function handleQuestion(body, env, deps, cors) {
  const site = readSite(body);
  const question = readQuestion(body);
  const page = readPage(body);
  const history = readHistory(body);
  const sessionId = readSession(body);

  // Safety before helpfulness, and before the model: these two answers are
  // reviewed sentences, not generated ones, and no visitor text can move them.
  const intent = classify(question);
  let answer = null;
  let state = 'answered';
  let source = 'boundary';

  if (intent === 'clinical') answer = SAFETY_COPY.clinical;
  else if (intent === 'privacy') answer = SAFETY_COPY.privacy;
  else {
    const provider = resolveProvider(env);
    if (provider) {
      try {
        const result = await askModel(deps, provider, { question, page, site, history });
        if (result) { answer = result.answer; state = result.state; source = 'model'; }
      } catch (error) {
        console.warn(`[deepy] model unavailable (${provider.kind}): ${modelFailureDetail(error)}`);
      }
    }
    if (answer === null) {
      const fallback = keywordAnswer(site, question);
      if (fallback) { answer = fallback.answer; state = 'answered'; source = 'kb'; }
      else {
        answer = provider ? SAFETY_COPY.noAnswer : SAFETY_COPY.noModel;
        state = 'needs_human';
        source = 'none';
      }
    }
  }

  await notifyQuestion(deps, env, {
    site, page, question, answer, state, source, sessionId, at: deps.now(),
  });

  return json(200, {
    answer, state, source, site, session_id: sessionId, contact_offer: true,
  }, cors);
}

/* ----------------------------------------------------------------- entry */

export default async function handler(request, context, deps = defaultDeps) {
  const origin = request.headers?.get('origin') ?? null;
  const decision = corsDecision(origin);
  if (!decision.allowed) {
    // No CORS headers on a refusal: granting them would tell a disallowed
    // origin that it is talking to something willing to answer.
    return json(403, { error: 'origin_not_allowed' }, { vary: 'origin' });
  }
  const cors = corsHeaders(decision.origin);

  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

  try {
    if (request.method !== 'POST') return json(405, { error: 'method_not_allowed' }, cors);

    const raw = await request.text();
    if (raw.length > MAX_BODY) return json(413, { error: 'payload_too_large' }, cors);

    const body = readBody(raw);
    const env = (context && context.env) || process.env;

    const isLead = body.action !== undefined;
    if (isLead && body.action !== 'lead') throw new Refused(422, 'invalid_action');

    const identity = visitorHashFor(clientIp(request.headers), (env.HERMES_VISITOR_SALT || '').trim());
    const limit = rateLimit(identity, isLead ? 'lead' : 'question', deps.now().getTime());
    if (!limit.allowed) {
      return json(429, { error: 'rate_limited' }, { ...cors, 'retry-after': String(limit.retryAfter) });
    }

    return isLead
      ? await handleLead(body, env, deps, cors)
      : await handleQuestion(body, env, deps, cors);
  } catch (error) {
    if (error instanceof Refused) return json(error.status, { error: error.code }, cors);
    console.error(`[deepy] unhandled: ${error?.name ?? 'Error'}`);
    return json(500, { error: 'request_failed' }, cors);
  }
}

/** Netlify's edge-level cap. The in-memory limiter is a per-container brake on
 *  top of this, not a substitute for it. */
export const config = {
  rateLimit: { windowLimit: 20, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};

export { siteFor };
