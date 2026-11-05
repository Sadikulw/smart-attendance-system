import {
  Braces,
  Code2,
  Cpu,
  Database,
  Globe2,
  Layers3,
  Radio,
  Server,
  Terminal,
} from "lucide-react";
import Reveal from "../common/Reveal.jsx";

const technologies = [
  {
    name: "React.js",
    description: "User interface",
    icon: Layers3,
    tag: "FRONTEND",
    color: "react",
  },
  {
    name: "Node.js",
    description: "JavaScript runtime",
    icon: Terminal,
    tag: "RUNTIME",
    color: "node",
  },
  {
    name: "Express.js",
    description: "Web framework",
    icon: Server,
    tag: "BACKEND",
    color: "express",
  },
  {
    name: "MongoDB",
    description: "Document database",
    icon: Database,
    tag: "DATABASE",
    color: "mongo",
  },
  {
    name: "ESP32",
    description: "Wi-Fi microcontroller",
    icon: Cpu,
    tag: "HARDWARE",
    color: "esp",
  },
  {
    name: "RFID RC522",
    description: "Card reader module",
    icon: Radio,
    tag: "HARDWARE",
    color: "rfid",
  },
  {
    name: "HTML",
    description: "Page structure",
    icon: Code2,
    tag: "WEB",
    color: "html",
  },
  {
    name: "CSS",
    description: "Visual styling",
    icon: Braces,
    tag: "WEB",
    color: "css",
  },
  {
    name: "JavaScript",
    description: "Application logic",
    icon: Globe2,
    tag: "WEB",
    color: "js",
  },
];

export default function Technology() {
  return (
    <section className="section technology-section" id="technology">
      <div className="container">
        <Reveal className="section-heading centered">
          <span className="eyebrow eyebrow-blue">THE TOOLKIT</span>
          <h2>
            Hardware meets
            <br />
            <span>the modern web.</span>
          </h2>
          <p>
            A connected stack that brings a physical card scan into a clear,
            digital experience.
          </p>
        </Reveal>
        <div className="technology-grid">
          {technologies.map(
            ({ name, description, icon: Icon, tag, color }, index) => (
              <Reveal
                className="tech-card"
                key={name}
                delay={(index % 3) * 0.05}
              >
                <div className={`tech-icon tech-${color}`}>
                  <Icon size={24} strokeWidth={1.75} />
                </div>
                <div className="tech-name">{name}</div>
                <div className="tech-description">{description}</div>
                <span className="tech-tag">{tag}</span>
              </Reveal>
            ),
          )}
        </div>
        <Reveal className="stack-note">
          <span className="stack-note-icon">
            <span />
            <span />
            <span />
          </span>
          <span>
            <strong>One connected system</strong>
            <br />
            From the classroom door to a useful digital record.
          </span>
          <div className="stack-flow">
            <i>HARDWARE</i>
            <b>→</b>
            <i>WEB APP</i>
            <b>→</b>
            <i>INSIGHT</i>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
