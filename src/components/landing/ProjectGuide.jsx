import { GraduationCap, UserRound } from "lucide-react";
import Reveal from "../common/Reveal.jsx";

const projectGuide = {
  name: "Soumen Mondal",
  designation: "Project Supervisor",
  department: "Computer Science & Technology",
  photo: "/college/soumen_sir.jpeg",
};

export default function ProjectGuide() {
  return (
    <section className="guide-section" id="guide">
      <div className="container">
        <Reveal className="guide-card">
          <div className="guide-decoration guide-decoration-one" />
          <div className="guide-decoration guide-decoration-two" />
          <div className="guide-left">
            <span className="eyebrow guide-eyebrow">WITH GRATITUDE</span>
            <h2>
              Good ideas grow
              <br />
              with <span>good guidance.</span>
            </h2>
            <p>
              Our sincere thanks to the mentor helping us turn a classroom idea
              into a thoughtful technology project.
            </p>
            <div className="guide-contact-hint">
              <GraduationCap size={16} /> Dumkal Polytechnic
            </div>
          </div>
          <div className="guide-profile">
            <div className="guide-photo-wrap">
              {projectGuide.photo ? (
                <img src={projectGuide.photo} alt={projectGuide.name} />
              ) : (
                <div className="guide-photo-placeholder">
                  <UserRound size={76} strokeWidth={1.1} />
                  <span>PHOTO</span>
                </div>
              )}
              <span className="guide-photo-badge">
                <GraduationCap size={17} />
              </span>
            </div>
            <div className="guide-details">
              <span className="guide-role">{projectGuide.designation}</span>
              <h3>{projectGuide.name}</h3>
              <p>{projectGuide.department}</p>
              {/* <a href="#contact" aria-label="Contact the project team">
                <ArrowUpRight size={16} />
              </a> */}
            </div>
          </div>
        
        </Reveal>
      </div>
    </section>
  );
}
