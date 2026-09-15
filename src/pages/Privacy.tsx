/**
 * A short, honest privacy notice.
 *
 * It exists because the footer linked to `href="#"`, and because the site now
 * collects contact details through three routes. It describes what those routes
 * actually do — the ones in this repository, not a generic template — so it
 * says Telegram and Supabase by name and does not claim a retention schedule,
 * a cookie banner or a DPO that does not exist.
 */
import { ScrollReveal } from '@/components/ScrollReveal';
import { CONTACT } from '@/config/contact';

export default function Privacy() {
  return (
    <div className="pt-32 md:pt-40 pb-24">
      <section className="px-6 md:px-8 lg:px-12">
        <div className="max-w-[780px] mx-auto">
          <ScrollReveal>
            <span className="section-label">Privacy</span>
            <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-ds-text mb-4">
              What happens to what you send us
            </h1>
            <p className="text-ds-text-secondary leading-relaxed">
              {CONTACT.org} is led by {CONTACT.founder} and based in {CONTACT.basedIn}. This notice
              covers this website only.
            </p>
          </ScrollReveal>

          <div className="mt-12 space-y-10">
            <Block title="What we collect">
              <p>
                Only what you type into one of three places: the consultation form on{' '}
                <a className="text-ds-amber hover:underline" href="/consultations">/consultations</a>,
                the contact widget in the corner of every page, and the notify form on the
                DeepSynaps Academy site. Between them that is your name, your email address or
                phone number, your organisation, which service or topic you are interested in, and
                whatever you write in the message box. If you use the chat, the messages you send
                in that conversation travel with your enquiry so we can see what you were asking
                about.
              </p>
              <p>
                We do not run analytics, advertising or tracking cookies on this site. The chat
                keeps one random conversation id in your browser's session storage so the
                conversation hangs together; it disappears when you close the tab and it identifies
                nothing about you.
              </p>
            </Block>

            <Block title="Why we have it, and what we do with it">
              <p>
                To reply to you. That is the whole purpose. Your details go to a private Telegram
                channel that {CONTACT.founder} reads, and, where it is configured, to a database we
                control so an enquiry is not lost if a message is missed. We do not sell your
                details, share them with advertisers, or add you to a mailing list you did not ask
                to join.
              </p>
              <p>
                We keep an enquiry for as long as the conversation it belongs to is live, and then
                for as long as we may reasonably need it to pick the thread back up. If you would
                rather we did not, say so and we will delete it.
              </p>
            </Block>

            <Block title="WhatsApp and email">
              <p>
                If you message us on WhatsApp or write to{' '}
                <a className="text-ds-amber hover:underline" href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>
                , that conversation lives in WhatsApp and in our email provider under their terms,
                not ours. We read it and reply to it. Nothing is copied from it into anything else
                automatically.
              </p>
            </Block>

            <Block title="Please do not send patient information">
              <p>
                None of these channels is a secure clinical channel, and the chat assistant is not
                a clinician. Please do not send patient names, records, scans or any other personal
                health information through this site. If you need to discuss a case, tell us that
                much and we will arrange a secure channel with you.
              </p>
            </Block>

            <Block title="Seeing, correcting or deleting what we hold">
              <p>
                Email{' '}
                <a className="text-ds-amber hover:underline" href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>{' '}
                and ask. We will tell you what we have about you, correct it, or delete it. You do
                not need to give a reason, and there is no form to fill in.
              </p>
            </Block>
          </div>

          <div className="mt-14 disclaimer-box">
            <p className="text-[13px] text-ds-text-secondary leading-relaxed">
              This site is for informational purposes and does not constitute medical advice.
              {' '}{CONTACT.org} services and {CONTACT.org} OS support clinical decisions and
              workflow; they do not diagnose, prescribe, replace clinicians, or provide emergency
              triage.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <ScrollReveal>
      <div>
        <h2 className="font-display text-xl md:text-2xl font-semibold text-ds-text mb-4">{title}</h2>
        <div className="space-y-4 text-[15px] leading-[1.75] text-ds-text-secondary">{children}</div>
      </div>
    </ScrollReveal>
  );
}
