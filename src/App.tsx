import { NeuralNetworkCanvas } from '@/components/NeuralNetworkCanvas';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/sections/HeroSection';
import { MissionSection } from '@/sections/MissionSection';
import { EcosystemSection } from '@/sections/EcosystemSection';
import { StrategicPillarsSection } from '@/sections/StrategicPillarsSection';
import { OSPreviewSection } from '@/sections/OSPreviewSection';
import { LabPreviewSection } from '@/sections/LabPreviewSection';
import { AcademyPreviewSection } from '@/sections/AcademyPreviewSection';
import { VisionSection } from '@/sections/VisionSection';

function App() {
  return (
    <div className="min-h-screen bg-ds-bg">
      {/* Neural Network Background - fixed behind everything */}
      <NeuralNetworkCanvas />

      {/* Fixed Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-[1]">
        <HeroSection />
        <MissionSection />
        <EcosystemSection />
        <StrategicPillarsSection />
        <OSPreviewSection />
        <LabPreviewSection />
        <AcademyPreviewSection />
        <VisionSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
