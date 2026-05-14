import { Link } from 'react-router';
import { Mail, MessageCircle, MapPin } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { CONTACT, isWhatsAppConfigured } from '@/config/contact';

export function Footer() {
  return (
    <footer
      id="footer"
      className="relative z-[2] bg-gradient-to-b from-transparent to-[#020510]/90 border-t border-ds-divider"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-20">
        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <img
                src="/logo.png"
                alt="DeepSynaps"
                className="h-8 w-auto mb-3"
              />
              <p className="text-[13px] text-ds-text-secondary leading-relaxed mb-4">
                Clinical AI, neuromodulation consultations, and brain-inspired
                intelligence — for clinics and researchers.
              </p>
              <Link
                to="/consultations"
                className="inline-flex items-center text-[13px] font-semibold text-ds-amber hover:text-ds-amber/80 transition-colors"
              >
                Book a consultation →
              </Link>
            </div>

            {/* Organization */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-ds-text-secondary mb-4">
                Organization
              </h4>
              <ul className="space-y-3">
                {[
                  { label: 'About', href: '/about' },
                  { label: 'DeepSynaps OS', href: '/#os-preview' },
                  { label: 'DeepSynaps Lab', href: '/#lab-preview' },
                  { label: 'DeepSynaps Academy', href: '/#academy-preview' },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-ds-text-secondary hover:text-ds-text transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-ds-text-secondary mb-4">
                Services
              </h4>
              <ul className="space-y-3">
                {[
                  'AI Protocol Development',
                  'Neuromodulation Consultation',
                  'QEEG / Brain-Map Review',
                  'Clinic Integration',
                ].map((label) => (
                  <li key={label}>
                    <Link
                      to="/consultations"
                      className="text-[13px] text-ds-text-secondary hover:text-ds-text transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-ds-text-secondary mb-4">
                Connect
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="inline-flex items-center gap-2 text-[13px] text-ds-text-secondary hover:text-ds-text transition-colors duration-200"
                  >
                    <Mail size={13} /> {CONTACT.email}
                  </a>
                </li>
                {isWhatsAppConfigured() && (
                  <li>
                    <a
                      href={`https://wa.me/${CONTACT.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[13px] text-ds-text-secondary hover:text-ds-text transition-colors duration-200"
                    >
                      <MessageCircle size={13} /> WhatsApp
                    </a>
                  </li>
                )}
                <li className="inline-flex items-center gap-2 text-[13px] text-ds-text-secondary">
                  <MapPin size={13} /> {CONTACT.basedIn}
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Disclaimer Box */}
        <div className="mt-12 mb-8 disclaimer-box">
          <p className="text-[13px] text-ds-text-secondary leading-relaxed">
            DeepSynaps services and DeepSynaps OS are designed for clinical
            decision support and workflow assistance only. They do not
            diagnose, prescribe, replace clinicians, or provide emergency
            triage. This website and its contents are for informational
            purposes only and do not constitute medical advice.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-ds-divider pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ds-text-secondary/60">
            &copy; {new Date().getFullYear()} {CONTACT.org}. All rights
            reserved.
          </p>
          <div className="flex gap-4 text-xs text-ds-text-secondary/60">
            <a
              href="#"
              className="hover:text-ds-text-secondary transition-colors"
            >
              Privacy Policy
            </a>
            <span>|</span>
            <a
              href="#"
              className="hover:text-ds-text-secondary transition-colors"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
