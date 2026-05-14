import { Link } from 'react-router';
import {
  Brain,
  Activity,
  Microscope,
  Stethoscope,
  ArrowRight,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

const services = [
  {
    icon: Brain,
    title: 'AI Protocol Development',
    blurb:
      'Custom clinical AI protocols for neuromodulation, QEEG-guided care, and decision support — built to your patient population.',
    accent: 'amber',
  },
  {
    icon: Activity,
    title: 'Neuromodulation Consultation',
    blurb:
      'Protocol design and second opinions for tDCS, TMS, rTMS, neurofeedback, and combined modalities.',
    accent: 'violet',
  },
  {
    icon: Microscope,
    title: 'QEEG / Brain-Map Review',
    blurb:
      'Raw-data clinical workstation review, biomarker analysis, and brain-map–driven protocol planning.',
    accent: 'cyan',
  },
  {
    icon: Stethoscope,
    title: 'Clinic Integration',
    blurb:
      'Deploy DeepSynaps OS into your clinic — workflow design, staff training, and ongoing governance.',
    accent: 'amber',
  },
];

const accentRing: Record<string, string> = {
  amber: 'bg-ds-amber/10 border-ds-amber/25 text-ds-amber',
  violet: 'bg-ds-violet/10 border-ds-violet/25 text-ds-violet',
  cyan: 'bg-ds-cyan/10 border-ds-cyan/25 text-ds-cyan',
};

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative z-[1] py-24 md:py-32 px-6 md:px-8 lg:px-12"
    >
      <div className="max-w-[1200px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14 md:mb-20">
            <span className="section-label">Services</span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-ds-text mb-5 tracking-tight">
              Work with us
            </h2>
            <p className="text-ds-text-secondary max-w-2xl mx-auto text-lg leading-relaxed">
              Consultations, custom AI protocols, and clinic-level integration —
              for neuromodulation practices, research labs, and digital-health
              teams.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.08}>
              <div className="glass-card h-full group">
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${accentRing[s.accent]}`}
                >
                  <s.icon size={22} />
                </div>
                <h3 className="text-xl font-semibold text-ds-text mb-3">
                  {s.title}
                </h3>
                <p className="text-[14px] text-ds-text-secondary leading-relaxed">
                  {s.blurb}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center">
            <Link to="/consultations" className="btn-primary">
              Request a consultation
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
