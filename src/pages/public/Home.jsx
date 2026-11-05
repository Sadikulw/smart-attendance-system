import { useCallback, useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Navbar from "../../components/layout/Navbar.jsx";
import Hero from "../../components/landing/Hero.jsx";
import ComingSoonModal from "../../components/common/ComingSoonModal.jsx";
import About from "../../components/landing/AboutCollege.jsx";
import Features from "../../components/landing/Features.jsx";
import Technology from "../../components/landing/Technology.jsx";
import HowItWorks from "../../components/landing/HowItWorks.jsx";
import Team from "../../components/landing/ProjectTeam.jsx";
import Gallery from "../../components/landing/Gallery.jsx";
import ProjectGuide from "../../components/landing/ProjectGuide.jsx";
import Footer from "../../components/layout/Footer.jsx";

export default function App() {
  const [showTop, setShowTop] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const openComingSoon = useCallback(() => setShowComingSoon(true), []);
  const closeComingSoon = useCallback(() => setShowComingSoon(false), []);

  useEffect(() => {
    const updateVisibility = () => setShowTop(window.scrollY > 560);
    window.addEventListener("scroll", updateVisibility, { passive: true });
    updateVisibility();
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <>
      <Navbar onExplore={openComingSoon} />
      <main>
        <Hero onExplore={openComingSoon} />
        <About />
        <Features />
        <Technology />
        <HowItWorks />
        <Team />
        <Gallery />
        <ProjectGuide />
      </main>
      <Footer />
      <button
        className={`back-to-top ${showTop ? "is-visible" : ""}`}
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp size={19} />
      </button>
      {showComingSoon && <ComingSoonModal onClose={closeComingSoon} />}
    </>
  );
}
