import { Link } from 'react-router';
import {
  ArrowRight,
  Brain,
  Microscope,
  Stethoscope,
  GraduationCap,
  Sparkles,
  Mail,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { CONTACT } from '@/config/contact';

const expertise = [
  {
    icon: Brain,
    title: 'Clinical AI',
    body: 'Designing AI systems that support — never replace — clinical judgment. Decision support, workflow assistance, and protocol governance.',
  },
  {
    icon: Microscope,
    title: 'QEEG & Brain Mapping',
    body: 'Raw-data review, biomarker interpretation, and brain-map–guided protocol planning for complex neuromodulation cases.',
  },
  {
    icon: Stethoscope,
    title: 'Neuromodulation',
    body: 'Evidence-graded protocol design across tDCS, TMS, rTMS, neurofeedback, and combined modalities — tailored to the individual patient.',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    body: 'DeepSynaps Academy: clinical training, supervised case work, and protocol literacy for the next generation of clinicians.',
  },
];

const principles = [
  {
    n: '01',
    title: 'Patient-first',
    body: 'Every protocol, every recommendation, every feature is judged against one question: does this help the patient?',
  },
  {
    n: '02',
    title: 'Evidence-graded',
    body: 'Recommendations are anchored in published evidence and explicitly graded — never inflated, never disguised.',
  },
  {
    n: '03',
    title: 'Clinician-led',
    body: 'AI tools support clinicians. They do not diagnose, prescribe, or replace clinical judgment — and they tell the truth about their limits.',
  },
  {
    n: '04',
    title: 'Transparent',
    body: 'When the system is uncertain, it says so. When data is degraded, it shows it. Demo features are labeled. Provenance is honest.',
  },
];

export default function About() {
  return (
    <div className="pt-32 md:pt-40 pb-20">
      {/* Hero */}
      <section className="relative px-6 md:px-8 lg:px-12">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
            <ScrollReveal>
              <span className="section-label">About</span>
              <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-balance mb-6 text-ds-text">
                Clinical intelligence,{' '}
                <span className="gradient-text">built by clinicians.</span>
              </h1>
              <p className="text-lg text-ds-text-secondary leading-relaxed max-w-[640px] mb-8">
                {CONTACT.org} is an interdisciplinary AI and neuroscience
                organization led by {CONTACT.founder}. We partner with clinics
                and researchers to develop AI protocols, design neuromodulation
                interventions, and review brain-map data — grounded in evidence,
                built around real patients.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/consultations" className="btn-primary">
                  Book a consultation
                  <ArrowRight size={16} className="ml-2" />
                </Link>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="btn-ghost"
                >
                  <Mail size={16} className="mr-2" />
                  {CONTACT.email}
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              {/* Founder card */}
              <div className="glass-card w-full lg:w-[340px] text-center">
                <div className="w-28 h-28 mx-auto mb-5 rounded-full bg-gradient-to-br from-ds-amber/30 via-ds-violet/30 to-ds-cyan/30 border border-white/10 flex items-center justify-center">
                  <span className="font-display text-3xl font-semibold text-ds-text">
                    AY
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-ds-text">
                  {CONTACT.founder}
                </h3>
                <p className="text-[13px] text-ds-text-secondary mb-4">
                  Founder & Clinical Director
                </p>
                <p className="text-[12px] uppercase tracking-[0.12em] text-ds-amber/80">
                  {CONTACT.basedIn}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission narrative */}
      <section className="px-6 md:px-8 lg:px-12 mt-28 md:mt-36">
        <div className="max-w-[820px] mx-auto">
          <ScrollReveal>
            <span className="section-label">Our mission</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ds-text mb-8 leading-tight">
              Bridging neuroscience, clinical practice, and applied AI.
            </h2>
            <div className="space-y-5 text-[16px] leading-[1.75] text-ds-text-secondary">
              <p>
                {CONTACT.org} began with a clinical observation: the gap
                between what neuroscience knows and what the average clinic can
                deliver is enormous — and most of it is a tooling problem, not a
                knowledge problem.
              </p>
              <p>
                Clinics that want to offer evidence-based neuromodulation,
                QEEG-guided care, or AI-assisted decision support often face a
                choice between expensive black-box platforms, fragmented
                research scripts, or doing everything by hand. We're building a
                different option.
              </p>
              <p>
                {CONTACT.org} OS is the clinical platform, {CONTACT.org} Lab is
                the research arm, and {CONTACT.org} Academy is the training
                ecosystem. Together they form one stack — designed so a single
                clinician, a small clinic, or a large institution can practice
                at the frontier of clinical intelligence without losing the
                judgment that makes it medicine.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Expertise */}
      <section className="px-6 md:px-8 lg:px-12 mt-28 md:mt-36">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="section-label">Expertise</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-ds-text mb-4">
                What we work on
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expertise.map((e, i) => (
              <ScrollReveal key={e.title} delay={i * 0.08}>
                <div className="glass-card h-full">
                  <div className="w-11 h-11 rounded-xl bg-ds-amber/10 border border-ds-amber/25 flex items-center justify-center mb-5 text-ds-amber">
                    <e.icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-ds-text mb-2">
                    {e.title}
                  </h3>
                  <p className="text-[14px] text-ds-text-secondary leading-relaxed">
                    {e.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="px-6 md:px-8 lg:px-12 mt-28 md:mt-36">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="section-label">Principles</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-ds-text mb-4">
                How we work
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {principles.map((p, i) => (
              <ScrollReveal key={p.n} delay={i * 0.06}>
                <div className="pillar-block flex gap-5">
                  <span className="font-display text-2xl font-semibold text-ds-amber/70 leading-none pt-1">
                    {p.n}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ds-text mb-2">
                      {p.title}
                    </h3>
                    <p className="text-[14px] text-ds-text-secondary leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-8 lg:px-12 mt-28 md:mt-36">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal>
            <div className="glass-card text-center py-14 md:py-16">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-ds-amber/10 border border-ds-amber/25 flex items-center justify-center text-ds-amber">
                <Sparkles size={22} />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-ds-text mb-4 text-balance">
                Have a case, a clinic, or a question?
              </h2>
              <p className="text-ds-text-secondary max-w-xl mx-auto mb-8 leading-relaxed">
                Whether you need a one-off protocol review, ongoing AI
                consultation, or full clinic integration — we'd like to hear
                about it.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/consultations" className="btn-primary">
                  Request a consultation
                  <ArrowRight size={16} className="ml-2" />
                </Link>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="btn-ghost"
                >
                  Email us
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
