import { ArrowLeft, Check, Fingerprint, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
export default function AuthFrame({ children, mode }) {
  return <main className={`auth-screen auth-${mode}`}>
    <div className="auth-backdrop" aria-hidden="true"><span /><span /><span /></div>
    <div className="auth-topline"><Link to="/" className="auth-back-link"><ArrowLeft size={15} /> Back to website</Link><span>DUMKAL POLYTECHNIC</span></div>
    <div className="auth-content">
      <section className="auth-card">
        <Link to="/" className="brand-lockup auth-brand"><span className="brand-icon"><img src="/college/college_logo.png" alt="" /></span>
          <span className="brand-name"><strong>SMART ATTENDANCE</strong><small>Campus administration</small></span>
        </Link>
        {children}
        <div className="auth-footnote"><LockKeyhole size={12} /> Secure campus administrator portal</div>
      </section>
      <aside className="auth-aside">
        <span className="auth-aside-icon"><Fingerprint size={24} /></span>
        <span className="auth-aside-kicker">SMART CAMPUS · ONE WORKSPACE</span>
        <h2>Attendance,<br /><em>made effortless.</em></h2>
        <p>Manage student records, monitor RFID readers and understand attendance patterns from one calm, connected workspace.</p>
        <div className="auth-aside-points">
          <span><Check size={14} /> Clear daily attendance insights</span>
          <span><Check size={14} /> Student and faculty management</span>
          <span><Check size={14} /> RFID device monitoring</span>
        </div>
        <small>SMART ATTENDANCE · DUMKAL POLYTECHNIC</small>
      </aside>
    </div>
    <span className="auth-mobile-footer">Smart Attendance · Dumkal Polytechnic</span>
  </main>;
}
