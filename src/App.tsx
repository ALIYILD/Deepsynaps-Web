import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import { NeuralNetworkCanvas } from '@/components/NeuralNetworkCanvas';
import { AuroraBackground } from '@/components/AuroraBackground';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';
import Home from '@/pages/Home';
import Consultations from '@/pages/Consultations';
import About from '@/pages/About';
import Academy from '@/pages/Academy';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <div className="min-h-screen bg-ds-bg relative">
      <AuroraBackground />
      <NeuralNetworkCanvas />

      <ScrollToTop />
      <Header />

      <main className="relative z-[1]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/consultations" element={<Consultations />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
      <WhatsAppWidget />
    </div>
  );
}

export default App;
