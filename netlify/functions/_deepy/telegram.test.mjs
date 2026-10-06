/**
 * Telegram delivery, and the fail-closed lead path that depends on it.
 *
 * THE RULE UNDER TEST. A visitor is told "sent" only when something was
 * actually sent. Telegram is the only guaranteed delivery on this deployment,
 * so no configuration is a 503 and a refused send is a 502 — never a 200 with
 * a receipt. The second thing tested is the shape of the message itself: it
 * has to be enough to phone the person back with no other system open.
 * The third is what the QUESTION ping must never carry: free text. Neither the
 * visitor's question nor the assistant's answer reaches Telegram (#4499).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../deepy.mjs';
import { notifyLead, notifyQuestion } from './telegram.mjs';
import { resetRateLimits } from './visitor.mjs';

const TELEGRAM_ENV = {
  DEEPY_TELEGRAM_BOT_TOKEN: 'bot-token-for-tests',
  DEEPY_TELEGRAM_CHAT_ID: '12345',
};

/** A fetch stub that records every call and answers with a configurable status. */
function recorder({ ok = true, status = 200 } = {}) {
  const calls = [];
  const fetchStub = async (url, init) => {
    calls.push({ url, init, body: JSON.parse(init.body) });
    return new Response(JSON.stringify({ ok }), { status });
  };
  return { calls, fetchStub };
}

const at = new Date('2026-09-15T10:30:00Z');

const leadPayload = {
  site: 'academy',
  source: 'academy-signup',
  fullName: 'Jane Clinician',
  email: 'jane@example.com',
  phone: null,
  organisation: 'NeuroCare Clinic',
  interest: 'academy-waitlist',
  message: 'Interested in the QEEG workshop.',
  summary: null,
  page: '/',
  at,
};

test('the lead message carries every field a human needs to reply', async () => {
  const { calls, fetchStub } = recorder();
  const delivered = await notifyLead({ fetch: fetchStub }, TELEGRAM_ENV, leadPayload);

  assert.equal(delivered, true);
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /api\.telegram\.org\/botbot-token-for-tests\/sendMessage/);
  assert.equal(calls[0].body.chat_id, '12345');
  assert.equal(calls[0].body.parse_mode, 'HTML');

  const text = calls[0].body.text;
  assert.match(text, /DeepSynaps Academy — new contact request/);
  assert.match(text, /Source: academy-signup/);
  assert.match(text, /Name: Jane Clinician/);
  assert.match(text, /Email: jane@example\.com/);
  // A missing field prints an em dash, so "not given" is distinguishable from
  // "not shown".
  assert.match(text, /Phone: —/);
  assert.match(text, /Organisation: NeuroCare Clinic/);
  // The interest is the human label, not the identifier.
  assert.match(text, /Interest: Academy waitlist/);
  assert.ok(!text.includes('academy-waitlist'), 'the raw interest id must not be shown');
  assert.match(text, /Page: https:\/\/deepsynapsacademy\.com\//);
  assert.match(text, /<b>Message:<\/b> Interested in the QEEG workshop\./);
  assert.match(text, /Needs a human follow-up/);
});

test('HTML in a visitor field is escaped, not rendered', async () => {
  const { calls, fetchStub } = recorder();
  await notifyLead({ fetch: fetchStub }, TELEGRAM_ENV, {
    ...leadPayload,
    fullName: '<b>Jane</b> & "Co"',
    message: '<script>alert(1)</script>',
  });
  const text = calls[0].body.text;
  assert.match(text, /&lt;b&gt;Jane&lt;\/b&gt; &amp; &quot;Co&quot;/);
  assert.ok(!text.includes('<script>'), 'a script tag must never survive into the message');
});

test('no Telegram configuration means no send and an honest false', async () => {
  const { calls, fetchStub } = recorder();
  assert.equal(await notifyLead({ fetch: fetchStub }, {}, leadPayload), false);
  assert.equal(await notifyQuestion({ fetch: fetchStub }, {}, {
    site: 'web', page: '/', visitorMessages: 1, needsHuman: false, sessionId: null, at,
  }), false);
  assert.equal(calls.length, 0);
});

test('a question ping carries metadata only and flags a needed follow-up', async () => {
  const { calls, fetchStub } = recorder();
  await notifyQuestion({ fetch: fetchStub }, TELEGRAM_ENV, {
    site: 'lab',
    page: '/#chips',
    visitorMessages: 3,
    needsHuman: true,
    sessionId: '3f2504e0-4f89-11d3-9a0c-0305e82c3301',
    at,
    // A caller that still hands over text must not get it forwarded.
    question: 'Can I buy a HAC v1?',
    answer: 'No commercial product is yet available.',
  });
  assert.equal(calls.length, 1);
  const text = calls[0].body.text;
  assert.match(text, /DeepSynaps Lab — visitor question/);
  // The metadata fields, all present.
  assert.match(text, /Page: https:\/\/deepsynapslab\.com\/$/m);
  assert.match(text, /Visitor messages: 3/);
  assert.match(text, /Needs human: yes/);
  assert.match(text, /Needs a human follow-up/);
  assert.match(text, /Time: /);
  // Only the first eight characters of the session id: enough to find the
  // conversation, not enough to be an identity.
  assert.match(text, /Session: 3f2504e0/);
  assert.ok(!text.includes('3f2504e0-4f89'), 'the full session id must not travel');
  // And no free text of any kind.
  assert.ok(!text.includes('HAC v1'), 'the question must not travel');
  assert.ok(!text.includes('commercial product'), 'the answer must not travel');
  assert.ok(!/Question:|Answer/.test(text), 'no question or answer field at all');
  // The fragment is visitor-shapeable, so only the bare path is sent.
  assert.ok(!text.includes('#chips'), 'the page fragment must not travel');
});

