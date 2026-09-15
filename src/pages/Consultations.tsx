import { useState, type FormEvent } from 'react';
import {
  Brain,
  Activity,
  Microscope,
  Stethoscope,
  Sparkles,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router';
import { ScrollReveal } from '@/components/ScrollReveal';
import { CONTACT } from '@/config/contact';
import { ERROR_COPY, FALLBACK_ERROR, type LeadInterest } from '@/components/contact-widget/types';

const services = [
  {
    icon: Brain,
    title: 'AI Protocol Development',
    blurb:
      'Custom clinical AI protocols for neuromodulation, QEEG-guided care, and decision support — built around your patient population and workflow.',
  },
  {
    icon: Activity,
    title: 'Neuromodulation Consultation',
    blurb:
      'Protocol design and second opinions for tDCS, TMS, rTMS, neurofeedback, and combined modalities. Evidence-graded and individualized.',
  },
  {
    icon: Microscope,
    title: 'QEEG / Brain-Map Review',
    blurb:
      'Raw-data clinical workstation review, biomarker analysis, and brain-map–driven protocol planning for complex cases.',
  },
  {
    icon: Stethoscope,
    title: 'Clinic Integration',
    blurb:
      'Deploy DeepSynaps OS into your clinic — workflow design, staff training, and ongoing protocol governance.',
  },
];

/**
 * The select on this page predates the lead schema and has its own values.
 * Mapping them here rather than renaming the options keeps the visible copy
 * ("Research / Lab Collaboration") intact while the server still gets a value
 * from its published set.
 */
const SERVICE_TO_INTEREST: Record<string, LeadInterest> = {
  'ai-protocol': 'ai-protocol',
  neuromodulation: 'neuromodulation',
  'qeeg-review': 'qeeg-review',
  'clinic-integration': 'clinic-integration',
  research: 'lab-collaboration',
  other: 'other',
};

const TIMELINE_LABEL: Record<string, string> = {
  urgent: 'Urgent (this week)',
  '2-weeks': 'Within 2 weeks',
  '1-month': 'Within 1 month',
  flexible: 'Flexible',
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Consultations() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [consent, setConsent] = useState(false);

  /**
   * This form used to POST to `/` as a Netlify Form. Form detection is off on
   * this site, so every submission returned 404 and every visitor saw an error.
   * It now goes to the same function the contact widget uses, as a lead with
   * `source: "consultations"` — which is a real delivery, and fails closed
   * rather than silently.
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) return;
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const data = new FormData(form);
    const text = (key: string) => String(data.get(key) ?? '').trim();

    // The timeline is not a lead field on the server, so it travels inside the
    // message rather than being dropped on the floor.
    const timeline = TIMELINE_LABEL[text('timeline')] ?? text('timeline');
    const message = timeline
      ? `${text('message')}\n\nTimeline: ${timeline}`
      : text('message');

    try {
      const res = await fetch('/.netlify/functions/deepy', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          action: 'lead',
          site: 'web',
          page: '/consultations',
          lead: {
            fullName: text('name'),
            email: text('email') || undefined,
            phone: text('phone') || undefined,
            organisation: text('organization') || undefined,
            interest: SERVICE_TO_INTEREST[text('service')] ?? 'other',
            source: 'consultations' as const,
            message,
            consent: true as const,
          },
        }),
      });
      if (!res.ok) {
        // The function answers a refusal with a machine code. Turn it into a
        // sentence here; the code itself tells the visitor nothing.
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(ERROR_COPY[body?.error ?? ''] ?? FALLBACK_ERROR);
      }
      setStatus('success');
      form.reset();
      setConsent(false);
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : FALLBACK_ERROR,
      );
    }
  };

  return (
    <div className="pt-32 md:pt-40 pb-20">
      {/* Hero */}
      <section className="relative px-6 md:px-8 lg:px-12">
        <div className="max-w-[1200px] mx-auto text-center">
          <ScrollReveal>
            <span className="section-label">Consultations & Services</span>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.1] tracking-tight text-balance mb-6 text-ds-text">
              Clinical AI, neuromodulation, and protocol design —{' '}
              <span className="gradient-text">tailored to your clinic.</span>
            </h1>
            <p className="text-lg text-ds-text-secondary max-w-2xl mx-auto leading-relaxed">
              Work directly with {CONTACT.founder} and the {CONTACT.org} team on
              clinical AI strategy, neuromodulation protocols, QEEG-guided care,
              and platform integration. Tell us about your case or clinic — we
              respond within one business day.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 md:px-8 lg:px-12 mt-20 md:mt-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.08}>
                <div className="glass-card h-full">
                  <div className="w-12 h-12 rounded-xl bg-ds-amber/10 border border-ds-amber/20 flex items-center justify-center mb-5">
                    <s.icon className="text-ds-amber" size={22} />
                  </div>
                  <h3 className="text-xl font-semibold text-ds-text mb-3">
                    {s.title}
                  </h3>
                  <p className="text-[14px] text-ds-text-secondary leading-relaxed">
                    {s.blurb}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="px-6 md:px-8 lg:px-12 mt-24 md:mt-32">
        <div className="max-w-[820px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="section-label">Get in touch</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-ds-text mb-4">
                Request a consultation
              </h2>
              <p className="text-ds-text-secondary">
                Share a bit about your clinic, case, or project. We'll reply
                with next steps and availability.
              </p>
            </div>
          </ScrollReveal>

          {status === 'success' ? (
            <ScrollReveal>
              <div className="glass-card text-center py-14">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 className="text-emerald-400" size={28} />
                </div>
                <h3 className="text-2xl font-semibold text-ds-text mb-3">
                  Message received
                </h3>
                <p className="text-ds-text-secondary max-w-md mx-auto">
                  Thank you — we'll be in touch within one business day. For
                  urgent matters, message us directly on WhatsApp.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="btn-ghost mt-8"
                >
                  Send another message
                </button>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <form
                name="consultations"
                onSubmit={handleSubmit}
                className="glass-card space-y-6"
              >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Full name" name="name" required />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field
                    label="Phone / WhatsApp"
                    name="phone"
                    type="tel"
                    placeholder="+44 ..."
                  />
                  <Field
                    label="Organization / clinic"
                    name="organization"
                    placeholder="e.g. NeuroCare Clinic"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-ds-text-secondary uppercase tracking-[0.08em] mb-2">
                    I'm interested in
                  </label>
                  <select
                    name="service"
                    required
                    defaultValue=""
                    className="form-control"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option value="ai-protocol">
                      AI Protocol Development
                    </option>
                    <option value="neuromodulation">
                      Neuromodulation Consultation
                    </option>
                    <option value="qeeg-review">
                      QEEG / Brain-Map Review
                    </option>
                    <option value="clinic-integration">
                      Clinic Integration (DeepSynaps OS)
                    </option>
                    <option value="research">
                      Research / Lab Collaboration
                    </option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-ds-text-secondary uppercase tracking-[0.08em] mb-2">
                    Timeline
                  </label>
                  <select
                    name="timeline"
                    defaultValue="flexible"
                    className="form-control"
                  >
                    <option value="urgent">Urgent (this week)</option>
                    <option value="2-weeks">Within 2 weeks</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-ds-text-secondary uppercase tracking-[0.08em] mb-2">
                    Tell us about your case or project
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    placeholder="Patient population, condition, current protocols, what you're hoping to achieve..."
                    className="form-control resize-y min-h-[140px]"
                  />
                  <p className="text-xs text-ds-text-secondary/70 mt-2">
                    Please do not include patient identifiers. We'll arrange a
                    secure channel for clinical details.
                  </p>
                </div>

                {status === 'error' && (
                  <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-200">
                    <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                    <span>
                      Could not send your message. {errorMessage} You can also
                      reach us by email at{' '}
                      <a className="underline" href={`mailto:${CONTACT.email}`}>
                        {CONTACT.email}
                      </a>
                      .
                    </span>
                  </div>
                )}

                <label className="flex items-start gap-3 text-[13px] text-ds-text-secondary leading-relaxed cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 accent-[#D4943A] w-4 h-4 flex-shrink-0"
                  />
                  <span>
                    I agree that {CONTACT.org} may store these details in order to
                    reply to me.{' '}
                    <Link to="/privacy" className="text-ds-amber hover:underline">
                      Privacy notice
                    </Link>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!consent || status === 'submitting'}
                  className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={16} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2" size={16} />
                      Request consultation
                    </>
                  )}
                </button>
              </form>
            </ScrollReveal>
          )}
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-ds-text-secondary uppercase tracking-[0.08em] mb-2">
        {label} {required && <span className="text-ds-amber">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="form-control"
      />
    </div>
  );
}
