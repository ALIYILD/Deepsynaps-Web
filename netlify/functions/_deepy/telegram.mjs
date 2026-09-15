/**
 * What the operations team sees, and what it must never see.
 *
 * Two messages, one transport. The per-question ping is high volume and low
 * signal; a contact request is the opposite, so it gets its own header, its own
 * shape and every field needed to pick up the phone. Both are built here so the
 * privacy rule is stated once: NO client IP and NO visitor hash travel to a
 * chat room. That identity is derived from the client address to cap abuse, not
 * to follow a person.
 *
 * THE LEAD MESSAGE MUST BE ENOUGH TO REPLY TO THE PERSON, on its own, with no
 * other system open. That is a requirement rather than a courtesy: Telegram is
 * the only delivery this deployment guarantees — the Supabase store is optional
 * and there is no CRM behind it. A field left empty prints an em dash rather
 * than vanishing, so the reader can tell "not given" from "not shown".
 */
import { escapeHtml, clip } from './common.mjs';
import { interestLabel } from './lead.mjs';
import { siteFor } from './sites.mjs';

let telegramNoticeLogged = false;

const stamp = (at) => new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/London', dateStyle: 'short', timeStyle: 'short',
}).format(at);

/** Resolves the chat ids, or explains once per container why there are none. */
export function channel(env) {
  const token = (env.DEEPY_TELEGRAM_BOT_TOKEN || '').trim();
  const chatIds = (env.DEEPY_TELEGRAM_CHAT_ID || '').split(',').map((id) => id.trim()).filter(Boolean);
  if (!token || chatIds.length === 0) {
    if (!telegramNoticeLogged) { console.info('[deepy] telegram_not_configured'); telegramNoticeLogged = true; }
    return null;
  }
  return { token, chatIds };
}

/** True when a lead can actually be delivered. The lead path refuses without it. */
export const isTelegramConfigured = (env) => channel(env) !== null;

/**
 * Delivery. `label` names which message failed, so a silent lead notification
 * is distinguishable in the log from a silent question notification.
 *
 * Returns whether EVERY chat id accepted the message. The question path ignores
 * that; the lead path does not, because a lead nobody was told about must not
 * be reported to the visitor as sent.
 */
async function send(deps, { token, chatIds }, text, label) {
  const results = await Promise.all(chatIds.map(async (chatId) => {
    try {
      const response = await deps.fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true }),
        signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) {
        console.warn(`[deepy] telegram ${label} refused (${response.status})`);
        return false;
      }
      return true;
    } catch {
      console.warn(`[deepy] telegram ${label} failed`);
      return false;
    }
  }));
  return results.length > 0 && results.every(Boolean);
}

/** Tells the team a visitor asked something. Best-effort; never fails the answer. */
export async function notifyQuestion(deps, env, payload) {
  const target = channel(env);
  if (!target) return false;
  const site = siteFor(payload.site);

  const lines = [
    `\u{1F7E3} <b>${escapeHtml(site.name)} — visitor question</b>`,
    `Page: ${escapeHtml(`${site.origin}${payload.page}`)}`,
    `Session: ${escapeHtml(payload.sessionId ? payload.sessionId.slice(0, 8) : '—')}`,
    `Time: ${escapeHtml(stamp(payload.at))}`,
    '',
    `<b>Question:</b> ${escapeHtml(clip(payload.question, 800))}`,
    '',
    `<b>Answer (${escapeHtml(payload.source)}/${escapeHtml(payload.state)}):</b> ${escapeHtml(clip(payload.answer, 600))}`,
  ];
  if (payload.state === 'needs_human') lines.push('', '⚠️ Needs a human follow-up');
  return send(deps, target, lines.join('\n'), 'question');
}

/**
 * Tells the team someone consented to be contacted.
 *
 * A different header and a different colour on purpose: this is the one message
 * that needs a human within the hour and it must not read like the question
 * pings around it. The interest is shown as its label, not its identifier — the
 * person reading this is not a developer.
 */
export async function notifyLead(deps, env, payload) {
  const target = channel(env);
  if (!target) return false;
  const site = siteFor(payload.site);

  const line = (label, value) =>
    `${label}: ${escapeHtml(value && String(value).trim() ? String(value).trim() : '—')}`;

  const lines = [
    `\u{1F7E2} <b>${escapeHtml(site.name)} — new contact request</b>`,
    line('Source', payload.source),
    line('Name', payload.fullName),
    line('Email', payload.email),
    line('Phone', payload.phone),
    line('Organisation', payload.organisation),
    line('Interest', interestLabel(payload.interest)),
    `Page: ${escapeHtml(`${site.origin}${payload.page}`)}`,
    `Time: ${escapeHtml(stamp(payload.at))}`,
  ];
  if (payload.message) {
    lines.push('', `<b>Message:</b> ${escapeHtml(clip(payload.message, 1200))}`);
  }
  if (payload.summary) {
    lines.push('', `<b>Chat summary:</b> ${escapeHtml(clip(payload.summary, 600))}`);
  }
  lines.push('', '⚠️ Needs a human follow-up');
  return send(deps, target, lines.join('\n'), 'lead');
}
