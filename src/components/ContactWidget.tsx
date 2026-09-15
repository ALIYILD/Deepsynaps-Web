/**
 * The floating contact layer. Replaces the WhatsApp-only bubble.
 *
 * THREE TABS, ONE BUTTON. The old widget offered exactly one way to make
 * contact and it was the one that leaves the site. This one keeps WhatsApp and
 * email as first-class tabs — they are still the fastest route for many people
 * — and adds a chat that can answer from the site's own content and hand a
 * written message to Dr. Ali without the visitor leaving the page.
 *
 * ACCESSIBILITY IS NOT A LATER PASS. The panel is a labelled dialog, the tabs
 * are a real tablist with arrow-key navigation, Escape closes and returns focus
 * to the launcher, and focus moves into the panel when it opens. A contact
 * widget that only works with a mouse is a contact widget that excludes people.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Mail, Phone, MessagesSquare, Linkedin } from 'lucide-react';
import { CONTACT, isLinkedInConfigured } from '@/config/contact';
import { ChatPanel } from './contact-widget/ChatPanel';
import { LeadForm } from './contact-widget/LeadForm';
import type { ChatTurn, LeadInterest, LeadSource } from './contact-widget/types';

type Tab = 'chat' | 'whatsapp' | 'email';

/**
 * The labels stay one word each. "WhatsApp / Call" was measured against the
 * real tab row: at a 400px viewport the panel is 368px, each of the three tabs
 * gets 122.7px, and the longer label needs 122.6px once its icon, gap and
 * padding are paid for. Fitting by a tenth of a pixel is not fitting — one
 * font substitution or a larger default text size and it wraps — so the call
 * lives inside the WhatsApp tab, where it has room to say the number in full.
 */
const TABS: ReadonlyArray<{ id: Tab; label: string; icon: typeof MessageCircle }> = [
  { id: 'chat', label: 'Chat', icon: MessagesSquare },
  { id: 'whatsapp', label: 'WhatsApp', icon: Phone },
  { id: 'email', label: 'Email', icon: Mail },
];

/**
 * What the visitor is most likely asking about, inferred from the page they are
 * on. It only pre-selects a dropdown they can change, so a wrong guess costs
 * one click and a right one saves a decision.
 */
function pageContext(pathname: string): { interest: LeadInterest; subject: string; prefill: string } {
  if (pathname.startsWith('/academy')) {
    return {
      interest: 'academy-waitlist',
      subject: 'DeepSynaps Academy enquiry',
      prefill: `Hi ${CONTACT.founder} — I'd like to hear about DeepSynaps Academy cohorts.`,
    };
  }
  if (pathname.startsWith('/consultations')) {
    return {
      interest: 'consultation',
      subject: 'Consultation request',
      prefill: CONTACT.whatsappPrefill,
    };
  }
  if (pathname.startsWith('/about')) {
    return {
      interest: 'consultation',
      subject: 'DeepSynaps enquiry',
      prefill: `Hi ${CONTACT.founder} — I read about DeepSynaps and have a question.`,
    };
  }
  return {
    interest: 'consultation',
    subject: 'DeepSynaps enquiry',
    prefill: CONTACT.whatsappPrefill,
  };
}

