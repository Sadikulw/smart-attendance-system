import { useEffect, useRef } from "react";
import { ArrowUpRight, Sparkles, X } from "lucide-react";

export default function ComingSoonModal({ onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="coming-soon-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="coming-soon-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="coming-soon-title"
        aria-describedby="coming-soon-description"
      >
        <button
          ref={closeButtonRef}
          className="coming-soon-close"
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <X size={18} />
        </button>
        <div className="coming-soon-art" aria-hidden="true">
          <span className="coming-soon-orbit coming-soon-orbit-one" />
          <span className="coming-soon-orbit coming-soon-orbit-two" />
          <span className="coming-soon-sparkle"><Sparkles size={27} /></span>
        </div>
        <span className="coming-soon-eyebrow"><i /> SOMETHING GOOD IS IN THE WORKS</span>
        <h2 id="coming-soon-title">Coming soon<span>.</span></h2>
        <p id="coming-soon-description">
          We’re putting the finishing touches on this project. Check back soon to see what we’ve been building.
        </p>
        <button className="coming-soon-action" type="button" onClick={onClose}>
          Sounds good <ArrowUpRight size={16} />
        </button>
        <span className="coming-soon-footnote">MADE WITH CARE BY OUR STUDENT TEAM</span>
      </section>
    </div>
  );
}
