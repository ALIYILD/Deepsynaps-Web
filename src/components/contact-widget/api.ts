/**
 * The only network the widget does.
 *
 * Both shapes go to the same endpoint, because the function carries both and a
 * single origin keeps the site's connect surface to one address.
 *
 * A NON-OK RESPONSE IS NOT A THROW. The function answers refusals with a status
 * and a machine code — `consent_required`, `lead_service_unavailable` — and the
 * caller needs to tell those apart to show the right sentence. So a refusal
 * comes back as a resolved `{ ok: false, code }` and only a genuinely broken
 * request (no network, unparseable body) becomes an exception.
 */
import type { ChatTurn, LeadPayload } from './types';

const ENDPOINT = '/.netlify/functions/deepy';
const SESSION_KEY = 'deepsynaps.contact.session';
/** The function accepts at most 12 turns; send the most recent ones. */
const MAX_HISTORY = 12;

export type SiteId = 'web' | 'academy' | 'lab';

export interface AskResult {
  answer: string;
  state: 'answered' | 'needs_human';
  source: string;
  session_id: string | null;
}

export type Outcome<T> = { ok: true; value: T } | { ok: false; code: string };

/**
 * One id per browser tab, minted here and kept in `sessionStorage`.
 *
 * It groups the turns of one conversation in the Telegram ping and nothing
 * else: it carries no identity, is not a credential, and the server treats it
 * as an opaque uuid. `sessionStorage` rather than `localStorage` because a
 * conversation is a visit, not a person — and it is wrapped, because private
 * windows and blocked site data make every storage access throwable.
 */
export function sessionId(): string | null {
  try {
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const minted = crypto.randomUUID();
    window.sessionStorage.setItem(SESSION_KEY, minted);
    return minted;
  } catch {
    return null;
  }
}

const currentPage = () => {
  try {
    return `${window.location.pathname}${window.location.hash}` || '/';
  } catch {
    return '/';
  }
};

async function post<T>(body: unknown): Promise<Outcome<T>> {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30_000),
  });

  let parsed: unknown = null;
  try {
    parsed = await response.json();
  } catch {
    if (!response.ok) return { ok: false, code: 'request_failed' };
    throw new Error('unparseable_response');
  }

  if (!response.ok) {
    const code = (parsed as { error?: unknown } | null)?.error;
    return { ok: false, code: typeof code === 'string' ? code : 'request_failed' };
  }
  return { ok: true, value: parsed as T };
}

export function ask(site: SiteId, question: string, history: ChatTurn[]): Promise<Outcome<AskResult>> {
  return post<AskResult>({
    site,
    question,
    page: currentPage(),
    session_id: sessionId(),
    history: history.slice(-MAX_HISTORY).map((turn) => ({ role: turn.role, content: turn.content })),
  });
}

export function sendLead(
  site: SiteId,
  lead: LeadPayload,
  history: ChatTurn[],
): Promise<Outcome<{ ok: true }>> {
  return post<{ ok: true }>({
    action: 'lead',
    site,
    page: currentPage(),
    session_id: sessionId(),
    history: history.slice(-MAX_HISTORY).map((turn) => ({ role: turn.role, content: turn.content })),
    lead,
  });
}
