import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar.jsx";
import Hero from "../../components/landing/Hero.jsx";
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
  const navigate = useNavigate();
  const openAdminLogin = () => navigate("/admin/login");

  useEffect(() => {
    const updateVisibility = () => setShowTop(window.scrollY > 560);
    window.addEventListener("scroll", updateVisibility, { passive: true });
    updateVisibility();
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <>
      <Navbar onExplore={openAdminLogin} />
      <main>
        <Hero onExplore={openAdminLogin} />
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
    </>
  );
}
