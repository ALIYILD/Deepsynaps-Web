import { Brain, FlaskConical, GraduationCap } from 'lucide-react';
import { ScrollReveal, StaggerContainer } from '@/components/ScrollReveal';

const cards = [
  {
    icon: Brain,
    title: 'DeepSynaps OS',
    description:
      'Clinical intelligence infrastructure for neurotechnology clinics, evidence-aware workflows, protocol support, digital brain systems, and clinical decision support.',
    link: '#os-preview',
    linkText: 'Learn more',
    accent: 'amber',
    iconBg: 'rgba(212, 148, 58, 0.1)',
    iconBorder: 'rgba(212, 148, 58, 0.2)',
    iconColor: '#D4943A',
  },
  {
    icon: FlaskConical,
    title: 'DeepSynaps Lab',
    description:
      'Research and innovation in computational neuroscience, neuromorphic computing, qEEG, digital twins, neuro-AI systems, and brain-inspired architectures.',
    link: '#lab-preview',
    linkText: 'Learn more',
    accent: 'violet',
    iconBg: 'rgba(107, 78, 230, 0.1)',
    iconBorder: 'rgba(107, 78, 230, 0.2)',
    iconColor: '#6B4EE6',
  },
  {
    icon: GraduationCap,
    title: 'DeepSynaps Academy',
    description:
      'Education, training, certifications, and professional learning for clinicians, researchers, and innovators working at the intersection of AI and neuroscience.',
    link: '#academy-preview',
    linkText: 'Learn more',
    accent: 'cyan',
    iconBg: 'rgba(46, 143, 219, 0.1)',
    iconBorder: 'rgba(46, 143, 219, 0.2)',
    iconColor: '#2E8FDB',
  },
];

export function EcosystemSection() {
  return (
    <section
      id="ecosystem"
      className="relative z-[2] py-20 md:py-28 lg:py-32 px-6 md:px-12"
      style={{
        background: `radial-gradient(circle at 50% 0%, rgba(212,148,58,0.08) 0%, transparent 60%)`,
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <ScrollReveal>
            <p className="section-label">The Ecosystem</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-ds-text tracking-[-0.015em] mb-4">
              Three Pillars. One Vision.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-[clamp(1.0625rem,1.3vw,1.25rem)] font-normal text-ds-text-secondary max-w-[600px] mx-auto">
              DeepSynaps operates through three integrated divisions, each
              advancing a distinct dimension of brain-inspired intelligence.
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7"
          staggerDelay={0.15}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`glass-card flex flex-col ${
                  card.accent === 'violet'
                    ? 'glass-card-violet'
                    : card.accent === 'cyan'
                      ? 'glass-card-cyan'
                      : ''
                }`}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                  style={{
                    background: card.iconBg,
                    border: `1px solid ${card.iconBorder}`,
                  }}
                >
                  <Icon size={24} style={{ color: card.iconColor }} />
                </div>

                {/* Title */}
                <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold text-ds-text tracking-[-0.01em] mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-base font-normal text-ds-text-secondary leading-[1.75] mb-5 flex-1">
                  {card.description}
                </p>

                {/* Link */}
                <a
                  href={card.link}
                  className="text-[13px] font-medium inline-flex items-center gap-1 group"
                  style={{ color: card.iconColor }}
                >
                  {card.linkText}
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    &rarr;
                  </span>
                </a>
              </div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
