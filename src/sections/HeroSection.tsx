import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative z-[1] min-h-[100dvh] flex flex-col items-center justify-center text-center px-6 md:px-12 pt-28 pb-20"
    >
      <div className="max-w-[960px] mx-auto">
        {/* Eyebrow */}
        <p
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-[0.14em] text-ds-amber bg-ds-amber/8 border border-ds-amber/20 mb-7"
          style={{
            animation:
              'fade-up 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards',
            opacity: 0,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-ds-amber animate-pulse" />
          Clinical AI · Neuromodulation · Brain-Inspired Intelligence
        </p>

        {/* Headline */}
        <h1
          className="font-display text-[clamp(2.75rem,6vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-ds-text mb-7 text-balance"
          style={{
            animation:
              'fade-up 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s forwards',
            opacity: 0,
          }}
        >
          The future of clinical intelligence,{' '}
          <span className="gradient-text">designed for your clinic.</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-[clamp(1.05rem,1.4vw,1.3rem)] font-normal leading-[1.65] text-ds-text-secondary max-w-[720px] mx-auto mb-12 text-balance"
          style={{
            animation:
              'fade-up 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s forwards',
            opacity: 0,
          }}
        >
          DeepSynaps partners with clinicians and clinics to develop AI
          protocols, design neuromodulation interventions, and review brain-map
          data — grounded in evidence, built around your patients.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{
            animation:
              'fade-up 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s forwards',
            opacity: 0,
          }}
        >
          <Link to="/consultations" className="btn-primary">
            Book a consultation
            <ArrowRight size={16} className="ml-2" />
          </Link>
          <a href="#services" className="btn-ghost">
            Explore services
          </a>
        </div>

        {/* Trust strip */}
        <div
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.14em] text-ds-text-secondary/65"
          style={{
            animation:
              'fade-in 0.8s ease-out 1s forwards',
            opacity: 0,
          }}
        >
          <span>QEEG-guided protocols</span>
          <span className="w-1 h-1 rounded-full bg-ds-text-secondary/30" />
          <span>tDCS · TMS · Neurofeedback</span>
          <span className="w-1 h-1 rounded-full bg-ds-text-secondary/30" />
          <span>Evidence-graded</span>
          <span className="w-1 h-1 rounded-full bg-ds-text-secondary/30" />
          <span>Clinician-led</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        style={{
          animation: 'fade-in 0.8s ease-out 1.2s forwards',
          opacity: 0,
        }}
      >
        <div className="w-px h-8 bg-white/30" />
        <ChevronDown
          size={16}
          className="text-white/30 animate-bounce-scroll"
        />
      </div>
    </section>
  );
}
