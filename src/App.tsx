import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactWidget } from "@/components/ContactWidget";
import Consultations from "@/pages/Consultations";
import Academy from "@/pages/Academy";
import Privacy from "@/pages/Privacy";
import {
  AILabHome,
  ResearchPage,
  LearningPage,
  EcosystemPage,
  NervePage,
  LabAbout,
  ProductPage,
  NotFound,
} from "@/pages/AILab";
import "./lab.css";

function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const labels: Record<string, string> = {
      "/": "Adaptive Intelligence",
      "/research": "Research",
      "/nerve": "NERVE",
      "/ecosystem": "Ecosystem",
      "/about": "The Lab",
      "/consultations": "Clinical Consultations",
      "/academy": "Academy",
      "/privacy": "Privacy",
      "/research/adaptive-learning": "Adaptive Learning",
    };
    document.title = `${labels[pathname] || "Our Ecosystem"} | DeepSynaps AI Lab`;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (hash) {
      const oldAnchors: Record<string, string> = {
        "os-preview": "ecosystem",
        "lab-preview": "research",
        "academy-preview": "ecosystem",
        services: "collaborate",
      };
      const id = hash.slice(1);
      const target = document.getElementById(oldAnchors[id] || id);
      if (target) {
        target.scrollIntoView({
          behavior: reducedMotion ? "instant" : "smooth",
          block: "start",
        });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}
function App() {
  return (
    <div className="min-h-screen bg-ds-bg relative">
      <RouteEffects />
      <Header />
      <main id="main-content" className="relative z-[1]" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<AILabHome />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route
            path="/research/adaptive-learning"
            element={<LearningPage />}
          />
          <Route path="/nerve" element={<NervePage />} />
          <Route path="/ecosystem" element={<EcosystemPage />} />
          <Route path="/ecosystem/:slug" element={<ProductPage />} />
          <Route
            path="/lab/chip-design"
            element={<Navigate to="/ecosystem/chip-design" replace />}
          />
          <Route path="/about" element={<LabAbout />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/consultations" element={<Consultations />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ContactWidget />
    </div>
  );
}
export default App;
