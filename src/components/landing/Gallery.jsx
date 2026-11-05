import {
  ArrowUpRight,
  CircuitBoard,
  Code2,
  Cpu,
  GitBranch,
  Radio,
} from "lucide-react";
import Reveal from "../common/Reveal.jsx";

const galleryItems = [
  {
    title: "Hardware prototype",
    label: "THE BUILD",
    icon: CircuitBoard,
    theme: "gallery-board",
    visual: "prototype",
  },
  {
    title: "ESP32 + RFID module",
    label: "COMPONENTS",
    icon: Cpu,
    theme: "gallery-chip",
    visual: "components",
  },
  {
    title: "Circuit connection",
    label: "THE WIRING",
    icon: GitBranch,
    theme: "gallery-circuit",
    visual: "circuit",
  },
  {
    title: "Web application",
    label: "THE INTERFACE",
    icon: Code2,
    theme: "gallery-web",
    visual: "dashboard",
  },
  {
    title: "Project development",
    label: "THE PROCESS",
    icon: Radio,
    theme: "gallery-process",
    visual: "process",
  },
];

function VisualPlaceholder({ item }) {
  return (
    <div className={`gallery-art ${item.theme}`}>
      {item.visual === "prototype" && (
        <div className="gallery-device">
          <div className="gallery-board-chip" />
          <div className="gallery-board-module">
            <Radio size={30} />
          </div>
          <div className="gallery-board-pin-row">
            {Array.from({ length: 10 }, (_, i) => (
              <i key={i} />
            ))}
          </div>
        </div>
      )}
      {item.visual === "components" && (
        <>
          <div className="gallery-esp">
            <Cpu size={38} />
            <b>ESP32</b>
            <i />
            <i />
            <i />
          </div>
          <div className="gallery-rc522">
            <div className="mini-rings">
              <i />
              <i />
              <i />
            </div>
            <b>RC522</b>
          </div>
        </>
      )}
      {item.visual === "circuit" && (
        <div className="circuit-layout">
          <img  src="\gallery\full connection.png" alt="" />

        </div>
      )}
      {item.visual === "dashboard" && (
        <div className="mini-dashboard">
          <div className="mini-dash-nav">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="mini-dash-content">
            <span>ATTENDANCE OVERVIEW</span>
            <b>1,248</b>
            <i>+12.8% this week</i>
            <div className="mini-bars">
              {[36, 68, 48, 80, 57, 91, 62].map((n, i) => (
                <i key={i} style={{ height: `${n}%` }} />
              ))}
            </div>
          </div>
        </div>
      )}
      {item.visual === "process" && (
        <div className="gallery-progress">
          <div className="progress-stem" />
          <span>
            <i>01</i>
            <b>Prototype</b>
          </span>
          <span>
            <i>02</i>
            <b>Connect</b>
          </span>
          <span>
            <i>03</i>
            <b>Build</b>
          </span>
          <span>
            <i>04</i>
            <b>Refine</b>
          </span>
        </div>
      )}

    </div>
  );
}

export default function Gallery() {
  return (
    <section className="section gallery-section" id="gallery">
      <div className="container">
        <Reveal className="section-heading">
          <span className="eyebrow eyebrow-blue">A LOOK BEHIND THE SCENES</span>
          <div className="heading-row">
            <h2>
              Ideas taking
              <br />
              <span>shape.</span>
            </h2>
            <p>
              A visual preview of the hardware, connections and interface behind
              our Smart Attendance System.
            </p>
          </div>
        </Reveal>
        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <Reveal
              className={`gallery-card gallery-card-${index + 1}`}
              key={item.title}
              delay={index * 0.05}
            >
              <VisualPlaceholder item={item} />
              <div className="gallery-card-info">
                <div>
                  <span className="gallery-label">{item.label}</span>
                  <h3>{item.title}</h3>
                </div>
                <span className="gallery-link">
                  <ArrowUpRight size={17} />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="gallery-note">
          Illustrated placeholders are ready to be replaced with your actual
          project photos.
        </p>
      </div>
    </section>
  );
}
