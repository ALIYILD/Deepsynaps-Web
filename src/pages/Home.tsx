import { HeroSection } from '@/sections/HeroSection';
import { MissionSection } from '@/sections/MissionSection';
import { EcosystemSection } from '@/sections/EcosystemSection';
import { StrategicPillarsSection } from '@/sections/StrategicPillarsSection';
import { OSPreviewSection } from '@/sections/OSPreviewSection';
import { LabPreviewSection } from '@/sections/LabPreviewSection';
import { AcademyPreviewSection } from '@/sections/AcademyPreviewSection';
import { VisionSection } from '@/sections/VisionSection';
import { ServicesSection } from '@/sections/ServicesSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <ServicesSection />
      <EcosystemSection />
      <StrategicPillarsSection />
      <OSPreviewSection />
      <LabPreviewSection />
      <AcademyPreviewSection />
      <VisionSection />
    </>
  );
}
