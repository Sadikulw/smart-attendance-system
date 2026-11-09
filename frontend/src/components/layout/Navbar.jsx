import { useState } from "react";
import { Menu, X } from "lucide-react";
import CollegeLogo from "./CollegeLogo.jsx";

const links = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Features", "#features"],
  ["Technology", "#technology"],
  ["Our team", "#team"],
  ["Contact", "#contact"],
];

export default function Navbar({ onExplore }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <CollegeLogo />
        <div className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>{label}</a>
          ))}
          <button
            className="nav-cta"
            type="button"
            onClick={() => {
              closeMenu();
              onExplore();
            }}
          >
            Explore project <span aria-hidden="true">↗</span>
          </button>
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>
    </header>
  );
}
