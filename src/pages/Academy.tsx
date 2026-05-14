import { Link } from 'react-router';
import {
  ArrowRight,
  GraduationCap,
  Presentation,
  Wrench,
  Monitor,
  MessagesSquare,
  Brain,
  Waves,
  Cpu,
  Atom,
  HeartPulse,
  Network,
  Stethoscope,
  Hospital,
  Sparkles,
  CalendarCheck,
  Mail,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { CONTACT } from '@/config/contact';

const formats = [
  {
    icon: Presentation,
    title: 'Seminars',
    blurb:
      'Live online and in-person sessions on neuromodulation, clinical AI, and applied neuroscience. Q&A, case discussion, and clinician-led teaching.',
    badge: 'Live · monthly',
  },
  {
    icon: Wrench,
    title: 'Workshops',
    blurb:
      'Hands-on training in QEEG analysis, protocol design, TMS / tDCS / neurofeedback, and clinical AI implementation. Small groups, real datasets.',
    badge: 'Intensive · cohort-based',
  },
  {
    icon: Monitor,
    title: 'Online Courses',
    blurb:
      'Self-paced curricula with video, reading, exercises, and case work. Foundations to advanced — for clinicians, researchers, and engineers.',
    badge: 'Self-paced · lifetime access',
  },
  {
    icon: MessagesSquare,
    title: 'Consultations',
    blurb:
      'One-to-one mentoring and team consultations. Clinical case review, AI strategy for clinics and hospitals, and research direction.',
    badge: 'Booked · per case',
  },
];

const tracks = [
  {
    icon: HeartPulse,
    title: 'Neuromodulation',
    body: 'tDCS, TMS, rTMS, neurofeedback, vagal stimulation, peripheral modulation. Protocol design, dosing, contraindications, outcomes tracking.',
    color: 'amber',
  },
  {
    icon: Brain,
    title: 'Clinical Neuroscience',
    body: 'Functional neuroanatomy, network neuroscience, EEG/QEEG interpretation, biomarkers, and translation from lab to clinic.',
    color: 'violet',
  },
  {
    icon: Waves,
    title: 'QEEG & Brain Mapping',
    body: 'Raw data review, spectral analysis, connectivity, source localization, and brain-map–guided clinical decisions.',
    color: 'cyan',
  },
  {
    icon: Stethoscope,
    title: 'AI in Clinical Practice',
    body: 'Where AI helps and where it hurts. Decision support, documentation, triage, safety governance, and clinician oversight.',
    color: 'amber',
  },
  {
    icon: Hospital,
    title: 'AI for Clinics & Hospitals',
    body: 'Deploying AI inside real care settings — workflow design, EHR integration, staff training, audit, and compliance.',
    color: 'violet',
  },
  {
    icon: Network,
    title: 'Intelligent Systems',
    body: 'Foundations and applied work on agents, retrieval, evaluation, and reliable AI pipelines for healthcare and research.',
    color: 'cyan',
  },
  {
    icon: Cpu,
    title: 'Neuromorphic Computing',
    body: 'Spiking neural networks, event-driven hardware, brain-inspired architectures, and where they outperform classical AI.',
    color: 'amber',
  },
  {
    icon: Atom,
    title: 'Quantum & Frontier Compute',
    body: 'Quantum computing primers, quantum-inspired methods, and how frontier compute paradigms intersect with neuroscience and AI.',
    color: 'violet',
  },
];

const audience = [
  {
    title: 'Clinicians',
    body: 'Doctors, psychologists, neurotechnicians, and allied professionals integrating neuromodulation and AI into practice.',
  },
  {
    title: 'Clinics & Hospitals',
    body: 'Teams adopting AI-supported workflows, QEEG-guided care, or full neuromodulation programs.',
  },
  {
    title: 'Researchers',
    body: 'Lab teams working on biomarkers, brain-inspired computing, and translational neuroscience.',
  },
  {
    title: 'Engineers & Builders',
    body: 'Engineers building clinical AI, neurotech, intelligent systems, or quantum/neuromorphic platforms.',
  },
];

const colorMap: Record<string, string> = {
  amber: 'bg-ds-amber/10 border-ds-amber/25 text-ds-amber',
  violet: 'bg-ds-violet/10 border-ds-violet/25 text-ds-violet',
  cyan: 'bg-ds-cyan/10 border-ds-cyan/25 text-ds-cyan',
};

export default function Academy() {
  return (
    <div className="pt-32 md:pt-40 pb-20">
      {/* Hero */}
      <section className="relative px-6 md:px-8 lg:px-12">
        <div className="max-w-[1100px] mx-auto text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-[0.14em] text-ds-cyan bg-ds-cyan/8 border border-ds-cyan/20 mb-6">
              <GraduationCap size={13} />
              DeepSynaps Academy
            </div>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[1.04] tracking-tight text-balance mb-6 text-ds-text">
              Learn the science.{' '}
              <span className="gradient-text">Build the future.</span>
            </h1>
            <p className="text-lg text-ds-text-secondary max-w-2xl mx-auto leading-relaxed">
              Seminars, workshops, online courses, and consultations at the
              intersection of neuromodulation, neuroscience, AI, and frontier
              compute — for clinicians, clinics, researchers, and the engineers
              building what comes next.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 justify-center">
              <Link to="/consultations" className="btn-primary">
                Get notified · Book intro call
                <ArrowRight size={16} className="ml-2" />
              </Link>
              <a href="#tracks" className="btn-ghost">
                Browse tracks
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Formats */}
      <section className="px-6 md:px-8 lg:px-12 mt-24 md:mt-32">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="section-label">Formats</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-ds-text mb-4">
                Four ways to learn with us
              </h2>
              <p className="text-ds-text-secondary max-w-xl mx-auto">
                Pick the format that fits your schedule and depth — from a live
                seminar to a full cohort workshop.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formats.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.08}>
                <div className="glass-card h-full">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-ds-cyan/10 border border-ds-cyan/25 flex items-center justify-center text-ds-cyan">
                      <f.icon size={22} />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.12em] text-ds-text-secondary/80 px-2.5 py-1 rounded-full border border-white/8">
                      {f.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-ds-text mb-2.5">
                    {f.title}
                  </h3>
                  <p className="text-[14px] text-ds-text-secondary leading-relaxed">
                    {f.blurb}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section
        id="tracks"
        className="px-6 md:px-8 lg:px-12 mt-28 md:mt-36 scroll-mt-24"
      >
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="section-label">Topic Tracks</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-ds-text mb-4">
                What we teach
              </h2>
              <p className="text-ds-text-secondary max-w-2xl mx-auto">
                Eight tracks spanning clinical neuroscience, applied AI, and
                the compute paradigms shaping the next decade.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {tracks.map((t, i) => (
              <ScrollReveal key={t.title} delay={i * 0.05}>
                <div className="glass-card h-full">
                  <div
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 ${colorMap[t.color]}`}
                  >
                    <t.icon size={20} />
                  </div>
                  <h3 className="text-[15px] font-semibold text-ds-text mb-2 leading-snug">
                    {t.title}
                  </h3>
                  <p className="text-[13px] text-ds-text-secondary leading-[1.65]">
                    {t.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="px-6 md:px-8 lg:px-12 mt-28 md:mt-36">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="section-label">Who it's for</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-ds-text mb-4">
                Built for the people doing the work
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {audience.map((a, i) => (
              <ScrollReveal key={a.title} delay={i * 0.06}>
                <div className="pillar-block">
                  <h3 className="text-base font-semibold text-ds-text mb-2">
                    {a.title}
                  </h3>
                  <p className="text-[14px] text-ds-text-secondary leading-relaxed">
                    {a.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming / status */}
      <section className="px-6 md:px-8 lg:px-12 mt-28 md:mt-36">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal>
            <div className="glass-card text-center py-12 md:py-14">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-ds-amber/10 border border-ds-amber/25 flex items-center justify-center text-ds-amber">
                <CalendarCheck size={22} />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-ds-text mb-3">
                The first cohort is opening soon
              </h2>
              <p className="text-ds-text-secondary max-w-xl mx-auto mb-7 leading-relaxed">
                Seminar calendar, workshop dates, and the first online courses
                are being scheduled now. Tell us what you're most interested in
                and we'll let you know first when seats open.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/consultations" className="btn-primary">
                  <Sparkles size={16} className="mr-2" />
                  Notify me & book intro
                </Link>
                <a href={`mailto:${CONTACT.email}`} className="btn-ghost">
                  <Mail size={16} className="mr-2" />
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
