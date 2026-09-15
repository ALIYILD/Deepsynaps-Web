/**
 * The consented contact form, offered AFTER a conversation rather than before.
 *
 * WHY IT IS NOT THE FIRST THING. A form in front of a chat asks a stranger to
 * pay before they know what they are buying. The capture happens at intent
 * instead: this form opens when the visitor presses "Send this to Dr. Ali",
 * which is offered once there is an answer to react to.
 *
 * CONSENT IS A CONTROL, NOT A DEFAULT. The checkbox starts unticked and the
 * submit button is disabled until it is ticked. The server refuses anything
 * that is not exactly `true` regardless, but the browser must not be the place
 * where a person appears to have agreed to something they did not.
 */
import { useState, type FormEvent } from 'react';
import { Loader2, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { INTEREST_OPTIONS, ERROR_COPY, FALLBACK_ERROR } from './types';
import type { ChatTurn, LeadInterest, LeadSource } from './types';
import { sendLead, type SiteId } from './api';
import { CONTACT } from '@/config/contact';

type Status = 'idle' | 'sending' | 'sent' | 'error';

interface LeadFormProps {
  site: SiteId;
  source: LeadSource;
  history: ChatTurn[];
  defaultInterest: LeadInterest;
  onCancel: () => void;
}

const labelClass =
  'block text-[11px] font-medium text-ds-text-secondary uppercase tracking-[0.1em] mb-1.5';
const inputClass =
  'w-full rounded-lg bg-white/[0.04] border border-white/10 px-3 py-2 text-[13px] text-ds-text '
  + 'placeholder:text-ds-text-secondary/50 outline-none transition-colors '
  + 'focus:border-ds-amber/50 focus:bg-white/[0.06]';

export function LeadForm({ site, source, history, defaultInterest, onCancel }: LeadFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!consent) return;
    setStatus('sending');
    setError('');

    const data = new FormData(event.currentTarget);
    const text = (key: string) => String(data.get(key) ?? '').trim();

    try {
      const outcome = await sendLead(
        site,
        {
          fullName: text('fullName'),
          email: text('email') || undefined,
          phone: text('phone') || undefined,
          organisation: text('organisation') || undefined,
          interest: (text('interest') || defaultInterest) as LeadInterest,
          source,
          message: text('message') || undefined,
          consent: true,
        },
        history,
      );
      if (outcome.ok) {
        setStatus('sent');
        return;
      }
      setStatus('error');
      setError(ERROR_COPY[outcome.code] ?? FALLBACK_ERROR);
    } catch {
      setStatus('error');
      setError(FALLBACK_ERROR);
    }
  };

  if (status === 'sent') {
    return (
      <div className="px-4 py-8 text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
          <CheckCircle2 className="text-emerald-400" size={22} />
        </div>
        <p className="text-sm font-semibold text-ds-text mb-2">Message sent</p>
        <p className="text-[13px] text-ds-text-secondary leading-relaxed max-w-[260px] mx-auto">
          {CONTACT.founder} has it and will reply to you directly.
        </p>
        <button type="button" onClick={onCancel} className="mt-6 text-[12px] text-ds-amber hover:underline">
          Back to the chat
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="px-4 py-4 space-y-3">
      <p className="text-[12px] text-ds-text-secondary leading-relaxed">
        Leave your details and {CONTACT.founder} will reply. Please do not include patient
        identifiers here.
      </p>

      <div>
        <label className={labelClass} htmlFor="cw-name">
          Full name <span className="text-ds-amber">*</span>
        </label>
        <input id="cw-name" name="fullName" required maxLength={120} className={inputClass} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={labelClass} htmlFor="cw-email">Email</label>
          <input id="cw-email" name="email" type="email" maxLength={160} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="cw-phone">Phone / WhatsApp</label>
          <input id="cw-phone" name="phone" type="tel" maxLength={24} className={inputClass} />
        </div>
      </div>
      <p className="text-[11px] text-ds-text-secondary/70 -mt-1">
        One of the two is enough — whichever you would rather be reached on.
      </p>

      <div>
        <label className={labelClass} htmlFor="cw-org">Organisation / clinic</label>
        <input id="cw-org" name="organisation" maxLength={160} className={inputClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="cw-interest">I am interested in</label>
        <select id="cw-interest" name="interest" defaultValue={defaultInterest} className={inputClass}>
          {INTEREST_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#0a1530]">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="cw-message">Message</label>
        <textarea
          id="cw-message"
          name="message"
          rows={3}
          maxLength={4000}
          placeholder="What would you like to discuss?"
          className={`${inputClass} resize-y min-h-[72px]`}
        />
      </div>

      <label className="flex items-start gap-2.5 text-[12px] text-ds-text-secondary leading-relaxed cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-0.5 accent-[#D4943A] w-3.5 h-3.5 flex-shrink-0"
        />
        <span>
          I agree that {CONTACT.org} may store these details in order to reply to me.{' '}
          <a href="/privacy" className="text-ds-amber hover:underline">Privacy notice</a>
        </span>
      </label>

      {status === 'error' && (
        <div
          role="alert"
          className="flex items-start gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-[12px] text-red-200"
        >
          <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={!consent || status === 'sending'}
          className="inline-flex items-center gap-2 rounded-lg bg-ds-amber px-4 py-2 text-[13px] font-semibold text-[#050A14] transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
        >
          {status === 'sending'
            ? <><Loader2 size={14} className="animate-spin" /> Sending…</>
            : <><Send size={14} /> Send to {CONTACT.founder.split(' ')[1] ?? 'Dr. Ali'}</>}
        </button>
        <button type="button" onClick={onCancel} className="text-[12px] text-ds-text-secondary hover:text-ds-text">
          Cancel
        </button>
      </div>
    </form>
  );
}
