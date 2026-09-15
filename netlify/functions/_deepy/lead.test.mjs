/**
 * Lead validation.
 *
 * Four rules are load-bearing and each has a test that fails loudly if someone
 * relaxes it: consent must be explicitly `true`, at least one contact channel
 * must be present, the interest must come from the published set, and the
 * source must too. The rest of the fields are ordinary length and shape checks.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { INTERESTS, SOURCES, interestLabel, readLeadRequest, summarise } from './lead.mjs';
import { Refused } from './common.mjs';

const valid = {
  fullName: 'Jane Clinician',
  email: 'jane@example.com',
  organisation: 'NeuroCare Clinic',
  interest: 'qeeg-review',
  source: 'consultations',
  message: 'We run a small neuromodulation practice and want a protocol review.',
  consent: true,
};

const refusalOf = (body, options) => {
  try {
    readLeadRequest(body, options);
  } catch (error) {
    assert.ok(error instanceof Refused, `expected a Refused, got ${error}`);
    return error;
  }
  return assert.fail('expected the request to be refused');
};

test('a complete request is accepted and normalised', () => {
  const lead = readLeadRequest({ lead: { ...valid, fullName: '  Jane Clinician  ' } }, { requireMessage: true });
  assert.equal(lead.fullName, 'Jane Clinician');
  assert.equal(lead.email, 'jane@example.com');
  assert.equal(lead.phone, null);
  assert.equal(lead.interest, 'qeeg-review');
  assert.equal(lead.source, 'consultations');
  assert.equal(lead.consent, true);
});

test('consent must be exactly true — missing, false and truthy are all refused', () => {
  for (const consent of [undefined, false, 'true', 1, null]) {
    const error = refusalOf({ lead: { ...valid, consent } });
    assert.equal(error.status, 422);
    assert.equal(error.code, 'consent_required');
  }
});

test('a lead with neither email nor phone is refused', () => {
  const error = refusalOf({ lead: { ...valid, email: undefined, phone: undefined } });
  assert.equal(error.status, 422);
  assert.equal(error.code, 'contact_required');
});

test('a phone alone is enough', () => {
  const lead = readLeadRequest({ lead: { ...valid, email: undefined, phone: '+44 7429 910079' } }, {});
  assert.equal(lead.phone, '+44 7429 910079');
  assert.equal(lead.email, null);
});

test('an interest outside the published set is refused', () => {
  for (const interest of ['brain-surgery', '', undefined, 'ai_protocol']) {
    const error = refusalOf({ lead: { ...valid, interest } });
    assert.equal(error.code, 'invalid_interest');
  }
});

test('every published interest is accepted and has a human label', () => {
  for (const entry of INTERESTS) {
    const lead = readLeadRequest({ lead: { ...valid, interest: entry.value } }, {});
    assert.equal(lead.interest, entry.value);
    assert.equal(interestLabel(entry.value), entry.label);
    assert.notEqual(entry.label, entry.value, 'the label must read as English, not as an id');
  }
  assert.ok(INTERESTS.some((e) => e.value === 'academy-waitlist'));
  assert.ok(INTERESTS.some((e) => e.value === 'lab-collaboration'));
  assert.ok(INTERESTS.some((e) => e.value === 'consultation'));
  assert.ok(INTERESTS.some((e) => e.value === 'other'));
});

test('a source outside the published set is refused', () => {
  const error = refusalOf({ lead: { ...valid, source: 'newsletter' } });
  assert.equal(error.code, 'invalid_source');
  for (const source of SOURCES) {
    assert.equal(readLeadRequest({ lead: { ...valid, source } }, {}).source, source);
  }
});

test('a malformed email or phone is refused rather than trimmed into shape', () => {
  assert.equal(refusalOf({ lead: { ...valid, email: 'jane@' } }).code, 'invalid_email');
  assert.equal(refusalOf({ lead: { ...valid, email: undefined, phone: 'call me' } }).code, 'invalid_phone');
});

test('a name shorter than two characters is refused', () => {
  assert.equal(refusalOf({ lead: { ...valid, fullName: 'J' } }).code, 'invalid_name');
  assert.equal(refusalOf({ lead: { ...valid, fullName: '   ' } }).code, 'invalid_name');
});

test('message is required only when the caller says so', () => {
  assert.equal(
    refusalOf({ lead: { ...valid, message: undefined } }, { requireMessage: true }).code,
    'message_required',
  );
  assert.equal(readLeadRequest({ lead: { ...valid, message: undefined } }, {}).message, null);
});

test('a lead that is not an object at all is refused', () => {
  assert.equal(refusalOf({ lead: 'Jane' }).code, 'invalid_lead');
  assert.equal(refusalOf({ lead: [valid] }).code, 'invalid_lead');
  assert.equal(refusalOf({}).code, 'invalid_lead');
});

test('summarise records both sides verbatim and invents nothing', () => {
  const summary = summarise([
    { role: 'user', content: 'Do you teach QEEG?' },
    { role: 'assistant', content: 'Yes, there is a QEEG and brain mapping track.' },
  ]);
  assert.equal(summary, 'Visitor: Do you teach QEEG?\nAssistant: Yes, there is a QEEG and brain mapping track.');
  assert.equal(summarise([]), null);
});

test('summarise is capped so an oversized transcript cannot be sent onward whole', () => {
  const summary = summarise([{ role: 'user', content: 'x'.repeat(5000) }]);
  assert.ok(summary.length <= 1500, `summary was ${summary.length} characters`);
});

test('consent is reported before any other missing field', () => {
  // Found by the offline smoke run: with both consent and the message missing,
  // the visitor was told to write a message. Fixing that would not have let
  // them through, so they would have had to submit twice to learn the real
  // reason. Consent is the gate and is checked first.
  const error = refusalOf({ lead: { ...valid, consent: undefined, message: undefined } }, { requireMessage: true });
  assert.equal(error.code, 'consent_required');
});
