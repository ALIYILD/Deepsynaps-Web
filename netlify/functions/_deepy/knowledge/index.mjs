/**
 * The closed world the assistant may answer from, and the no-model fallback.
 *
 * TWO CONSUMERS, ONE SOURCE. `document(site)` compiles a knowledge module into
 * the plain-text document handed to the model as its only permitted source.
 * `keywordAnswer(site, question)` answers the same question with no model at
 * all, by scoring the visitor's words against each entry's `keywords`. They read
 * the same three files, so an edit to a site's copy reaches both paths and
 * there is no second set of facts to drift.
 *
 * DETERMINISTIC ON PURPOSE. The document is the stable prefix of every model
 * request. Nothing here reads the clock or a random source and every list is
 * emitted in declared order, so a cached prefix stays byte-identical between
 * requests on providers that cache at all.
 */
import * as web from './web.mjs';
import * as academy from './academy.mjs';
import * as lab from './lab.mjs';
import { CONTACT, siteFor } from '../sites.mjs';

const MODULES = { web, academy, lab };

export const knowledgeFor = (siteId) => MODULES[siteId] ?? MODULES.web;

/** Words too common to carry meaning; scoring on them matches everything. */
const STOP_WORDS = new Set([
  'the', 'and', 'for', 'you', 'your', 'are', 'can', 'what', 'when', 'where', 'how', 'why', 'who',
  'with', 'about', 'from', 'this', 'that', 'have', 'has', 'was', 'were', 'will', 'would', 'there',
  'their', 'they', 'them', 'does', 'did', 'any', 'all', 'but', 'not', 'get', 'got', 'its', 'his',
  'her', 'our', 'out', 'use', 'used', 'like', 'want', 'need', 'please', 'hello', 'hey', 'thanks',
]);

const normalise = (value) => String(value).toLowerCase().replace(/[^a-z0-9\s-]/g, ' ');

const tokens = (value) => normalise(value)
  .split(/\s+/)
  .filter((word) => word.length > 2 && !STOP_WORDS.has(word));

/**
 * One document, in declared order.
 *
 * It names the site, the contact channels and every entry. The model is told
 * elsewhere that this is all it may use; this function's only job is to make
 * "all it may use" a single, stable string.
 */
export function document(siteId) {
  const site = siteFor(siteId);
  const kb = knowledgeFor(siteId);
  const lines = [
    `# ${kb.title}`,
    '',
    kb.summary,
    '',
    '## Contact channels',
    `- Email: ${CONTACT.email}`,
    `- WhatsApp: +${CONTACT.whatsapp}`,
    `- Founder and Clinical Director: ${CONTACT.founder}`,
    `- This site: ${site.origin}`,
    '',
    '## Pages on this site',
    ...kb.pages.map((page) => `- ${page.path} — ${page.label}`),
    '',
    '## Content',
  ];
  for (const entry of kb.entries) {
    lines.push('', `### ${entry.title}`, entry.body);
  }
  return lines.join('\n');
}

/**
 * The answer when there is no model key at all.
 *
 * A match must clear a floor: one weak overlap on a common word would return a
 * confident paragraph about the wrong thing, which is worse on a public medical
 * site than saying nothing. A phrase in `keywords` that appears whole in the
 * question is worth more than a single shared word, because multi-word keywords
 * are the ones that actually identify a topic.
 */
export function keywordAnswer(siteId, question) {
  const kb = knowledgeFor(siteId);
  const haystack = normalise(question);
  const asked = new Set(tokens(question));
  if (asked.size === 0) return null;

  let best = null;
  for (const entry of kb.entries) {
    let score = 0;
    for (const keyword of entry.keywords) {
      const key = normalise(keyword).trim();
      if (!key) continue;
      if (key.includes(' ')) {
        if (haystack.includes(key)) score += 3;
        continue;
      }
      if (asked.has(key)) score += 2;
      else if (key.length > 4 && haystack.includes(key)) score += 1;
    }
    if (score > 0 && (best === null || score > best.score)) best = { entry, score };
  }
  if (best === null || best.score < 2) return null;
  return { id: best.entry.id, answer: best.entry.body };
}
