import "./Footer.css";
// import "../assets/."
import branding from "../assets/branding.png"
import illustration from "../assets/illustration.png"
import mobile from "../assets/mobile.png"
import animation from "../assets/animation.png"
import print from "../assets/print.png"
import productdegign from "../assets/productdesign.png"
import typography from "../assets/typography.png"
import webdesign from "../assets/webdesign.png"


/* ── CATEGORY DATA with gradient backgrounds ── */
const CATEGORIES = [
  { label: "Web Design", image: webdesign  },
  { label: "Illustration", image: illustration },
  { label: "Animation", image: animation },
  { label: "Branding", image: branding },
  { label: "Product Design", image: productdegign },
  { label: "Typography", image: typography },
  { label: "Mobile", image: mobile },
  { label: "Print", image: print },
];

/* Duplicate for seamless infinite loop */
const CATS_LOOPED = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES, ...CATEGORIES];

/* ── SOCIAL ICONS as clean SVG paths ── */

/* X (Twitter) */
const XIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
  </svg>
);

/* Facebook */
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97H15.83c-1.49 0-1.955.93-1.955 1.887v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
);

/* Instagram */
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

/* Pinterest */
const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);

/* Up arrow for scroll-to-top */
const ArrowUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.2" strokeLinecap="round">
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

/* Sparkle for brief button */
const SparkleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="black">
    <path d="M8 1l1.5 4.5L14 7l-4.5 1.5L8 13l-1.5-4.5L2 7l4.5-1.5z" />
  </svg>
);

/* ── CATEGORY ITEM ── */
function CatItem({ cat }) {
  return (
    <div className="cat-item">
      <div className="cat-item-thumb">
        {/* Decorative content matching real Dribbble */}
        <div
          className="cat-item-bg">
          <img src={cat.image} alt={cat.label} className="cat-img" />
        </div>
      </div>
      <span className="cat-item-label">{cat.label}</span>
    </div>
  );
}

/* Simple decorative content per category */
function CatThumbContent({ label, color }) {
  const style = { color, fontFamily: "'Mona Sans','Helvetica Neue',Helvetica,Arial,sans-serif" };

  const designs = {
    "Web Design": (
      <div style={{ ...style, padding: 14, width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ height: 8, background: color, opacity: 0.3, borderRadius: 4, width: "60%" }} />
        <div style={{ height: 6, background: color, opacity: 0.2, borderRadius: 4, width: "80%" }} />
        <div style={{ height: 6, background: color, opacity: 0.2, borderRadius: 4, width: "50%" }} />
        <div style={{ marginTop: "auto", height: 28, background: color, opacity: 0.2, borderRadius: 6 }} />
      </div>
    ),
    "Illustration": (
      <div style={{ ...style, fontSize: 36, fontWeight: 800, letterSpacing: -2, opacity: 0.9 }}>🎨</div>
    ),
    "Animation": (
      <div style={{ width: 52, height: 52, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #555, #111)", boxShadow: "inset 0 0 20px rgba(255,255,255,0.05)" }} />
    ),
    "Branding": (
      <div style={{ ...style, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1, color: "#0d0c22", opacity: 0.7 }}>LOGO</div>
        <div style={{ width: 40, height: 2, background: "#0d0c22", opacity: 0.3 }} />
        <div style={{ width: 60, height: 6, background: "#0d0c22", opacity: 0.12, borderRadius: 3 }} />
      </div>
    ),
    "Product Design": (
      <div style={{ ...style, fontSize: 32, opacity: 0.9 }}>📱</div>
    ),
    "Typography": (
      <div style={{ ...style, fontSize: 44, fontWeight: 900, letterSpacing: -2, opacity: 0.85 }}>Aa</div>
    ),
    "Mobile": (
      <div style={{ width: 36, height: 64, borderRadius: 10, border: "3px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.1)" }} />
    ),
    "Print": (
      <div style={{ width: 54, height: 68, background: "rgba(255,255,255,0.5)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 4 }}>
        <div style={{ width: 32, height: 4, background: "#999", borderRadius: 2 }} />
        <div style={{ width: 24, height: 4, background: "#bbb", borderRadius: 2 }} />
        <div style={{ width: 28, height: 4, background: "#bbb", borderRadius: 2 }} />
      </div>
    ),
  };

  return designs[label] || <div style={{ ...style, fontSize: 24 }}>✦</div>;
}

/* ── MAIN FOOTER ── */
export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer">

      {/* ── SIGN UP BUTTON + SCROLL TOP ── */}
      {/* <div className="footer-signup-wrap">
        <a href="/signup" className="footer-signup-btn">
          Sign up to continue
        </a>
        <button className="footer-scroll-top" onClick={scrollToTop} aria-label="Scroll to top">
          <ArrowUpIcon />
        </button>
      </div> */}

      {/* ── CATEGORY SCROLL STRIP ── */}
      <div className="footer-categories">
        <div className="cat-track-outer">
          <div className="cat-track">
            {/* Quadruple items for seamless infinite loop */}
            {CATS_LOOPED.map((cat, i) => (
              <CatItem key={i} cat={cat} />
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER NAV BAR ── */}
      <div className="footer-nav-bar">
        {/* Logo */}
        <a href="#" className="footer-logo-link">
          {/* <span className="footer-logo-text">Dribbble</span> */}
          <img src="/logo.svg"  alt="logo" className="logo-img" />
        </a>

        {/* Nav links */}
        <nav className="footer-nav-links">
          {["For designers", "Hire talent", "Inspiration", "Advertising", "Blog", "About", "Careers", "Support"].map(link => (
            <a key={link} href="#" className="footer-nav-link">{link}</a>
          ))}
        </nav>

        {/* Social icons — brand SVGs */}
        <div className="footer-socials">
          <a href="https://twitter.com/dribbble" className="footer-social-icon" title="X / Twitter" target="_blank" rel="noreferrer">
            <XIcon />
          </a>
          <a href="https://facebook.com/dribbble" className="footer-social-icon" title="Facebook" target="_blank" rel="noreferrer">
            <FacebookIcon />
          </a>
          <a href="https://instagram.com/dribbble" className="footer-social-icon" title="Instagram" target="_blank" rel="noreferrer">
            <InstagramIcon />
          </a>
          <a href="https://pinterest.com/dribbble" className="footer-social-icon" title="Pinterest" target="_blank" rel="noreferrer">
            <PinterestIcon />
          </a>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="footer-bottom">
        <div className="footer-copy">
          <span>© 2026 Dribbble</span>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Cookies</a>
        </div>
        <div className="footer-bottom-right">
          <a href="#">Jobs</a>
          <a href="#">Designers</a>
          <a href="#">Freelancers</a>
          <a href="#">Tags</a>
          <a href="#">Places</a>
          <a href="#">Resources</a>
        </div>
      </div>

    </footer>
  );
}