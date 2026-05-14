import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';

const navLinks = [
  { label: 'Ecosystem', href: '#ecosystem' },
  { label: 'OS', href: '#os-preview' },
  { label: 'Lab', href: '#lab-preview' },
  { label: 'Academy', href: '#academy-preview' },
  { label: 'Vision', href: '#vision' },
  { label: 'Contact', href: '#footer' },
];

export function Header() {
  const scrollY = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isScrolled = scrollY > 100;

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[rgba(5,10,20,0.85)] backdrop-blur-[16px] border-b border-ds-divider py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <img
              src="/logo.png"
              alt="DeepSynaps"
              className="h-8 md:h-9 w-auto"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
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

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden w-11 h-11 flex items-center justify-center text-ds-text"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] bg-[rgba(5,10,20,0.97)] backdrop-blur-[20px] flex flex-col items-center justify-center animate-fade-in"
          style={{ animation: 'fade-in 0.3s ease forwards' }}
        >
          <button
            className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center text-ds-text"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          <nav className="flex flex-col items-center gap-8">
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
          </nav>
        </div>
      )}
    </>
  );
}
