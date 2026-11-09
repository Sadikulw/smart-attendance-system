import { GraduationCap } from "lucide-react";

export default function CollegeLogo({ light = false }) {
  return (
    <a className={`brand ${light ? "brand-light" : ""}`} href="#home" >
      <span className="brand-mark"><img src="\college\college_logo.png" alt="" /></span>
      <span className="brand-copy">
        <strong>Dumkal Polytechnic</strong>
        <small>College · C.S.T.</small>
      </span>
    </a>
  );
}
