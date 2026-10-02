import assert from 'node:assert/strict';

const base = 'http://127.0.0.1:8384';
const health = await fetch(`${base}/healthz`);
assert.equal(health.status, 200);
const headers = { origin: 'https://deepsynapsacademy.com', 'content-type': 'application/json' };
const question = await fetch(`${base}/.netlify/functions/deepy`, { method: 'POST', headers,
  body: JSON.stringify({ site: 'academy', page: '/', question: 'What is DeepSynaps Academy?' }) });
assert.equal(question.status, 200);
const answer = await question.json();
assert.equal(answer.site, 'academy');
assert.ok(answer.answer.length > 10);
const lead = await fetch(`${base}/.netlify/functions/deepy`, { method: 'POST', headers,
  body: JSON.stringify({ action: 'lead', site: 'academy', page: '/',
    lead: { fullName: 'Synthetic Clinician', email: 'synthetic@example.com',
      interest: 'academy-waitlist', source: 'academy-signup',
      message: 'Synthetic rehearsal only.', consent: true } }) });
assert.equal(lead.status, 503);
assert.deepEqual(await lead.json(), { error: 'lead_service_unavailable' });
console.log(JSON.stringify({ health: 200, synthetic_question: 200,
  unconfigured_lead: 503, external_delivery_attempted: false }));
