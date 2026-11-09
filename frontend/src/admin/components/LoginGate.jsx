import { useEffect, useState } from "react";
import { ArrowRight, Check, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthFrame from "./AuthFrame.jsx";
export default function LoginGate() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { document.title = "Admin access | Smart Attendance"; }, []);
  function submit(event) {
    event.preventDefault();
    if (email.trim().toLowerCase() !== "admin@gmail.com" || password !== "admin1234") {
      setError("The email or password you entered is incorrect.");
      return;
    }
    sessionStorage.setItem("campus-admin-name", "System Admin");
    sessionStorage.setItem("campus-admin-demo", "true");
    navigate("/admin", { replace: true });
  }
  return <AuthFrame mode="login">
    <div className="auth-copy">
      <span className="auth-eyebrow"><ShieldCheck size={14} /> ADMINISTRATOR ACCESS</span>
      <h1>Welcome back</h1>
      <p>Sign in to manage campus attendance, student records and RFID devices.</p>
    </div>
    <form className="auth-form" onSubmit={submit} noValidate>
      <label className="auth-field"><span>Email address</span><span className="auth-input-wrap"><Mail size={16} /><input type="email" autoComplete="username" placeholder="you@college.edu" value={email} onChange={(event) => { setEmail(event.target.value); setError(""); }} required /></span></label>
      <label className="auth-field"><span>Password</span><span className="auth-input-wrap"><LockKeyhole size={16} /><input type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(event) => { setPassword(event.target.value); setError(""); }} required /><button className="auth-visibility" type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></span></label>
      {error && <p className="auth-error" role="alert">{error}</p>}
      <button className="button button-primary auth-submit" type="submit">Sign in <ArrowRight size={16} /></button>
    </form>
    <p className="auth-switch">New administrator? <Link to="/admin/register">Register here <ArrowRight size={13} /></Link></p>
    <div className="auth-demo-note"><strong>Demo administrator access</strong><span>Use the provisioned admin account for this preview.</span></div>
  </AuthFrame>;
}
