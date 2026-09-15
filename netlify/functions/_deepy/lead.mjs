/**
 * The contact request: validation, and the honest failures.
 *
 * WHAT IS HOSTILE HERE. Everything. The endpoint is unauthenticated, so every
 * field is re-validated on this side even though the widget and the two forms
 * check it first.
 *
 * WHAT MUST NOT HAPPEN. A contact request that goes nowhere must never be
 * reported as a success. Delivery is decided in `deepy.mjs`; this module's job
 * is to make sure that by the time delivery is attempted, the thing being
 * delivered is real — a name, at least one way to reach the person back, an
 * interest from the published set, and an explicit consent.
 */
import { Refused, clip } from './common.mjs';

const MAX_SUMMARY = 1500;
const MAX_MESSAGE = 4000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()\s-]{7,24}$/;

/**
 * Where the request came from. A closed set because it is printed to the team
 * and filed against, so a typo must be a 422 rather than a new category that
 * quietly appears in the inbox.
 */
export const SOURCES = Object.freeze([
  'consultations',
  'academy-signup',
  'chat-web',
  'chat-academy',
  'chat-lab',
]);

/** What the visitor wants, with the label a human reads in Telegram. */
export const INTERESTS = Object.freeze([
  { value: 'ai-protocol', label: 'AI protocol development' },
  { value: 'neuromodulation', label: 'Neuromodulation consultation' },
  { value: 'qeeg-review', label: 'QEEG / brain-map review' },
  { value: 'clinic-integration', label: 'Clinic integration (DeepSynaps OS)' },
  { value: 'lab-collaboration', label: 'Lab collaboration / research' },
  { value: 'academy-waitlist', label: 'Academy waitlist' },
  { value: 'consultation', label: 'General consultation' },
  { value: 'other', label: 'Other' },
]);

const INTEREST_VALUES = new Set(INTERESTS.map((entry) => entry.value));

export const interestLabel = (value) =>
  INTERESTS.find((entry) => entry.value === value)?.label ?? value;

/** Absent, null and empty all mean "not supplied"; anything else must be text. */
function optionalText(value, code, limit) {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'string') throw new Refused(422, code);
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.length > limit) throw new Refused(422, code);
  return trimmed;
}

/**
 * Consent is a boolean the visitor set by pressing a control, not a default.
 * `true` is the only accepted value: a missing, false or truthy-but-not-true
 * consent is refused rather than coerced, because coercing this particular
 * field is how a site ends up mailing people who never agreed.
 */
function readConsent(value) {
  if (value !== true) throw new Refused(422, 'consent_required');
  return true;
}

/**
 * `message` is required in the "send a message" modes and optional in the two
 * signup modes, so the requirement travels as an argument rather than being
 * inferred from `source`: the caller knows which shape it is sending.
 */
export function readLeadRequest(body, { requireMessage = false } = {}) {
  const supplied = body.lead;
  if (!supplied || typeof supplied !== 'object' || Array.isArray(supplied)) {
    throw new Refused(422, 'invalid_lead');
  }

  const fullName = optionalText(supplied.fullName, 'invalid_name', 120);
  if (!fullName || fullName.length < 2) throw new Refused(422, 'invalid_name');

  const email = optionalText(supplied.email, 'invalid_email', 160);
  if (email && !EMAIL_PATTERN.test(email)) throw new Refused(422, 'invalid_email');

  const phone = optionalText(supplied.phone, 'invalid_phone', 24);
  if (phone && !PHONE_PATTERN.test(phone)) throw new Refused(422, 'invalid_phone');

  // At least one way to reply. A lead nobody can answer is not a lead.
  if (!email && !phone) throw new Refused(422, 'contact_required');

  const organisation = optionalText(supplied.organisation, 'invalid_organisation', 160);

  const interest = optionalText(supplied.interest, 'invalid_interest', 40);
  if (!interest || !INTEREST_VALUES.has(interest)) throw new Refused(422, 'invalid_interest');

  const source = optionalText(supplied.source, 'invalid_source', 40);
  if (!source || !SOURCES.includes(source)) throw new Refused(422, 'invalid_source');

  const message = optionalText(supplied.message, 'invalid_message', MAX_MESSAGE);
  if (requireMessage && !message) throw new Refused(422, 'message_required');

  return {
    fullName,
    email,
    phone,
    organisation,
    interest,
    source,
    message,
    consent: readConsent(supplied.consent),
  };
}

/**
 * A short account of what was discussed, built HERE from the turns the widget
 * sent. Nothing is invented: every line is either something the visitor typed
 * or something the assistant answered, and the whole thing is capped.
 */
export function summarise(history) {
  const lines = [];
  for (const turn of history) {
    const content = turn.content.trim();
    if (!content) continue;
    lines.push(`${turn.role === 'user' ? 'Visitor' : 'Assistant'}: ${content}`);
  }
  if (lines.length === 0) return null;
  return clip(lines.join('\n'), MAX_SUMMARY);
}
