import { ScrollReveal } from '@/components/ScrollReveal';

export function VisionSection() {
  return (
    <section
      id="vision"
      className="relative z-[2] bg-ds-bg py-24 md:py-36 lg:py-40 px-6 md:px-12"
    >
      <div className="max-w-[800px] mx-auto text-center">
        <ScrollReveal>
          <p className="section-label">Our Vision</p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.4] italic text-ds-text">
            &ldquo;We believe the next generation of intelligence systems will be
            shaped by the convergence of biological insight, computational
            architecture, and human-centered clinical design.&rdquo;
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="text-base font-normal text-ds-text-secondary mt-6">
            &mdash; The DeepSynaps Team
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.45}>
          <a href="mailto:contact@deepsynaps.org" className="btn-primary mt-10 inline-flex">
            Get in Touch
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
