import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative z-[1] min-h-[100dvh] flex flex-col items-center justify-center text-center px-6 md:px-12 pt-28 pb-20"
      style={{
        background:
          'linear-gradient(to bottom, rgba(5,10,20,0.25) 0%, rgba(5,10,20,0.5) 50%, #050A14 100%)',
      }}
    >
      <div className="max-w-[900px] mx-auto">
        {/* Section Label */}
        <p
          className="text-xs font-medium uppercase tracking-[0.12em] text-ds-amber mb-6"
          style={{ animation: 'fade-up 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards', opacity: 0 }}
        >
          Interdisciplinary AI & Neuroscience
        </p>

        {/* Headline */}
        <h1
          className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-ds-text mb-6"
          style={{ animation: 'fade-up 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s forwards', opacity: 0 }}
        >
          Building the Future of Brain-Inspired Intelligence
        </h1>

        {/* Subheadline */}
        <p
          className="text-[clamp(1.125rem,1.5vw,1.375rem)] font-normal leading-[1.7] text-ds-text-secondary max-w-[700px] mx-auto mb-10"
          style={{ animation: 'fade-up 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s forwards', opacity: 0 }}
        >
          DeepSynaps is an interdisciplinary AI and neuroscience organization
          advancing clinical intelligence, brain-inspired computing, and
          human-centered neurotechnology.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{ animation: 'fade-up 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s forwards', opacity: 0 }}
        >
          <a href="#ecosystem" className="btn-primary">
            Explore the Ecosystem
          </a>
          <a href="#os-preview" className="btn-ghost">
            View DeepSynaps OS
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        style={{ animation: 'fade-in 0.8s ease-out 1.2s forwards', opacity: 0 }}
      >
        <div className="w-px h-8 bg-white/30" />
        <ChevronDown size={16} className="text-white/30 animate-bounce-scroll" />
      </div>
    </section>
  );
}
