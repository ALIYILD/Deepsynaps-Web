import { ScrollReveal, StaggerContainer } from '@/components/ScrollReveal';

const themes = [
  {
    number: '01',
    title: 'Neuromorphic Computing',
    description:
      'Hardware and software architectures that mimic the structure and function of biological neural networks.',
  },
  {
    number: '02',
    title: 'Brain-Inspired AI',
    description:
      'Machine learning systems informed by neuroscience research, from attention mechanisms to memory architectures.',
  },
  {
    number: '03',
    title: 'Computational Neuroscience',
    description:
      'Mathematical and computational modeling of neural systems, from single neurons to large-scale brain networks.',
  },
  {
    number: '04',
    title: 'Digital Brain Systems',
    description:
      'Comprehensive digital representations of brain structure and function for research and clinical applications.',
  },
  {
    number: '05',
    title: 'Human-AI Interfaces',
    description:
      'Novel interaction paradigms that enable seamless collaboration between humans and intelligent systems.',
  },
  {
    number: '06',
    title: 'Neurotechnology Innovation',
    description:
      'Developing next-generation devices and platforms for sensing, stimulating, and interfacing with the nervous system.',
  },
];

export function LabPreviewSection() {
  return (
    <section
      id="lab-preview"
      className="relative z-[2] bg-ds-bg-alt py-20 md:py-28 lg:py-32 px-6 md:px-12"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12 md:mb-16">
          <ScrollReveal>
            <p className="section-label">Research</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-ds-text tracking-[-0.015em] mb-4">
              DeepSynaps Lab
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-[clamp(1.0625rem,1.3vw,1.25rem)] font-normal text-ds-text-secondary max-w-[640px]">
              Pushing the boundaries of what&apos;s possible at the intersection
              of neuroscience and artificial intelligence.
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          staggerDelay={0.12}
        >
          {themes.map((theme) => (
            <div
              key={theme.number}
              className="glass-card relative overflow-hidden"
              style={{ borderTop: '3px solid #D4943A' }}
            >
              {/* Decorative Number */}
              <span className="absolute top-4 right-4 text-[clamp(2rem,3vw,2.5rem)] font-bold text-white/[0.06] select-none">
                {theme.number}
              </span>

              {/* Title */}
              <h3 className="text-[clamp(1.25rem,1.8vw,1.5rem)] font-semibold text-ds-text tracking-[-0.01em] mb-3 relative z-[1]">
                {theme.title}
              </h3>

              {/* Description */}
              <p className="text-base font-normal text-ds-text-secondary leading-[1.75] relative z-[1]">
                {theme.description}
              </p>
            </div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
