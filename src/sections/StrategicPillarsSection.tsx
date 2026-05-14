import {
  HeartPulse,
  Network,
  Cpu,
  Users,
  Brain,
  BookOpen,
} from 'lucide-react';
import { ScrollReveal, StaggerContainer } from '@/components/ScrollReveal';

const pillars = [
  {
    icon: HeartPulse,
    title: 'Clinical Intelligence',
    description:
      'Evidence-aware clinical decision support systems that augment — never replace — clinical expertise.',
  },
  {
    icon: Network,
    title: 'Neuroscience Infrastructure',
    description:
      'Building the foundational systems for next-generation neurotechnology research and application.',
  },
  {
    icon: Cpu,
    title: 'Brain-Inspired Computing',
    description:
      'Neuromorphic architectures and computational models derived from biological neural systems.',
  },
  {
    icon: Users,
    title: 'Human-Centered Neurotechnology',
    description:
      'Technology designed around human needs, clinical workflows, and ethical frameworks.',
  },
  {
    icon: Brain,
    title: 'AI Research',
    description:
      'Foundational research at the frontier of artificial intelligence and machine learning.',
  },
  {
    icon: BookOpen,
    title: 'Education & Training',
    description:
      'Professional development and knowledge transfer for the next generation of neuro-AI practitioners.',
  },
];

export function StrategicPillarsSection() {
  return (
    <section className="relative z-[2] bg-ds-bg-alt py-20 md:py-28 lg:py-32 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <ScrollReveal>
            <p className="section-label">Strategic Focus</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-ds-text tracking-[-0.015em] mb-4">
              What We Build
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-[clamp(1.0625rem,1.3vw,1.25rem)] font-normal text-ds-text-secondary">
              Six interconnected domains define our research and development
              agenda.
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5"
          staggerDelay={0.1}
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="pillar-block">
                <Icon
                  size={28}
                  className="text-ds-text-secondary mb-4 transition-colors duration-250"
                />
                <h4 className="text-sm font-semibold text-ds-text tracking-[-0.01em] mb-2">
                  {pillar.title}
                </h4>
                <p className="text-[13px] text-ds-text-secondary leading-[1.6]">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
