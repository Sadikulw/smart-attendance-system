import { ArrowDown, ArrowRight, Check, Wifi } from "lucide-react";
import { motion } from "framer-motion";

function HardwareIllustration() {
  return (
    <div className="hero-visual" aria-label="Illustration of an RFID attendance device and dashboard">
      <div className="visual-orbit orbit-one" />
      <div className="visual-orbit orbit-two" />
      <div className="visual-glow" />
      <motion.div className="device-board" animate={{ y: [0, -8, 0], rotate: [-2, 0, -2] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}>
        <div className="board-holes"><i /><i /><i /><i /></div>
        <div className="esp-board">
          <div className="esp-antenna"><span /><span /><span /><span /><span /></div>
          <div className="esp-chip">ESP32</div>
          <div className="esp-pins"><span /><span /><span /><span /><span /><span /><span /><span /></div>
          <div className="esp-label">Wi-Fi · Bluetooth</div>
        </div>
        <div className="rfid-module">
          <div className="rfid-coil"><span /><span /><span /></div>
          <span className="rfid-label">RFID · RC522</span>
        </div>
        <div className="board-trace trace-a" /><div className="board-trace trace-b" />
      </motion.div>
      <motion.div className="rfid-card-art" animate={{ y: [0, 7, 0], rotate: [7, 5, 7] }} transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}>
        <div className="card-chip"><span /><span /><span /><span /></div>
        <Wifi size={16} className="card-wave" />
        <span className="card-art-label">CAMPUS<br />IDENTITY</span>
        <span className="card-art-dots">•••• 2048</span>
      </motion.div>
      <div className="scan-wave scan-wave-one" /><div className="scan-wave scan-wave-two" />
      <div className="float-stat stat-attendance">
        <span className="stat-icon"><Check size={16} /></span>
        <span><small>Attendance marked</small><strong>Just now</strong></span>
        <span className="stat-live" />
      </div>
      <div className="float-stat stat-rate">
        <span className="rate-ring"><span>94<small>%</small></span></span>
        <span><small>Today's attendance</small><strong>Looking good</strong></span>
      </div>
      <div className="dashboard-card">
        <div className="dash-top"><span className="dash-title"><i /> Campus overview</span><span className="dash-period">Today⌄</span></div>
        <div className="dash-main"><strong>1,248</strong><span>students present <b>↗ 12.8%</b></span></div>
        <div className="chart-bars" aria-hidden="true">{[38, 55, 45, 70, 53, 82, 64, 92, 68, 78, 60, 100, 74, 88, 63, 84].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div>
        <div className="chart-labels"><span>8 am</span><span>10 am</span><span>12 pm</span><span>2 pm</span></div>
      </div>
      <span className="visual-caption">FROM CARD TAP TO CAMPUS INSIGHT</span>
    </div>
  );
}

export default function Hero({ onExplore }) {
  return (
    <section className="hero-section" id="home">
      <div className="hero-grid-pattern" />
      <div className="container hero-layout">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> COLLEGE PROJECT · 2026</div>
          <h1>Attendance,<br /><span>Simplified.</span><br />Campus, Connected.</h1>
          <p className="hero-description">A smarter way to manage student attendance using RFID technology, ESP32 and a modern web platform.</p>
          <div className="hero-actions">
            <button className="button button-primary" type="button" onClick={onExplore}>Explore project <ArrowRight size={17} /></button>
            <a className="button button-quiet" href="#team"><span className="play-icon">↗</span> Meet our team</a>
          </div>
          <div className="hero-proof">
            <div className="proof-avatars" aria-hidden="true"><i>01</i><i>02</i><i>03</i><i>+</i></div>
            <span>Built by students, <strong>for smarter campuses.</strong></span>
          </div>
        </div>
        <div className="hero-art-wrap"><HardwareIllustration /></div>
      </div>
      <a href="#about" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
      <div className="hero-bottom-line" />
    </section>
  );
}
