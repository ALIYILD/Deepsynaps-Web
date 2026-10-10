import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link, NavLink } from "react-router";

const links = [
  { label: "Research", href: "/research" },
  { label: "NERVE", href: "/nerve" },
  { label: "Blogs", href: "/blogs" },
  { label: "Products", href: "/ecosystem" },
  { label: "Ecosystem", href: "/#ecosystem" },
  { label: "The Lab", href: "/about" },
];
export function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onNavigate}
      className="lab-brand"
      aria-label="DeepSynaps AI Lab home"
    >
      <img src="/deepsynaps-symbol.svg" width="42" height="42" alt="" />
      <span>
        <strong>DeepSynaps</strong>
        <small>AI LAB</small>
      </span>
    </Link>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="lab-header">
        <div className="lab-nav-inner">
          <Brand onNavigate={() => setOpen(false)} />
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((link) => (
              <NavLink key={link.label} to={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <Link to="/#collaborate" className="lab-button header-cta">
            Work with us <ArrowRight size={15} />
          </Link>
          <button
            className="mobile-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpen(false);
                document
                  .querySelector<HTMLButtonElement>(".mobile-toggle")
                  ?.focus();
              }
            }}
          >
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              className="lab-button"
              to="/#collaborate"
              onClick={() => setOpen(false)}
            >
              Work with us <ArrowRight size={16} />
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
