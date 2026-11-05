import { ArrowRight, CreditCard, Database, Radio, Server } from "lucide-react";
import Reveal from "../common/Reveal.jsx";

const steps = [
  { number: "01", title: "Tap the card", description: "A student presents their registered RFID card at the reader.", icon: CreditCard },
  { number: "02", title: "Read the signal", description: "The RC522 reader passes the card ID to the ESP32.", icon: Radio },
  { number: "03", title: "Send securely", description: "The ESP32 sends attendance data to the web application.", icon: Server },
  { number: "04", title: "See the record", description: "Attendance is organized and displayed in a digital view.", icon: Database },
];

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <Reveal className="section-heading centered">
          <span className="eyebrow eyebrow-blue">THE PROJECT</span>
          <h2>Bringing smart technology<br />to <span>campus.</span></h2>
          <p>A simple tap. A smarter record. A connected campus experience—designed around the people who use it every day.</p>
        </Reveal>
        <div className="about-grid">
          <Reveal className="about-intro">
            <div className="about-label"><span className="mini-line" /> A BETTER WAY TO BE PRESENT</div>
            <h3>Less roll call.<br /><span>More meaningful time.</span></h3>
            <p>Our project explores how accessible IoT hardware and a thoughtful web experience can make everyday attendance easier to capture and clearer to understand.</p>
            <a href="#how-it-works" className="text-link">See how it works <ArrowRight size={15} /></a>
            <div className="about-note"><span className="note-spark">✳</span><span><strong>Built as a learning project</strong><br />by C.S.T. students at Dumkal Polytechnic.</span></div>
          </Reveal>
          <div className="steps-grid">
            {steps.map(({ number, title, description, icon: Icon }, index) => (
              <Reveal className={`step-card step-card-${index + 1}`} key={number} delay={index * 0.07}>
                <div className="step-card-top"><span>{number}</span><Icon size={20} strokeWidth={1.8} /></div>
                <h4>{title}</h4><p>{description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
