









import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // shared CSS

// const BASE = "http://localhost:8080";
const BASE = "https://dribbblebackend-production.up.railway.app";
// const GOOGLE_CLIENT_ID = "755464593792-m0hrlfhkerqn7t3op8va42uu49p4u3d0.apps.googleusercontent.com"; // ← change this
const GOOGLE_CLIENT_ID = "571740583000-6paalr1so03bisjk97bh4i9agcj1oiph.apps.googleusercontent.com"; // ← change this

const DribbbleBall = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 64 64" fill="none" color="#d86ad4" role="img" aria-hidden="true" class="icon auth-screen-header__icon">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 31.9942C0 14.3331 14.3227 0 32 0C49.6786 0 64 14.346 64 32.0058C64 49.6669 49.6773 64 32 64H29.4043V63.8845C12.9519 62.5623 0 48.7824 0 31.9942ZM32.7959 58.798C47.2364 58.377 58.8087 46.5357 58.8087 32.0058C58.8087 17.2085 46.8075 5.19039 32 5.19039C17.1912 5.19039 5.19133 17.1983 5.19133 31.9942C5.19133 46.7895 17.2021 58.798 32 58.798H32.7959Z" fill="currentColor"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.0444 8.5504C18.6885 8.4384 18.3196 8.3223 17.9352 8.19192L19.6032 3.27673C19.7564 3.32872 20.0323 3.41669 20.3544 3.5194C20.9331 3.70393 21.6609 3.936 22.0944 4.09232L22.1177 4.10071L22.1408 4.10954C22.2594 4.15489 22.3865 4.20297 22.5198 4.25338C23.1913 4.50734 24.0198 4.82067 24.7117 5.14427L24.7425 5.15864L24.8796 5.22718C25.2052 5.379 25.6942 5.61206 26.1015 5.80617C26.3301 5.91515 26.533 6.01185 26.6668 6.07501L26.7287 6.10425L26.789 6.13671C26.803 6.14427 26.8195 6.15307 26.8381 6.16302C26.9784 6.23816 27.2401 6.37818 27.4912 6.53161L27.5601 6.5737L27.5796 6.58735C27.6079 6.60383 27.6467 6.62585 27.6947 6.65254C27.7366 6.67588 27.7769 6.69807 27.8172 6.72024C27.8251 6.72459 27.833 6.72895 27.8409 6.73331C27.8631 6.74553 27.8884 6.75944 27.911 6.77208L27.9126 6.77297C27.9241 6.77938 27.9535 6.79575 27.9874 6.81555C28.018 6.83317 28.0652 6.86007 28.1242 6.89377C28.3047 6.99678 28.5964 7.16324 28.8672 7.32183C29.1462 7.4852 29.572 7.73684 29.8871 7.95772C30.2247 8.16503 30.5958 8.42209 30.8429 8.59323C30.8874 8.62408 30.9279 8.65213 30.9634 8.6766C31.1534 8.79229 31.3394 8.92346 31.4688 9.01621C31.654 9.14891 31.8556 9.29924 32.0394 9.43745C32.1244 9.5013 32.202 9.55988 32.2753 9.61525C32.3729 9.68889 32.4629 9.75684 32.5526 9.82395C32.6266 9.87937 32.6883 9.92504 32.7381 9.96122C32.7627 9.9791 32.7819 9.99283 32.7963 10.003C32.8086 10.0117 32.8144 10.0156 32.8147 10.0158L32.8823 10.0609L32.9475 10.1105C35.8123 12.2928 38.3635 14.8567 40.541 17.7143L40.5431 17.7169L40.5451 17.7196C42.9523 20.8955 44.8529 24.421 46.171 28.1728C50.0981 39.1418 48.9432 51.8142 42.7709 61.8175L38.3527 59.0924C43.6719 50.4716 44.696 39.4477 41.281 29.9155L41.2782 29.9077L41.2755 29.8999C40.1378 26.6593 38.4949 23.6089 36.4095 20.8569C34.5227 18.3816 32.3193 16.1648 29.8537 14.2791C29.7172 14.1845 29.566 14.0722 29.4424 13.9797C29.3488 13.9097 29.2388 13.8267 29.1303 13.7448C29.0574 13.6898 28.9853 13.6354 28.9193 13.5858C28.7411 13.4518 28.5792 13.3313 28.4451 13.2353C28.3256 13.1497 28.2759 13.1181 28.2762 13.1176C28.2763 13.1176 28.2765 13.1176 28.2769 13.1178L28.1996 13.0744L28.1095 13.0133C27.9769 12.9233 27.8588 12.8416 27.7506 12.7667C27.513 12.6023 27.3227 12.4706 27.1296 12.356L27.0032 12.2809L26.886 12.1921C26.8933 12.1976 26.8928 12.1973 26.8825 12.1904C26.8632 12.1776 26.8098 12.1421 26.7098 12.08C26.578 11.9983 26.4164 11.9018 26.2437 11.8006C25.9987 11.6572 25.7756 11.5299 25.5991 11.4292C25.5168 11.3822 25.4446 11.341 25.3851 11.3067L25.3797 11.3036C25.3706 11.2986 25.3572 11.2911 25.337 11.28C25.3308 11.2766 25.324 11.2729 25.3168 11.2689C25.2767 11.2469 25.2232 11.2174 25.1687 11.1871C25.1049 11.1516 25.0275 11.108 24.9522 11.0639C24.911 11.0398 24.8342 10.9946 24.7482 10.9388C24.6425 10.8758 24.5291 10.8149 24.3941 10.7424C24.3921 10.7413 24.3901 10.7402 24.3881 10.7391C24.2266 10.6627 24.0256 10.5669 23.8123 10.4651C23.4109 10.2737 22.9655 10.0614 22.6564 9.91764L22.6231 9.90216L22.4834 9.83233C21.9933 9.60511 21.4065 9.38267 20.7493 9.13349C20.6064 9.07932 20.4602 9.02389 20.3109 8.96687C19.9058 8.82147 19.4851 8.68909 19.0444 8.5504ZM25.3856 11.3069C25.3884 11.3085 25.3897 11.3092 25.3897 11.3092ZM25.3856 11.3069C25.3884 11.3085 25.3897 11.3092 25.3897 11.3092Z" fill="currentColor"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M29.9753 20.9031C37.8095 19.4886 45.039 15.0944 49.9836 8.8396L54.0564 12.0581C48.3423 19.2864 40.0009 24.3674 30.8972 26.011L30.8966 26.0111C26.3636 26.8284 21.7063 26.856 17.1601 26.0225C12.6263 25.2144 8.25142 23.5868 4.29462 21.2106L6.96759 16.7612C10.3772 18.8087 14.1561 20.2156 18.0773 20.9137L18.0841 20.9149L18.0909 20.9162C22 21.6336 26.0293 21.6145 29.9747 20.9033" fill="currentColor"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.1061 58.3111C20.5381 35.6959 43.5855 23.2062 62.4346 28.3436L61.0692 33.3513C45.0688 28.9903 25.0407 39.714 21.2006 59.3091L16.1061 58.3111Z" fill="currentColor"></path>
</svg>
);

