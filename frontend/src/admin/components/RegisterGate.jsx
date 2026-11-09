import { useEffect, useState } from "react";
import { ArrowRight, Check, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthFrame from "./AuthFrame.jsx";
export default function RegisterGate() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { document.title = "Admin registration | Smart Attendance"; }, []);
  function submit(event) {
    event.preventDefault();
    if (!name.trim()) { setError("Enter your name to continue."); return; }
    if (email.trim().toLowerCase() !== "admin@gmail.com") { setError("Registration is restricted to the provisioned admin@gmail.com account."); return; }
    if (password !== "admin1234") { setError("Use the provisioned administrator password for this preview."); return; }
    if (confirmPassword !== password) { setError("The passwords do not match."); return; }
    sessionStorage.setItem("campus-admin-name", name.trim());
    sessionStorage.setItem("campus-admin-demo", "true");
    navigate("/admin", { replace: true });
  }
  return <AuthFrame mode="register">
    <div className="auth-copy">
      <span className="auth-eyebrow"><ShieldCheck size={14} /> ADMINISTRATOR SETUP</span>
      <h1>Create your account</h1>
      <p>Register the provisioned administrator account to access your campus workspace.</p>
    </div>
    <form className="auth-form" onSubmit={submit} noValidate>
      <label className="auth-field"><span>Full name</span><span className="auth-input-wrap"><Users size={16} /><input autoComplete="name" placeholder="Your name" value={name} onChange={(event) => { setName(event.target.value); setError(""); }} required /></span></label>
      <label className="auth-field"><span>Admin email</span><span className="auth-input-wrap"><Mail size={16} /><input type="email" autoComplete="username" placeholder="admin@gmail.com" value={email} onChange={(event) => { setEmail(event.target.value); setError(""); }} required /></span></label>
      <label className="auth-field"><span>Password</span><span className="auth-input-wrap"><LockKeyhole size={16} /><input type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="Enter admin password" value={password} onChange={(event) => { setPassword(event.target.value); setError(""); }} required /><button className="auth-visibility" type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></span></label>
      <label className="auth-field"><span>Confirm password</span><span className="auth-input-wrap"><Check size={16} /><input type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="Enter password again" value={confirmPassword} onChange={(event) => { setConfirmPassword(event.target.value); setError(""); }} required /></span></label>
      {error && <p className="auth-error" role="alert">{error}</p>}
      <button className="button button-primary auth-submit" type="submit">Register administrator <ArrowRight size={16} /></button>
    </form>
    <p className="auth-switch">Already registered? <Link to="/admin/login">Sign in <ArrowRight size={13} /></Link></p>
    <div className="auth-demo-note"><strong>Preview account is preconfigured</strong><span>Registration is limited to admin@gmail.com for this local demo.</span></div>
  </AuthFrame>;
}
