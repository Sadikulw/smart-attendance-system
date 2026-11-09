import {
  ArrowRight,
  CreditCard,
  Database,
  LayoutDashboard,
  Radio,
  Server,
  Monitor,
} from "lucide-react";
import Reveal from "../common/Reveal.jsx";

const process = [
  {
    title: "RFID card",
    caption: "A quick tap",
    icon: CreditCard,
    number: "01",
  },
  { title: "ESP32", caption: "Reads the card", icon: Radio, number: "02" },
  { title: "Server", caption: "Moves the data", icon: Server, number: "03" },
  {
    title: "MongoDB",
    caption: "Stores the record",
    icon: Database,
    number: "04",
  },
  {
    title: "Web dashboard",
    caption: "Shows the insight",
    icon: LayoutDashboard,
    number: "05",
  },
  { title: "Display", caption: "Shows the Name ", icon: Monitor, number: "06" },
];

export default function HowItWorks() {
  return (
    <section className="section process-section" id="how-it-works">
      <div className="container">
        <Reveal className="section-heading">
          <span className="eyebrow eyebrow-blue">FROM TAP TO INSIGHT</span>
          <div className="heading-row">
            <h2>
              Five steps.
              <br />
              <span>One smooth flow.</span>
            </h2>
            <p>
              Every part of the system has a role. Together, they take a card
              scan from the classroom to the dashboard.
            </p>
          </div>
        </Reveal>
        <Reveal className="process-track">
          <div className="process-line" />
          {process.map(({ title, caption, icon: Icon, number }, index) => (
            <div className="process-step" key={title}>
              <div className={`process-icon process-icon-${index + 1}`}>
                <Icon size={23} strokeWidth={1.7} />
                <span>{number}</span>
              </div>
              <h3>{title}</h3>
              <p>{caption}</p>
              {index < process.length - 1 && (
                <ArrowRight className="process-arrow" size={17} />
              )}
            </div>
          ))}
        </Reveal>
        <Reveal className="process-footnote">
          <span className="process-footnote-dot" /> A concept built with
          connected hardware and web technologies{" "}
          <span className="process-footnote-divider">·</span>{" "}
          <a href="#gallery">
            See project visuals <ArrowRight size={13} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
