import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useScrollPosition } from '@/hooks/useScrollPosition';

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/#services' },
  { label: 'Ecosystem', href: '/#ecosystem' },
  { label: 'OS', href: '/#os-preview' },
  { label: 'Academy', href: '/#academy-preview' },
];

export function Header() {
  const scrollY = useScrollPosition();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isScrolled = scrollY > 60 || location.pathname !== '/';

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[rgba(5,10,20,0.85)] backdrop-blur-[16px] border-b border-ds-divider py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <img
              src="/logo.png"
              alt="DeepSynaps"
              className="h-8 md:h-9 w-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 flex-1 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-ds-text-secondary hover:text-ds-text transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/consultations"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-ds-bg bg-ds-amber hover:bg-ds-amber/90 px-4 py-2.5 rounded-lg transition-all hover:shadow-[0_4px_18px_rgba(212,148,58,0.35)]"
            >
              Book consultation
              <ArrowRight size={14} />
            </Link>
            <button
              className="md:hidden w-11 h-11 flex items-center justify-center text-ds-text"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-[rgba(5,10,20,0.97)] backdrop-blur-[20px] flex flex-col items-center justify-center">
          <button
            className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center text-ds-text"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className="text-2xl font-semibold text-ds-text hover:text-ds-amber transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/consultations"
              onClick={handleLinkClick}
              className="btn-primary mt-4"
            >
              Book consultation
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