test('a question ping with no escalation says so and adds no follow-up line', async () => {
  const { calls, fetchStub } = recorder();
  await notifyQuestion({ fetch: fetchStub }, TELEGRAM_ENV, {
    site: 'web', page: '/consultations?q=my+private+words', visitorMessages: 1, needsHuman: false, sessionId: null, at,
  });
  const text = calls[0].body.text;
  assert.match(text, /Needs human: no/);
  assert.match(text, /Visitor messages: 1/);
  assert.match(text, /Session: —/);
  assert.match(text, /Page: https:\/\/deepsynaps\.ai\/consultations$/m);
  assert.ok(!text.includes('private'), 'the query string must not travel');
  assert.ok(!text.includes('Needs a human follow-up'));
});

test('end to end, the handler sends Telegram no question, answer or history text', async () => {
  resetRateLimits();
  const { calls, fetchStub } = recorder();
  const question = 'ZEBRA-QUESTION-7781 what services do you offer for my patient Mrs Smith?';
  const request = new Request('https://deepsynaps.ai/.netlify/functions/deepy', {
    method: 'POST',
    headers: { origin: 'https://deepsynaps.ai', 'content-type': 'application/json' },
    body: JSON.stringify({
      site: 'web',
      page: '/consultations#ZEBRA-FRAGMENT',
      question,
      session_id: '3f2504e0-4f89-11d3-9a0c-0305e82c3301',
      history: [
        { role: 'user', content: 'ZEBRA-HISTORY-USER earlier message' },
        { role: 'assistant', content: 'ZEBRA-HISTORY-ASSISTANT earlier reply' },
      ],
    }),
  });
  // No model key, so the answer comes from the knowledge base or the reviewed
  // fallback; either way it is real text that must stay out of the ping.
  const response = await handler(request, { env: TELEGRAM_ENV }, {
    fetch: fetchStub, createModelClient: () => { throw new Error('no model in tests'); }, now: () => at,
  });
  assert.equal(response.status, 200);
  const { answer, state } = await response.json();
  assert.ok(typeof answer === 'string' && answer.length > 0);

  assert.equal(calls.length, 1, 'exactly one Telegram call, the question ping');
  const text = calls[0].body.text;
  assert.ok(!text.includes('ZEBRA'), 'no question, history or fragment text may travel');
  assert.ok(!text.includes('Mrs Smith'), 'the question must not travel');
  assert.ok(!text.includes(answer.slice(0, 40)), 'the answer must not travel');
  assert.match(text, /Page: https:\/\/deepsynaps\.ai\/consultations$/m);
  // One earlier visitor turn in the history, plus this question.
  assert.match(text, /Visitor messages: 2/);
  assert.match(text, new RegExp(`Needs human: ${state === 'needs_human' ? 'yes' : 'no'}`));
  assert.match(text, /Session: 3f2504e0/);
});

/* ------------------------------------------------- the fail-closed lead path */

const leadRequest = (overrides = {}) => new Request('https://deepsynaps.ai/.netlify/functions/deepy', {
  method: 'POST',
  headers: { origin: 'https://deepsynapsacademy.com', 'content-type': 'application/json' },
  body: JSON.stringify({
    action: 'lead',
    site: 'academy',
    page: '/',
    lead: {
      fullName: 'Jane Clinician',
      email: 'jane@example.com',
      interest: 'academy-waitlist',
      source: 'academy-signup',
      message: 'Please add me to the list.',
      consent: true,
      ...overrides,
    },
  }),
});

test('a lead is refused with 503 when Telegram is not configured', async () => {
  resetRateLimits();
  const { calls, fetchStub } = recorder();
  const response = await handler(leadRequest(), { env: {} }, {
    fetch: fetchStub, createModelClient: () => {}, now: () => at,
  });
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { error: 'lead_service_unavailable' });
  assert.equal(calls.length, 0, 'nothing should be attempted when there is nowhere to send');
});

test('a lead Telegram refuses is a 502, not a receipt', async () => {
  resetRateLimits();
  const { fetchStub } = recorder({ ok: false, status: 400 });
  const response = await handler(leadRequest(), { env: TELEGRAM_ENV }, {
    fetch: fetchStub, createModelClient: () => {}, now: () => at,
  });
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { error: 'lead_not_delivered' });
});

test('a delivered lead returns ok and no identifier', async () => {
  resetRateLimits();
  const { calls, fetchStub } = recorder();
  const response = await handler(leadRequest(), { env: TELEGRAM_ENV }, {
    fetch: fetchStub, createModelClient: () => {}, now: () => at,
  });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(calls.length, 1, 'no Supabase call without SUPABASE_URL');
  assert.equal(response.headers.get('access-control-allow-origin'), 'https://deepsynapsacademy.com');
});

test('validation happens before delivery, so a bad lead costs no upstream call', async () => {
  resetRateLimits();
  const { calls, fetchStub } = recorder();
  const response = await handler(leadRequest({ consent: false }), { env: TELEGRAM_ENV }, {
    fetch: fetchStub, createModelClient: () => {}, now: () => at,
  });
  assert.equal(response.status, 422);
  assert.deepEqual(await response.json(), { error: 'consent_required' });
  assert.equal(calls.length, 0);
});
