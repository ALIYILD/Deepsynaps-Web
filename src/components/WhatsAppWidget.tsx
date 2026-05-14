import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { CONTACT, isWhatsAppConfigured } from '@/config/contact';

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 700);
    return () => clearTimeout(t);
  }, []);

  if (!isWhatsAppConfigured()) {
    return null;
  }

  const waLink = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
    CONTACT.whatsappPrefill,
  )}`;

  return (
    <div
      className={`fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[80] transition-all duration-500 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Chat preview card */}
      {open && (
        <div
          className="mb-3 w-[300px] rounded-2xl bg-[#0d1830]/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden animate-[fade-up_0.25s_ease-out_forwards]"
          role="dialog"
          aria-label="WhatsApp contact"
        >
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#075e54] to-[#128c7e]">
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
              <MessageCircle size={18} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {CONTACT.founder}
              </p>
              <p className="text-[11px] text-white/80">
                Typically replies within an hour
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="w-7 h-7 rounded-full hover:bg-white/15 flex items-center justify-center text-white/90"
            >
              <X size={14} />
            </button>
          </div>
          <div className="px-4 py-4 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22><circle cx=%2220%22 cy=%2220%22 r=%221%22 fill=%22%23ffffff10%22/></svg>')]">
            <div className="bg-[#1a2540] rounded-lg px-3 py-2.5 max-w-[85%]">
              <p className="text-[13px] text-ds-text leading-relaxed">
                Hi there 👋
                <br />
                How can we help with your clinic or consultation?
              </p>
            </div>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-sm py-3 transition-colors"
          >
            Start chat on WhatsApp
          </a>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
        className="group relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] shadow-[0_8px_28px_rgba(37,211,102,0.45)] flex items-center justify-center transition-all hover:scale-105"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" />
        <MessageCircle
          size={26}
          className="relative text-white"
          strokeWidth={2.2}
        />
      </button>
    </div>
  );
}