export function ContactWidget() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<Tab>('chat');
  const [history, setHistory] = useState<ChatTurn[]>([]);
  const [handoff, setHandoff] = useState(false);
  const [pathname, setPathname] = useState('/');

  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 700);
    return () => clearTimeout(timer);
  }, []);

  // The path is read when the panel opens rather than tracked in an effect: it
  // is only used to pre-fill a prefill and a subject line, and reading it from
  // the DOM rather than a router hook means this component still works if it is
  // ever rendered outside a Router.
  const toggle = useCallback(() => {
    setOpen((value) => {
      if (!value) setPathname(window.location.pathname);
      return !value;
    });
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, close]);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  const context = pageContext(pathname);
  const waLink = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(context.prefill)}`;
  const mailLink = `mailto:${CONTACT.email}?subject=${encodeURIComponent(context.subject)}`;

  const onTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const next = event.key === 'ArrowRight'
      ? (index + 1) % TABS.length
      : (index - 1 + TABS.length) % TABS.length;
    setTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      className={`fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[80] transition-all duration-500 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      {open && (
        <div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="false"
          aria-label={`Contact ${CONTACT.org}`}
          className="mb-3 w-[min(92vw,380px)] h-[min(78vh,560px)] flex flex-col rounded-2xl bg-[#0a1326]/97 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.55)] overflow-hidden outline-none"
        >
          <header className="flex items-center gap-3 px-4 py-3 border-b border-white/8 bg-gradient-to-r from-ds-amber/12 to-transparent">
            <div className="w-9 h-9 rounded-full bg-ds-amber/15 border border-ds-amber/30 flex items-center justify-center text-ds-amber flex-shrink-0">
              <MessageCircle size={17} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-ds-text truncate">{CONTACT.org}</p>
              <p className="text-[11px] text-ds-text-secondary truncate">
                {handoff ? `Message ${CONTACT.founder}` : 'Ask a question or reach us directly'}
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close contact panel"
              className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center text-ds-text-secondary hover:text-ds-text flex-shrink-0"
            >
              <X size={15} />
            </button>
          </header>

          <div role="tablist" aria-label="Contact methods" className="flex border-b border-white/8 flex-shrink-0">
            {TABS.map((entry, index) => {
              const active = tab === entry.id;
              return (
                <button
                  key={entry.id}
                  ref={(node) => { tabRefs.current[index] = node; }}
                  type="button"
                  role="tab"
                  id={`cw-tab-${entry.id}`}
                  aria-selected={active}
                  aria-controls={`cw-panel-${entry.id}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => { setTab(entry.id); setHandoff(false); }}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 text-[12px] font-medium transition-colors border-b-2 ${
                    active
                      ? 'border-ds-amber text-ds-text'
                      : 'border-transparent text-ds-text-secondary hover:text-ds-text'
                  }`}
                >
                  <entry.icon size={13} />
                  {entry.label}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`cw-panel-${tab}`}
            aria-labelledby={`cw-tab-${tab}`}
            className="flex-1 min-h-0 overflow-y-auto"
          >
            {tab === 'chat' && (handoff ? (
              <LeadForm
                site="web"
                source={'chat-web' as LeadSource}
                history={history}
                defaultInterest={context.interest}
                onCancel={() => setHandoff(false)}
              />
            ) : (
              <ChatPanel
                site="web"
                history={history}
                onHistoryChange={setHistory}
                onHandoff={() => setHandoff(true)}
              />
            ))}

            {tab === 'whatsapp' && (
              <DirectTab
                title="Message us on WhatsApp"
                body={`The quickest route for a short question. The message opens pre-written for the page you are on, and you can change it before you send.`}
                href={waLink}
                cta="Open WhatsApp"
                external
                secondary={
                  <a
                    href={`tel:${CONTACT.phoneE164}`}
                    className="inline-flex items-center gap-2 text-[12.5px] text-ds-amber underline underline-offset-2 hover:text-ds-amber/80 transition-colors"
                  >
                    <Phone size={13} /> Call {CONTACT.phoneDisplay}
                  </a>
                }
              />
            )}

            {tab === 'email' && (
              <DirectTab
                title="Email us"
                body={`Best for anything with detail. Writes to ${CONTACT.email} with a subject line already set. Please do not include patient identifiers.`}
                href={mailLink}
                cta={CONTACT.email}
                secondary={isLinkedInConfigured() ? (
                  <a
                    href={CONTACT.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[12.5px] text-ds-amber underline underline-offset-2 hover:text-ds-amber/80 transition-colors"
                  >
                    <Linkedin size={13} /> LinkedIn
                  </a>
                ) : null}
              />
            )}
          </div>
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? `Close contact panel` : `Contact ${CONTACT.org}`}
        className="group relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-ds-amber hover:brightness-110 shadow-[0_8px_28px_rgba(212,148,58,0.45)] flex items-center justify-center transition-all hover:scale-105 ml-auto"
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-ds-amber opacity-40 animate-ping" aria-hidden="true" />
        )}
        {open
          ? <X size={24} className="relative text-[#050A14]" strokeWidth={2.4} />
          : <MessageCircle size={25} className="relative text-[#050A14]" strokeWidth={2.2} />}
      </button>
    </div>
  );
}

/**
 * `secondary` is the second-best route out of a tab — a phone call under the
 * WhatsApp button, a profile link under the email one. It sits below the
 * primary action rather than beside it so the recommended route stays obvious.
 */
function DirectTab({
  title, body, href, cta, external = false, secondary = null,
}: {
  title: string; body: string; href: string; cta: string;
  external?: boolean; secondary?: React.ReactNode;
}) {
  return (
    <div className="px-5 py-6 text-center">
      <p className="text-sm font-semibold text-ds-text mb-2">{title}</p>
      <p className="text-[13px] text-ds-text-secondary leading-relaxed mb-6">{body}</p>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-ds-amber px-4 py-2.5 text-[13px] font-semibold text-[#050A14] hover:opacity-90 transition-opacity break-all"
      >
        {cta}
      </a>
      {secondary && <div className="mt-4">{secondary}</div>}
    </div>
  );
}
