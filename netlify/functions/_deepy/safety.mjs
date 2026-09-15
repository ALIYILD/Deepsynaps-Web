/**
 * Safety before helpfulness, and before the model.
 *
 * WHY THIS IS NOT THE MODEL'S JOB. Two answers on this endpoint are reviewed
 * sentences rather than generated ones: the refusal to give clinical advice and
 * the refusal to accept patient data. They are decided HERE, from the visitor's
 * text, before any provider is consulted, so a prompt-injected question cannot
 * talk its way past them. The persona repeats both rules to the model as well,
 * but that is defence in depth, not the boundary.
 *
 * ENGLISH, NOT TURKISH. The Türkiye original matched ASCII-folded Turkish stems.
 * These three sites are English, so the lists below are English stems, and the
 * matcher is word-boundary based so "tms" does not fire inside "systems".
 */

/** A request to interpret, diagnose, dose or treat. Never answered by a model. */
const CLINICAL = [
  'diagnos', 'diagnose', 'treat', 'treatment', 'therapy', 'prescri', 'prescription',
  'medication', 'medicine', 'drug', 'dose', 'dosage', 'dosing', 'mg',
  'symptom', 'symptoms', 'my condition', 'my brain', 'my eeg', 'my qeeg', 'my scan',
  'my report', 'my result', 'my results', 'my findings', 'interpret', 'should i take',
  'is it safe for me', 'what protocol should', 'frequency', 'intensity', 'montage',
  'protocol for my', 'cure', 'depression', 'anxiety', 'adhd', 'autism', 'epilep',
  'migraine', 'insomnia', 'stroke', 'dementia', 'alzheimer', 'parkinson',
];

/** Text that is about to hand over someone's health data. Refused, not stored. */
const PRIVACY = [
  'patient name', 'my patient', 'attached', 'attachment', 'upload', 'medical record',
  'health record', 'nhs number', 'date of birth', 'my file', 'my records',
  'here is the report', 'send you the scan', 'gdpr', 'kvkk',
];

export const SAFETY_COPY = Object.freeze({
  clinical:
    'I am the website assistant for DeepSynaps, not a clinician, and I cannot give clinical advice, '
    + 'interpret a finding or suggest a protocol, a dose or a stimulation parameter for anyone. '
    + 'That needs a qualified clinician who can see the whole case. I can put you in touch with '
    + 'Dr. Ali Yildirim, or tell you what the site says about the services on offer.',
  privacy:
    'Please do not send patient names, health records, scans or any other personal health information '
    + 'through this chat. It is not a secure clinical channel and I am not able to accept that data. '
    + 'If you need to discuss a case, leave your name and email here and Dr. Ali Yildirim will arrange '
    + 'a secure channel with you.',
  noAnswer:
    'I could not find an answer to that on this site, so I would rather not guess. '
    + 'Dr. Ali Yildirim can answer it properly — send him a message from this chat, or email '
    + 'ali.yildirim@deepsynaps.com.',
  noModel:
    'I can answer questions from what this site says. I could not match that to anything on the page, '
    + 'so the fastest route is a person: send a message to Dr. Ali Yildirim from this chat, message on '
    + 'WhatsApp, or email ali.yildirim@deepsynaps.com.',
});

const matches = (haystack, needle) => {
  if (needle.includes(' ')) return haystack.includes(needle);
  // Prefix match on a word boundary, so "diagnos" catches diagnosis and
  // diagnose, while "tms" cannot fire from inside "systems".
  return new RegExp(`\\b${needle}`).test(haystack);
};

const hasAny = (message, needles) => {
  const haystack = String(message).toLowerCase();
  return needles.some((needle) => matches(haystack, needle));
};

/**
 * Privacy is checked FIRST. A message carrying patient data often also names a
 * condition, and the right refusal for "here is my patient's EEG, what does the
 * theta mean" is the one that says stop sending this, not the one that says
 * ask a clinician.
 */
export function classify(message) {
  if (hasAny(message, PRIVACY)) return 'privacy';
  if (hasAny(message, CLINICAL)) return 'clinical';
  return 'question';
}
