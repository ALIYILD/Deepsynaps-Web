import { ScrollReveal } from '@/components/ScrollReveal';

export function MissionSection() {
  return (
    <section
      id="mission"
      className="relative z-[2] bg-ds-bg py-20 md:py-28 lg:py-32 px-6 md:px-12"
    >
      <div className="max-w-[800px] mx-auto text-center">
        <ScrollReveal>
          <p className="section-label">Our Mission</p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.3] text-ds-text tracking-[-0.015em]">
            DeepSynaps connects artificial intelligence, neuroscience, clinical
            systems, neurotechnology, and cognitive computing into a unified
            framework for advancing human understanding and clinical capability.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="text-base font-normal leading-[1.75] text-ds-text-secondary max-w-[640px] mx-auto mt-6">
            We operate at the intersection of biological insight and
            computational architecture — building systems that are
            evidence-aware, clinically grounded, and human-centered by design.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