const GoogleIcon = () => (
  <svg className="google-btn-icon" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
  </svg>
);

/* ── OTP Input ── */
function OtpInput({ value, onChange, hasError }) {
  const refs = useRef([]);
  const digits = value.split("").concat(Array(6).fill("")).slice(0, 6);

  const handleChange = (i, e) => {
    const v = e.target.value.replace(/\D/g, "").slice(-1);
    const d = [...digits]; d[i] = v;
    onChange(d.join(""));
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const p = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(p.padEnd(6, "").slice(0, 6));
    refs.current[Math.min(p.length, 5)]?.focus();
  };

  return (
    <div className="otp-inputs">
      {digits.map((d, i) => (
        <input key={i} ref={el => refs.current[i] = el}
          type="text" inputMode="numeric" maxLength={1} value={d}
          onChange={e => handleChange(i, e)} onKeyDown={e => handleKeyDown(i, e)}
          onPaste={handlePaste} autoFocus={i === 0}
          className={`otp-digit ${d ? "filled" : ""} ${hasError ? "error" : ""}`}
        />
      ))}
    </div>
  );
}

/* ── Password Strength ── */
function PasswordStrength({ password }) {
  if (!password) return null;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { color: "#ef4444", label: "Weak" },
    { color: "#f59e0b", label: "Fair" },
    { color: "#10b981", label: "Good" },
    { color: "#10b981", label: "Strong" },
  ];
  const { color, label } = levels[Math.max(0, score - 1)];

  return (
    <div className="pass-strength">
      <div className="pass-bars">
        {[1,2,3,4].map(i => (
          <div key={i} className="pass-bar" style={{ background: i <= score ? color : "#e8e8e8" }} />
        ))}
      </div>
      <span className="pass-label" style={{ color }}>{label}</span>
    </div>
  );
}

