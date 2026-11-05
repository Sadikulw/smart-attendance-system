import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import CollegeLogo from "./CollegeLogo.jsx";

const footerLinks = [
  { title: "Explore", links: [["About project", "#about"], ["Features", "#features"], ["How it works", "#how-it-works"]] },
  { title: "Discover", links: [["Technology", "#technology"], ["Our team", "#team"], ["Project gallery", "#gallery"]] },
];

export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-top container">
        <div className="footer-brand-column">
          <CollegeLogo light />
          <p>A student-built project exploring a smarter, more connected campus experience.</p>
          <span className="footer-department">DEPARTMENT OF<br /><strong>COMPUTER SCIENCE & TECHNOLOGY</strong></span>
        </div>
        {footerLinks.map((group) => (
          <div className="footer-link-column" key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map(([label, href]) => <a href={href} key={href}>{label}<ArrowUpRight size={13} /></a>)}
          </div>
        ))}
        <div className="footer-contact-column">
          <h3>Get in touch</h3>
          <a href="mailto:your-college-email@example.com"><Mail size={15} /> dumkalPolytechnic.com</a>
          <a href="#contact"><MapPin size={15} /> Dumkal Polytechnic</a>
          <a href="tel:+910000000000"><Phone size={15} /> +91 00000 00000</a>
        </div>
        <a href="#home" className="footer-back">Back to the top <ArrowRight size={15} /></a>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© 2026 Dumkal Polytechnic. Built with curiosity.</span>
          <span className="footer-project-type"><i /> COLLEGE GROUP PROJECT <b>·</b> 2026</span>
          <a href="#home">Smart Attendance System <ArrowUpRight size={13} /></a>
        </div>
      </div>
    </footer>
  );
}
