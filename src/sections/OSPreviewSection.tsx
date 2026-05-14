import {
  CheckCircle,
  FileText,
  Database,
  Map,
  Activity,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { ScrollReveal, StaggerContainer } from '@/components/ScrollReveal';

const features = [
  { icon: CheckCircle, text: 'Clinical workflow support' },
  { icon: FileText, text: 'Protocol drafting' },
  { icon: Database, text: 'Evidence organization' },
  { icon: Map, text: 'Brain mapping tools' },
  { icon: Activity, text: 'qEEG and neurodata infrastructure' },
  { icon: Layers, text: 'Digital twin concepts' },
  { icon: ShieldCheck, text: 'Audit-ready decision support' },
];

export function OSPreviewSection() {
  return (
    <section
      id="os-preview"
      className="relative z-[2] py-20 md:py-28 lg:py-32 px-6 md:px-12"
      style={{
        background: `radial-gradient(circle at 70% 30%, rgba(107,78,230,0.06) 0%, transparent 50%)`,
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <ScrollReveal>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-ds-violet mb-4">
            Platform
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-ds-text tracking-[-0.015em] mb-4">
            DeepSynaps OS
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-[clamp(1.0625rem,1.3vw,1.25rem)] font-normal text-ds-text-secondary max-w-[600px] mb-10">
            A clinical intelligence platform for evidence-aware neurotechnology
            workflows.
          </p>
        </ScrollReveal>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          staggerDelay={0.08}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.text} className="feature-item">
                <Icon size={20} className="text-ds-violet flex-shrink-0" />
                <span className="text-[13px] text-ds-text-secondary">
                  {feature.text}
                </span>
              </div>
            );
          })}
        </StaggerContainer>

        {/* Disclaimer */}
        <ScrollReveal delay={0.5} animation="fade-in">
          <div className="mt-12 disclaimer-box">
            <p className="text-[13px] text-ds-text-secondary leading-relaxed">
              DeepSynaps OS is designed for clinical decision support and
              workflow assistance only. It does not diagnose, prescribe, replace
              clinicians, or provide emergency triage.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
