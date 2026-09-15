/**
 * The optional Supabase copy of a lead.
 *
 * OPTIONAL IS THE WHOLE POINT. Telegram is the delivery this deployment
 * guarantees; this is a durable copy for whenever a CRM appears behind it. If
 * `SUPABASE_URL` and `SUPABASE_ANON_KEY` are not both set, there is nothing to
 * write to and the lead path carries on. If they are set and the write fails,
 * the failure is logged and the lead still counts as delivered, because
 * Telegram already delivered it — refusing the visitor at that point would lose
 * a customer to protect a copy.
 *
 * The row shape mirrors the Türkiye `leads` columns so one export can read both.
 * A `leads` table is not created here: this repository ships no migrations, and
 * a 404 from PostgREST is handled the same as any other outage.
 */

const INSERT_TIMEOUT_MS = 8000;

export function supabaseConfig(env) {
  const url = (env.SUPABASE_URL || '').trim().replace(/\/+$/, '');
  const anonKey = (env.SUPABASE_ANON_KEY || '').trim();
  return url && anonKey ? { url, anonKey } : null;
}

/**
 * Best-effort insert. Returns true when the row landed, false otherwise; no
 * caller is allowed to turn a false into a visitor-visible failure.
 */
export async function storeLead(deps, config, lead, extra) {
  if (!config) return false;
  const row = {
    full_name: lead.fullName,
    email: lead.email,
    phone: lead.phone,
    organisation_name: lead.organisation,
    interest: lead.interest,
    source: lead.source,
    message: lead.message,
    site: extra.site,
    page: extra.page,
    conversation_summary: extra.summary,
    consent_at: extra.consentAt,
  };

  try {
    const response = await deps.fetch(`${config.url}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        apikey: config.anonKey,
        authorization: `Bearer ${config.anonKey}`,
        'content-type': 'application/json',
        // No representation comes back: the row id must not reach the browser,
        // and nothing here needs it.
        prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
      signal: AbortSignal.timeout(INSERT_TIMEOUT_MS),
    });
    if (!response.ok) {
      // The upstream body is never logged: it is untrusted and may echo the
      // row. The status is enough to tell a missing table from an outage.
      console.warn(`[deepy] lead not stored: supabase_http_${response.status}`);
      return false;
    }
    return true;
  } catch (error) {
    const kind = error?.name === 'TimeoutError' || error?.name === 'AbortError' ? 'timeout' : 'unavailable';
    console.warn(`[deepy] lead not stored: ${kind}`);
    return false;
  }
}
