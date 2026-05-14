import { ScrollReveal } from './ScrollReveal';

export function Footer() {
  return (
    <footer id="footer" className="relative z-[2] bg-ds-bg border-t border-ds-divider">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-20">
        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <img
                src="/logo.png"
                alt="DeepSynaps"
                className="h-8 w-auto mb-3"
              />
              <p className="text-[13px] text-ds-text-secondary leading-relaxed">
                Building the Future of Brain-Inspired Intelligence
              </p>
            </div>

            {/* Organization */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-ds-text-secondary mb-4">
                Organization
              </h4>
              <ul className="space-y-3">
                {[
                  { label: 'DeepSynaps', href: '#' },
                  { label: 'DeepSynaps OS', href: '#os-preview' },
                  { label: 'DeepSynaps Lab', href: '#lab-preview' },
                  { label: 'DeepSynaps Academy', href: '#academy-preview' },
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

            {/* Resources */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-ds-text-secondary mb-4">
                Resources
              </h4>
              <ul className="space-y-3">
                {['Research', 'Publications', 'Documentation', 'Events'].map(
                  (label) => (
                    <li key={label}>
                      <a
                        href="#"
                        className="text-[13px] text-ds-text-secondary hover:text-ds-text transition-colors duration-200"
                      >
                        {label}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-ds-text-secondary mb-4">
                Connect
              </h4>
              <ul className="space-y-3">
                {[
                  { label: 'Contact', href: 'mailto:contact@deepsynaps.org' },
                  { label: 'LinkedIn', href: '#' },
                  { label: 'GitHub', href: '#' },
                  { label: 'X / Twitter', href: '#' },
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
          </div>
        </ScrollReveal>

        {/* Disclaimer Box */}
        <div className="mt-12 mb-8 disclaimer-box">
          <p className="text-[13px] text-ds-text-secondary leading-relaxed">
            DeepSynaps OS is designed for clinical decision support and workflow
            assistance only. It does not diagnose, prescribe, replace clinicians,
            or provide emergency triage. This website and its contents are for
            informational purposes only and do not constitute medical advice.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-ds-divider pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ds-text-secondary/60">
            &copy; 2025 DeepSynaps. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-ds-text-secondary/60">
            <a href="#" className="hover:text-ds-text-secondary transition-colors">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#" className="hover:text-ds-text-secondary transition-colors">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
