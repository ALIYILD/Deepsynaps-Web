import {
  Stethoscope,
  Microscope,
  Waves,
  Cpu,
  Award,
  Route,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router';
import { ScrollReveal, StaggerContainer } from '@/components/ScrollReveal';

const courses = [
  {
    icon: Stethoscope,
    title: 'AI for Clinicians',
    description:
      'Practical AI literacy and application for clinical professionals in neurotechnology and neurology.',
  },
  {
    icon: Microscope,
    title: 'Neurotechnology Education',
    description:
      'Comprehensive curricula covering the principles, devices, and applications of modern neurotechnology.',
  },
  {
    icon: Waves,
    title: 'qEEG / TMS / tDCS Learning',
    description:
      'Specialized training in quantitative EEG analysis, transcranial magnetic stimulation, and direct current stimulation.',
  },
  {
    icon: Cpu,
    title: 'Brain-Inspired Computing',
    description:
      'Courses in neuromorphic engineering, spiking neural networks, and biologically-inspired computation.',
  },
  {
    icon: Award,
    title: 'Professional Training',
    description:
      'Workshops, bootcamps, and intensive programs for professionals entering the neuro-AI field.',
  },
  {
    icon: Route,
    title: 'Certification Pathways',
    description:
      'Structured certification programs establishing standards of competence in neuro-AI practice and research.',
  },
];

export function AcademyPreviewSection() {
  return (
    <section
      id="academy-preview"
      className="relative z-[2] py-20 md:py-28 lg:py-32 px-6 md:px-12"
      style={{
        background: `radial-gradient(circle at 50% 0%, rgba(212,148,58,0.08) 0%, transparent 60%)`,
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12 md:mb-16">
          <ScrollReveal>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-ds-cyan mb-4">
              Education
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-ds-text tracking-[-0.015em] mb-4">
              DeepSynaps Academy
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-[clamp(1.0625rem,1.3vw,1.25rem)] font-normal text-ds-text-secondary max-w-[640px]">
              Professional learning for clinicians, researchers, and innovators
              working at the intersection of AI and neuroscience.
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          staggerDelay={0.1}
        >
          {courses.map((course) => {
            const Icon = course.icon;
            return (
              <div
                key={course.title}
                className="glass-card glass-card-cyan"
                style={{ borderTop: '3px solid #2E8FDB' }}
              >
                {/* Icon + Title Row */}
                <div className="flex items-center gap-3 mb-3">
                  <Icon size={20} className="text-ds-cyan flex-shrink-0" />
                  <h4 className="text-sm font-semibold uppercase tracking-[0.04em] text-ds-text">
                    {course.title}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-[13px] text-ds-text-secondary leading-[1.6]">
                  {course.description}
                </p>
              </div>
            );
          })}
        </StaggerContainer>

        <ScrollReveal>
          <div className="mt-12 text-center">
            <Link to="/academy" className="btn-primary">
              Explore the Academy
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
