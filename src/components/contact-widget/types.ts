/**
 * The contract between the widget and `netlify/functions/deepy.mjs`.
 *
 * These interests and sources are the same closed sets the function validates
 * against (`netlify/functions/_deepy/lead.mjs`). They are duplicated here
 * rather than imported because the function is bundled by esbuild for Node and
 * the app by Vite for the browser, and neither should pull the other's tree in.
 * The tests on the function side own the truth; this file must follow it.
 */

export type ChatRole = 'user' | 'assistant';

export interface ChatTurn {
  role: ChatRole;
  content: string;
  /** Set when the assistant could not answer, so the handoff can be nudged. */
  needsHuman?: boolean;
}

export type LeadInterest =
  | 'ai-protocol'
  | 'neuromodulation'
  | 'qeeg-review'
  | 'clinic-integration'
  | 'lab-collaboration'
  | 'academy-waitlist'
  | 'consultation'
  | 'other';

export type LeadSource =
  | 'consultations'
  | 'academy-signup'
  | 'chat-web'
  | 'chat-academy'
  | 'chat-lab';

export interface LeadPayload {
  fullName: string;
  email?: string;
  phone?: string;
  organisation?: string;
  interest: LeadInterest;
  source: LeadSource;
  message?: string;
  consent: true;
}

export const INTEREST_OPTIONS: ReadonlyArray<{ value: LeadInterest; label: string }> = [
  { value: 'consultation', label: 'General consultation' },
  { value: 'ai-protocol', label: 'AI protocol development' },
  { value: 'neuromodulation', label: 'Neuromodulation consultation' },
  { value: 'qeeg-review', label: 'QEEG / brain-map review' },
  { value: 'clinic-integration', label: 'Clinic integration (DeepSynaps OS)' },
  { value: 'lab-collaboration', label: 'Lab collaboration / research' },
  { value: 'academy-waitlist', label: 'Academy waitlist' },
  { value: 'other', label: 'Something else' },
];

/**
 * What the function's error codes mean to a visitor.
 *
 * Every one of these is a sentence a person can act on. A code with no entry
 * falls through to the generic line rather than leaking the code itself, which
 * would tell the visitor nothing and the attacker something.
 */
export const ERROR_COPY: Record<string, string> = {
  lead_service_unavailable:
    'Messages are not being delivered right now, so I will not pretend yours was sent. Please email ali.yildirim@deepsynaps.com or use WhatsApp.',
  lead_not_delivered:
    'Your message did not get through. Please email ali.yildirim@deepsynaps.com or use WhatsApp so nothing is lost.',
  rate_limited: 'That is a lot of messages in a short time. Please wait a minute and try again.',
  consent_required: 'Please tick the consent box so we may reply to you.',
  contact_required: 'Please give an email address or a phone number so we can reply.',
  invalid_email: 'That email address does not look right.',
  invalid_phone: 'That phone number does not look right.',
  invalid_name: 'Please give your full name.',
  message_required: 'Please write a short message.',
};

export const FALLBACK_ERROR =
  'Something went wrong on our side. Please email ali.yildirim@deepsynaps.com or use WhatsApp.';
