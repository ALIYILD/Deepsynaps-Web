/**
 * The three properties this one function serves.
 *
 * The Türkiye original was a single-site assistant and hard-coded its origin.
 * Here the request names its site and everything that differs between the three
 * — the public URL a Telegram line should link to, the assistant's name for
 * itself, which chat source a lead is filed under — is resolved from this table
 * rather than guessed from the `Origin` header. The header decides whether the
 * caller MAY call; this table decides what it is asking about. Keeping those
 * separate means a preview deploy on a netlify.app domain still answers about
 * the right site.
 */

export const SITES = Object.freeze({
  web: Object.freeze({
    id: 'web',
    name: 'DeepSynaps',
    origin: 'https://deepsynaps.ai',
    chatSource: 'chat-web',
  }),
  academy: Object.freeze({
    id: 'academy',
    name: 'DeepSynaps Academy',
    origin: 'https://deepsynapsacademy.com',
    chatSource: 'chat-academy',
  }),
  lab: Object.freeze({
    id: 'lab',
    name: 'DeepSynaps Lab',
    origin: 'https://deepsynapslab.com',
    chatSource: 'chat-lab',
  }),
});

export const SITE_IDS = Object.freeze(Object.keys(SITES));

/** Shared across all three: the only contact channels the assistant may offer. */
export const CONTACT = Object.freeze({
  email: 'ali.yildirim@deepsynaps.com',
  whatsapp: '447429910079',
  founder: 'Dr. Ali Yildirim',
});

export const isSiteId = (value) => typeof value === 'string' && Object.hasOwn(SITES, value);

export const siteFor = (value) => SITES[value] ?? SITES.web;