/* ── OTP Verification Screen ── */
function OtpScreen({ email, maskedEmail, onVerified, onBack }) {
  const [otp,      setOtp]      = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [hasError, setHasError] = useState(false);
  const [timer,    setTimer]    = useState(600);

  useEffect(() => {
    if (otp.length === 6) handleVerify();
  }, [otp]);

  useEffect(() => {
    const t = setInterval(() => setTimer(p => Math.max(0, p - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const handleVerify = async () => {
    setLoading(true); setError(""); setHasError(false);
    try {
      const res = await fetch(`${BASE}/api/auth/google/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Wrong OTP."); setHasError(true); setOtp(""); return; }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user",  JSON.stringify(data.user));
      onVerified(data.user);
    } catch { setError("Connection error."); setHasError(true); }
    finally { setLoading(false); }
  };

  const mins = Math.floor(timer / 60);
  const secs = (timer % 60).toString().padStart(2, "0");

  return (
    <>
      <button className="otp-back-btn" onClick={onBack}><BackIcon /> Back</button>
      <div className="otp-icon">📧</div>
      <h1 className="auth-title">Verify your email</h1>
      <p className="auth-subtitle">We sent a 6-digit code to</p>
      <span className="otp-masked-email">{maskedEmail || email}</span>
      <OtpInput value={otp} onChange={v => { setOtp(v); setHasError(false); }} hasError={hasError} />
      <p className="otp-timer">
        {timer > 0 ? <>Expires in <span>{mins}:{secs}</span></> : <>Code expired</>}
      </p>
      {error && <div className="auth-error" style={{marginTop:8}}>{error}</div>}
      <button className={`auth-submit-btn ${loading?"loading":""}`} style={{marginTop:16,width:"100%"}}
        onClick={handleVerify} disabled={loading || otp.length < 6}>
        {loading ? "" : "Verify & Create Account"}
      </button>
    </>
  );
}

/* ══════════════════════════════════════════
   MAIN SIGNUP PAGE
══════════════════════════════════════════ */
export default function SignUp({ onLogin }) {
  const navigate = useNavigate();

  const [screen,       setScreen]       = useState("signup"); // "signup" | "otp"
  const [form,         setForm]         = useState({ name:"", email:"", password:"", confirm:"" });
  const [showPass,     setShowPass]     = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);
  const [error,        setError]        = useState("");
  const [loading,      setLoading]      = useState(false);
  const [googleLoading,setGoogleLoading]= useState(false);
  const [maskedEmail,  setMaskedEmail]  = useState("");

  const upd = field => e => setForm(f => ({...f, [field]: e.target.value}));

  /* Load Google SDK */
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.google?.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCallback,
      });
    };
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  const handleGoogleClick = () => {
    if (!window.google) { setError("Google Sign-In not loaded."); return; }
    setGoogleLoading(true);
    window.google.accounts.id.prompt();
  };

  const handleGoogleCallback = async (response) => {
    setGoogleLoading(true); setError("");
    try {
      const res = await fetch(`${BASE}/api/auth/google/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: response.credential }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Google signup failed."); return; }
      setForm(f => ({ ...f, email: data.email }));
      setMaskedEmail(data.maskedEmail);
      setScreen("otp");
    } catch { setError("Cannot connect to server."); }
    finally { setGoogleLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setError("");
    const { name, email, password, confirm } = form;
    if (!name || !email || !password || !confirm) { setError("Please fill in all fields."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Registration failed."); return; }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user",  JSON.stringify(data.user));
      onLogin(data.user);
      navigate("/");
    } catch { setError("Connection error."); }
    finally { setLoading(false); }
  };

  const handleOtpVerified = (userData) => { onLogin(userData); navigate("/"); };

  return (
    <div className="auth-page">
      <Link to="/" className="auth-top-logo"><img src="/src/assets/logo.svg" alt="Dribbble" className="logo-img"/></Link>

      <div className="auth-card">
        {screen === "otp" ? (
          <OtpScreen email={form.email} maskedEmail={maskedEmail}
            onVerified={handleOtpVerified} onBack={() => setScreen("signup")} />
        ) : (
          <>
            <DribbbleBall />
            <h1 className="auth-title">Welcome to Dribbble</h1>
            <p className="auth-subtitle">Create your account and discover world-class design talent.</p>

            {/* Google Button */}
            <button className="google-btn" onClick={handleGoogleClick} disabled={googleLoading}>
              <GoogleIcon />
              <span className="google-btn-text">
                {googleLoading ? "Opening Google…" : "Sign up with Google"}
              </span>
            </button>

            <div className="auth-divider"><span>or sign up with email</span></div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <input type="text"     className="auth-input" placeholder="Full name"
                value={form.name}    onChange={upd("name")} autoComplete="name" />

              <input type="email"    className="auth-input" placeholder="Email address"
                value={form.email}   onChange={upd("email")} autoComplete="email" />

              <div className="auth-input-wrap">
                <input type={showPass ? "text" : "password"} className="auth-input"
                  placeholder="Password (min. 8 characters)"
                  value={form.password} onChange={upd("password")} autoComplete="new-password" />
                <button type="button" className="toggle-pass" onClick={() => setShowPass(p=>!p)}>
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
              <PasswordStrength password={form.password} />

              <div className="auth-input-wrap">
                <input type={showConfirm ? "text" : "password"} className="auth-input"
                  placeholder="Confirm password"
                  value={form.confirm} onChange={upd("confirm")} autoComplete="new-password" />
                <button type="button" className="toggle-pass" onClick={() => setShowConfirm(p=>!p)}>
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
              {form.confirm && (
                <div className={`pass-match ${form.password===form.confirm?"match-ok":"match-err"}`}>
                  {form.password===form.confirm ? "✓ Passwords match" : "✗ Passwords do not match"}
                </div>
              )}

              {error && <div className="auth-error">{error}</div>}

              <button type="submit" className={`auth-submit-btn ${loading?"loading":""}`} disabled={loading}>
                {loading ? "" : "Create Account"}
              </button>
            </form>

            <p className="auth-terms">
              By continuing, you agree to our{" "}
              <Link to="/terms"   className="auth-link">Terms</Link> and{" "}
              <Link to="/privacy" className="auth-link">Privacy Policy</Link>.
            </p>

            <p className="auth-switch">
              Already have an account?{" "}
              <Link to="/login" className="auth-link">Log in</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}