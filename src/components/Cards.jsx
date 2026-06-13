










import { useState, useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import "./Cards.css";

import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png";
import card3 from "../assets/card3.png";
import card4 from "../assets/card4.png";
import acard1 from "../assets/acard1.png";
import acard2 from "../assets/acard2.png";
import acard3 from "../assets/acard3.png";
import acard4 from "../assets/acard4.png";
import acard5 from "../assets/acard5.png";
import dcard1 from "../assets/dcard1.png";
import dcard2 from "../assets/dcard2.png";
import dcard3 from "../assets/dcard3.png";
import dcard4 from "../assets/dcard4.png";
import dcard5 from "../assets/dcard5.png";
import pcard1 from "../assets/pcard1.png";
import pcard2 from "../assets/pcard2.png";
import pcard3 from "../assets/pcard3.png";
import pcard4 from "../assets/pcard4.png";
import pcard5 from "../assets/pcard5.png";
import pdcard1 from "../assets/pdcard1.png";
import pdcard2 from "../assets/pdcard2.png";
import pdcard3 from "../assets/pdcard3.png";
import pdcard4 from "../assets/pdcard4.png";
import pdcard5 from "../assets/pdcard5.png";
import tgcard1 from "../assets/tgcard1.png";
import tgcard2 from "../assets/tgcard2.png";
import tgcard3 from "../assets/tgcard3.png";
import tgcard4 from "../assets/tgcard4.png";
import tgcard5 from "../assets/tgcard5.png";
import tgcard6 from "../assets/tgcard6.png";
import wdcard1 from "../assets/wdcard1.png";
import wdcard2 from "../assets/wdcard2.png";
import wdcard3 from "../assets/wdcard3.png";
import wdcard4 from "../assets/wdcard4.png";
import wdcard5 from "../assets/wdcard5.png";
import wdcard6 from "../assets/wdcard6.png";

const BASE = import.meta.env.VITE_API_URL;


/* ── DATA ── */
const ALL_SHOTS = {
  Discover: [
    { id: 1, title: "Cachely — Brand Identity", author: "Jeroen van Eerden", badge: "pro", likes: 58, views: 4300, bg: "#f5f5f3", ratio: "ratio-4-3", image: card1 },
    { id: 2, title: "AvERON App - Performance Outerwear", author: "Kunal", badge: "pro", likes: 87, views: 8700, bg: "linear-gradient(160deg,#1a1a2e,#16213e,#0f3460)", ratio: "ratio-4-3", image: card2 },
    { id: 3, title: "NEKO — The Best Ramen Ever", author: "Tanbir", badge: "proplus", likes: 149, views: 5300, bg: "linear-gradient(135deg,#f5c842,#e8a020)", ratio: "ratio-4-3", image: card3 },
    { id: 4, title: "Key Strengths & Principles", author: "Rohan", badge: "", likes: 0, views: 0, bg: "linear-gradient(135deg,#1a3a5c,#2d6a9f,#5ab4e5)", ratio: "ratio-4-3", image: card4, isAd: true },
    { id: 5, title: "Horse — Logotype", author: "Ankit", badge: "pro", likes: 42, views: 1900, bg: "#f5f5f3", ratio: "ratio-1-1", image: card2 },
    { id: 6, title: "Cultiva — Agriculture Brand", author: "Nixtio", badge: "proplus", likes: 127, views: 3600, bg: "linear-gradient(180deg,#6ec72d,#4a9e1a)", ratio: "ratio-4-3", image: card3 },
    { id: 7, title: "Your DeFi, Supercharged", author: "FANCY", badge: "proplus", likes: 67, views: 8000, bg: "linear-gradient(135deg,#0d1b4b,#1a3a7c,#2563eb)", ratio: "ratio-4-3", image: card3 },
    { id: 8, title: "Product Design System", author: "Rohan", badge: "proplus", likes: 135, views: 6100, bg: "linear-gradient(135deg,#fafafa,#f0f0f0)", ratio: "ratio-3-4", image: card4 },
    { id: 9, title: "AI Powered Dashboard", author: "Sasha M.", badge: "pro", likes: 211, views: 9200, bg: "linear-gradient(135deg,#7c3aed,#4f46e5,#2563eb)", ratio: "ratio-16-9", image: card2 },
    { id: 10, title: "Mobile Banking App UI", author: "Alex Chen", badge: "proplus", likes: 312, views: 12400, bg: "linear-gradient(135deg,#0f172a,#1e293b,#334155)", ratio: "ratio-2-3", image: card3 },
    { id: 11, title: "Organic Food Branding", author: "Maria K.", badge: "pro", likes: 176, views: 7400, bg: "linear-gradient(135deg,#f59e0b,#d97706,#92400e)", ratio: "ratio-1-1", image: card1 },
    { id: 12, title: "SaaS Dashboard Dark", author: "ThreeDee Studio", badge: "proplus", likes: 428, views: 18600, bg: "linear-gradient(135deg,#09090b,#18181b,#27272a)", ratio: "ratio-16-9", image: card2 },
  ],
  Animation: [
    { id: 21, title: "BUILD — Motion Identity", author: "Ankit", badge: "pro", likes: 135, views: 4800, bg: "linear-gradient(135deg,#0d1b4b,#1a3a7c)", ratio: "ratio-4-3", image: acard1 },
    { id: 22, title: "Omchain Smart Agent", author: "FANCY", badge: "proplus", likes: 53, views: 2300, bg: "linear-gradient(135deg,#1a1a2e,#16213e)", ratio: "ratio-4-3", image: acard2 },
    { id: 23, title: "3D Sphere Abstract", author: "Maria K.", badge: "proplus", likes: 50, views: 3300, bg: "linear-gradient(135deg,#111,#2a2a2a)", ratio: "ratio-4-3", image: acard3 },
    { id: 24, title: "Own Your Professional Edge", author: "Nixtio", badge: "pro", likes: 207, views: 21100, bg: "linear-gradient(135deg,#ff6b00,#ff3d00)", ratio: "ratio-4-3", image: acard1 },
    { id: 25, title: "Blue Waves Motion", author: "Tridimensi", badge: "pro", likes: 31, views: 2000, bg: "linear-gradient(135deg,#0ea5e9,#0284c7,#0369a1)", ratio: "ratio-4-3", image: acard5 },
    { id: 26, title: "Metallic Flower 3D", author: "Sasha M.", badge: "proplus", likes: 43, views: 639, bg: "linear-gradient(135deg,#18181b,#1c1917)", ratio: "ratio-1-1", image: acard2 },
    { id: 27, title: "Fluid Data Chemistry", author: " ThreeDee Studio", badge: "proplus", likes: 23, views: 1200, bg: "linear-gradient(135deg,#1e3a5f,#1a5276)", ratio: "ratio-16-9", image: acard3 },
    { id: 28, title: "Crypto Motion Brand", author: "Alex Chen", badge: "pro", likes: 98, views: 5400, bg: "linear-gradient(135deg,#7c3aed,#4f46e5)", ratio: "ratio-4-3", image: acard4 },
  ],
  Branding: [
    { id: 31, title: "Notifications UI Dark", author: "Tanbir", badge: "proplus", likes: 52, views: 1600, bg: "linear-gradient(135deg,#1a1a2e,#ea4c89)", ratio: "ratio-4-3", image: dcard1 },
    { id: 32, title: "Skull Mascot Character", author: "Ankit", badge: "pro", likes: 40, views: 1300, bg: "#f5f5f3", ratio: "ratio-1-1", image: dcard2 },
    { id: 33, title: "Orexai AI Solutions", author: "Nixtio", badge: "pro", likes: 68, views: 2900, bg: "linear-gradient(135deg,#5433ff,#20bdff,#a5fecb)", ratio: "ratio-4-3", image: dcard5 },
    { id: 34, title: "Gradient Brand System", author: "FANCY", badge: "", likes: 0, views: 0, bg: "linear-gradient(135deg,#f97316,#ef4444)", ratio: "ratio-4-3", image: dcard4, isAd: true },
    { id: 35, title: "Arcania Editorial Design", author: " ThreeDee Studio", badge: "pro", likes: 102, views: 6400, bg: "linear-gradient(135deg,#f5f0e8,#e8dfc8)", ratio: "ratio-3-4", image: dcard3 },
    { id: 36, title: "Koda App with Character", author: "Alex Chen", badge: "pro", likes: 40, views: 2000, bg: "linear-gradient(135deg,#4facfe,#00f2fe)", ratio: "ratio-4-3", image: dcard1 },
    { id: 37, title: "Aiqify Brand Identity", author: "Sasha M.", badge: "pro", likes: 81, views: 929, bg: "linear-gradient(135deg,#111,#1c1c1c)", ratio: "ratio-4-3", image: dcard2 },
    { id: 38, title: "Blue Ribbons Motion", author: "Tridimensi", badge: "pro", likes: 31, views: 2000, bg: "linear-gradient(135deg,#0ea5e9,#6366f1)", ratio: "ratio-16-9", image: dcard5 },
  ],
  Illustration: [
    { id: 41, title: "Liquid State Can Design", author: "Maria K.", badge: "pro", likes: 88, views: 4200, bg: "linear-gradient(135deg,#2d8a2d,#4caf50)", ratio: "ratio-4-3", image: dcard4 },
    { id: 42, title: "Hooligan Branding Set", author: "Igor S.", badge: "pro", likes: 76, views: 3100, bg: "linear-gradient(135deg,#f5f0e8,#e8dfc8)", ratio: "ratio-4-3", image: acard5 },
    { id: 43, title: "Fantasy Character Art", author: "Alex Chen", badge: "proplus", likes: 245, views: 11200, bg: "linear-gradient(135deg,#7c3aed,#ec4899)", ratio: "ratio-2-3", image: dcard5 },
    { id: 44, title: "Nature Scene Vector", author: "Lea K.", badge: "pro", likes: 63, views: 2700, bg: "linear-gradient(135deg,#4caf50,#81c784)", ratio: "ratio-4-3", image: acard3 },
    { id: 45, title: "Urban Sketch Series", author: "Sasha M.", badge: "pro", likes: 112, views: 5600, bg: "linear-gradient(135deg,#ff7043,#e64a19)", ratio: "ratio-1-1", image: acard2 },
    { id: 46, title: "Geometric Pattern Pack", author: "Nixtio", badge: "proplus", likes: 189, views: 8900, bg: "linear-gradient(135deg,#42a5f5,#1976d2)", ratio: "ratio-4-3", image: dcard1 },
  ],
  Mobile: [
    { id: 51, title: "Health Score Tracker", author: "Igor S.", badge: "pro", likes: 211, views: 9200, bg: "linear-gradient(135deg,#e8f4fd,#c5e3f7)", ratio: "ratio-2-3", image: card1 },
    { id: 52, title: "Finance App Dark Mode", author: "Nixtio", badge: "pro", likes: 120, views: 2600, bg: "linear-gradient(135deg,#ff6b00,#ff3d00)", ratio: "ratio-2-3", image: dcard1 },
    { id: 53, title: "Property App UI", author: "Kunal", badge: "pro", likes: 213, views: 9400, bg: "linear-gradient(135deg,#f5f0e8,#ece8e0)", ratio: "ratio-3-4", image: acard1 },
    { id: 54, title: "Medical App UI", author: "Tanbir", badge: "pro", likes: 145, views: 4700, bg: "linear-gradient(135deg,#e8f4fd,#d4eaf7)", ratio: "ratio-4-3", image: dcard4 },
    { id: 55, title: "Yoga Wellness App", author: "Sasha M.", badge: "pro", likes: 87, views: 3300, bg: "linear-gradient(135deg,#1a1a2e,#2d3561)", ratio: "ratio-2-3", image: dcard5 },
    { id: 56, title: "Eyewear Shopping App", author: "FANCY", badge: "proplus", likes: 102, views: 6400, bg: "linear-gradient(135deg,#f8fafc,#f1f5f9)", ratio: "ratio-4-3", image: card3 },
  ],
  Print: [
    { id: 61, title: "Magazine Layout Design", author: "Nixtio", badge: "pro", likes: 94, views: 4100, bg: "linear-gradient(135deg,#fafafa,#f0f0f0)", ratio: "ratio-2-3", image: pcard1 },
    { id: 62, title: "Poster Series Black", author: "Sasha M.", badge: "pro", likes: 67, views: 2800, bg: "linear-gradient(135deg,#111,#222)", ratio: "ratio-2-3", image: pcard4 },
    { id: 63, title: "Book Cover Concept", author: "Maria K.", badge: "pro", likes: 145, views: 6300, bg: "linear-gradient(135deg,#f97316,#ea580c)", ratio: "ratio-2-3", image: pcard3 },
    { id: 64, title: "Packaging Mockup", author: "Lea K.", badge: "proplus", likes: 213, views: 9800, bg: "linear-gradient(135deg,#f5c842,#e8a020)", ratio: "ratio-4-3", image: pcard2 },
    { id: 65, title: "Typographic Poster", author: "Igor S.", badge: "pro", likes: 88, views: 3900, bg: "linear-gradient(135deg,#1a3a5c,#2d6a9f)", ratio: "ratio-2-3", image: pcard5 },
    { id: 66, title: "Greeting Card Pack", author: "Alex Chen", badge: "pro", likes: 56, views: 2100, bg: "linear-gradient(135deg,#ec4899,#a855f7)", ratio: "ratio-4-3", image: pcard1 },
  ],
  "Product Design": [
    { id: 71, title: "AI Data Pipeline Platform", author: "Lea K.", badge: "pro", likes: 57, views: 3200, bg: "linear-gradient(135deg,#fafafa,#f0f0f0)", ratio: "ratio-16-9", image: pdcard1 },
    { id: 72, title: "SaaS Analytics Dashboard", author: "Ankit", badge: "pro", likes: 135, views: 4800, bg: "linear-gradient(135deg,#09090b,#18181b)", ratio: "ratio-16-9", image: pdcard2 },
    { id: 73, title: "Master Room Booking", author: "Kunal", badge: "pro", likes: 203, views: 8400, bg: "linear-gradient(135deg,#f5f0e8,#ece8e0)", ratio: "ratio-4-3", image: pdcard3 },
    { id: 74, title: "E-Commerce Eyewear", author: "FANCY", badge: "proplus", likes: 155, views: 5900, bg: "linear-gradient(135deg,#f8fafc,#f1f5f9)", ratio: "ratio-16-9", image: pdcard4 },
    { id: 75, title: "Care & Trust Medical", author: "Tanbir", badge: "pro", likes: 145, views: 4700, bg: "linear-gradient(135deg,#e8f4fd,#d4eaf7)", ratio: "ratio-4-3", image: pdcard5 },
    { id: 76, title: "Task Management App", author: "Alex Chen", badge: "proplus", likes: 137, views: 3300, bg: "linear-gradient(135deg,#f5c842,#e8a020)", ratio: "ratio-2-3", image: pdcard2 },
  ],
  Typography: [
    { id: 81, title: "Serif Display Font 2025", author: "Maria K.", badge: "pro", likes: 165, views: 7200, bg: "linear-gradient(135deg,#8b4513,#a0522d)", ratio: "ratio-4-3", image: tgcard1 },
    { id: 82, title: "Variable Font Exploration", author: "Sasha M.", badge: "pro", likes: 89, views: 3800, bg: "#f5f5f3", ratio: "ratio-1-1", image: tgcard2 },
    { id: 83, title: "Logotype Collection 2025", author: "Igor S.", badge: "pro", likes: 88, views: 3100, bg: "linear-gradient(135deg,#18181b,#27272a)", ratio: "ratio-4-3", image: tgcard3 },
    { id: 84, title: "Handwritten Script Pack", author: "Lea K.", badge: "proplus", likes: 234, views: 10300, bg: "linear-gradient(135deg,#fafafa,#e8e8e8)", ratio: "ratio-4-3", image: tgcard4 },
    { id: 85, title: "Brutalist Type System", author: "Nixtio", badge: "pro", likes: 112, views: 5600, bg: "linear-gradient(135deg,#fff,#f0f0f0)", ratio: "ratio-16-9", image: tgcard5 },
    { id: 86, title: "Korean Type Design", author: "Tanbir", badge: "proplus", likes: 178, views: 8100, bg: "linear-gradient(135deg,#f5c842,#e8a020)", ratio: "ratio-4-3", image: tgcard6 },
  ],
  "Web Design": [
    { id: 91, title: "Agency Landing Page", author: "Kunal", badge: "pro", likes: 87, views: 8700, bg: "linear-gradient(135deg,#1a1a2e,#16213e)", ratio: "ratio-16-9", image: wdcard1 },
    { id: 92, title: "Startup SaaS Website", author: "Nixtio", badge: "proplus", likes: 127, views: 3600, bg: "linear-gradient(135deg,#6ec72d,#4a9e1a)", ratio: "ratio-16-9", image: wdcard2 },
    { id: 93, title: "Portfolio Minimal", author: "Lea K.", badge: "pro", likes: 57, views: 3200, bg: "#fafafa", ratio: "ratio-16-9", image: wdcard3 },
    { id: 94, title: "E-commerce Fashion", author: "Ankit", badge: "proplus", likes: 575, views: 19000, bg: "linear-gradient(135deg,#111,#333)", ratio: "ratio-4-3", image: wdcard4 },
    { id: 95, title: "Blog Layout System", author: "Alex Chen", badge: "pro", likes: 1500, views: 36700, bg: "linear-gradient(135deg,#f5f0e8,#ece8e0)", ratio: "ratio-16-9", image: wdcard5 },
    { id: 96, title: "Dashboard Analytics", author: " ThreeDee Studio", badge: "pro", likes: 102, views: 6400, bg: "linear-gradient(135deg,#7c3aed,#4f46e5)", ratio: "ratio-16-9", image: wdcard6 },
  ],
};

const AVATAR_COLORS = ["#ea4c89", "#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#14b8a6"];
const CATEGORIES = ["Discover", "Animation", "Branding", "Illustration", "Mobile", "Print", "Product Design", "Typography", "Web Design"];

/* ── ICONS ── */
const ChevronIcon = () => <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 1l4 4 4-4" /></svg>;
const FilterIcon = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 4h12M5 8h6M7 12h2" /></svg>;
const SearchSmIcon = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" width="19" height="19" >
  <circle cx="7" cy="7" r="4.5" />
  <path d="M11 11l3 3" /></svg>;
const SparkleIcon = () => <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14"><path d="M8 1l1.5 4.5L14 7l-4.5 1.5L8 13l-1.5-4.5L2 7l4.5-1.5z" /></svg>;
const EyeIcon = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" /><circle cx="8" cy="8" r="2" /></svg>;

const HeartIcon = ({ filled }) => (
  <svg viewBox="0 0 16 16" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <path d="M8 13.7l-1-.9C3.5 9.5 1 7.3 1 4.7 1 2.6 2.6 1 4.7 1c1.2 0 2.3.5 3.3 1.4C9 1.5 10.1 1 11.3 1 13.4 1 15 2.6 15 4.7c0 2.6-2.5 4.8-6 8.1l-1 .9z" />
  </svg>
);

const BookmarkIcon = ({ filled }) => (
  <svg viewBox="0 0 16 16" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
    <path d="M3 2h10v12l-5-3-5 3V2z" />
  </svg>
);

/* ── LOGIN MODAL ── */
function LoginModal({ action, onClose }) {
  const navigate = useNavigate();
  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={e => e.stopPropagation()}>
        <div className="login-modal-icon">💜</div>
        <h3>Sign in to {action}</h3>
        <p>Create a free account or log in to like and save shots on Dribbble.</p>
        <div className="login-modal-btns">
          <button className="modal-btn-dark" onClick={() => { onClose(); navigate("/login"); }}>Log in</button>
          <button className="modal-btn-ghost" onClick={() => { onClose(); navigate("/signup"); }}>Create account — it's free</button>
        </div>
        <button className="modal-close-btn" onClick={onClose}>Maybe later</button>
      </div>
    </div>
  );
}

/* ── SINGLE SHOT CARD ── */
function ShotCard({ item, idx, user, likedIds, savedIds, onLike, onSave }) {
  const [localLikes, setLocalLikes] = useState(item.likes);
  const isLiked = likedIds.has(item.id);
  const isSaved = savedIds.has(item.id);
  const fmtNum = n => n >= 1000 ? (n / 1000).toFixed(1) + "k" : String(n);

  const handleLike = (e) => {
    e.stopPropagation();
    const wasLiked = likedIds.has(item.id);
    // Optimistic UI update
    setLocalLikes(prev => wasLiked ? prev - 1 : prev + 1);
    onLike(item.id, wasLiked);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    onSave(item.id, savedIds.has(item.id));
  };

  return (
    <div className="shot-card">
      <div className={`shot-thumb ${item.ratio}`}>
        {/* <div className="shot-thumb-bg" style={{ background: item.bg }} /> */}
        <div className={`shot-thumb ${item.ratio}`}>
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="shot-thumb-img"
            />
          ) : (
            <div
              className="shot-thumb-bg"
              style={{ background: item.bg }}
            />
          )}
        </div>
        <div className="shot-overlay">
          <span className="shot-hover-title">{item.title}</span>
        </div>
        <div className="shot-hover-actions">
          <button
            className={`hover-action-btn ${isSaved ? "saved" : ""}`}
            onClick={handleSave}
            title={isSaved ? "Unsave" : "Save"}>
            <BookmarkIcon filled={isSaved} />
          </button>
          <button
            className={`hover-action-btn ${isLiked ? "liked" : ""}`}
            onClick={handleLike}
            title={isLiked ? "Unlike" : "Like"}>
            <HeartIcon filled={isLiked} />
          </button>
        </div>
      </div>

      <div className="shot-info">
        <div className="shot-avatar" style={{ background: AVATAR_COLORS[idx % AVATAR_COLORS.length] }}>
          {item.author?.charAt(0).toUpperCase()}
        </div>
        <span className="shot-author-name">{item.author}</span>
        {item.badge === "pro" && <span className="badge badge-pro">PRO</span>}
        {item.badge === "proplus" && <span className="badge badge-proplus">PRO+</span>}
        {!item.isAd && (
          <div className="shot-stats">
            <span className="shot-stat" style={{ color: isLiked ? "#ea4c89" : "#6e6d7a" }}>
              <HeartIcon filled={isLiked} /> {fmtNum(localLikes)}
            </span>
            <span className="shot-stat"><EyeIcon /> {fmtNum(item.views)}</span>
          </div>
        )}
        {item.isAd && (
          <div className="shot-stats">
            <a href="#" style={{ fontSize: 12, color: "#aaa", textDecoration: "none" }}>Hide ads</a>
            <span style={{ fontSize: 12, color: "#ddd" }}>•</span>
            <a href="#" style={{ fontSize: 12, color: "#aaa", textDecoration: "none" }}>Advertise</a>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── SORT DROPDOWN ── */
function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);
  return (
    <div className="sort-wrap" ref={ref}>
      <button className={`sort-btn ${open ? "open" : ""}`} onClick={() => setOpen(o => !o)}>
        {value} <ChevronIcon />
      </button>
      {open && (
        <div className="sort-menu">
          {["Popular", "New & Noteworthy"].map(opt => (
            <div key={opt} className={`sort-option ${value === opt ? "active" : ""}`}
              onClick={() => { onChange(opt); setOpen(false); }}>
              {opt} {value === opt && <span className="check">✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════
   MAIN CARDS COMPONENT
══════════════════════════════════ */
export default function Cards({ user }) {
const [tfOpen, setTfOpen] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [sort, setSort] = useState("Popular");
  const [activeCat, setActiveCat] = useState("Discover");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [tagSearch, setTagSearch] = useState("");
  const [colorVal, setColorVal] = useState("");
  const [timeframe, setTimeframe] = useState("now");

  // Like & Save sets — store IDs
  const [likedIds, setLikedIds] = useState(new Set());
  const [savedIds, setSavedIds] = useState(new Set());

  // Login modal
  const [loginModal, setLoginModal] = useState({ show: false, action: "" });

  const data = ALL_SHOTS[activeCat] || ALL_SHOTS["Discover"];

  // ── Load existing likes & saves from backend when user logs in ──
  useEffect(() => {
    if (!user) {
      setLikedIds(new Set());
      setSavedIds(new Set());
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    // Fetch liked IDs
    fetch("${BASE}/api/likes/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.ok ? r.json() : [])
      .then(ids => {
        if (Array.isArray(ids)) setLikedIds(new Set(ids));
      })
      .catch(() => { });

    // Fetch saved IDs
    fetch("${BASE}/api/saves/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.ok ? r.json() : [])
      .then(ids => {
        if (Array.isArray(ids)) setSavedIds(new Set(ids));
      })
      .catch(() => { });

  }, [user]);

  // ── LIKE handler — calls backend ──
  const handleLike = async (shotId, wasLiked) => {
    // Not logged in → show modal
    if (!user) {
      setLoginModal({ show: true, action: "like shots" });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) { setLoginModal({ show: true, action: "like shots" }); return; }

    // Optimistic update in UI
    setLikedIds(prev => {
      const next = new Set(prev);
      wasLiked ? next.delete(shotId) : next.add(shotId);
      return next;
    });

    // Call backend
    try {
      const res = await fetch(`${BASE}/api/likes/${shotId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        // Revert on failure
        setLikedIds(prev => {
          const next = new Set(prev);
          wasLiked ? next.add(shotId) : next.delete(shotId);
          return next;
        });
      }
    } catch {
      // Revert on network error
      setLikedIds(prev => {
        const next = new Set(prev);
        wasLiked ? next.add(shotId) : next.delete(shotId);
        return next;
      });
    }
  };

  // ── SAVE handler — calls backend ──
  const handleSave = async (shotId, wasSaved) => {
    if (!user) {
      setLoginModal({ show: true, action: "save shots" });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) { setLoginModal({ show: true, action: "save shots" }); return; }

    // Optimistic update
    setSavedIds(prev => {
      const next = new Set(prev);
      wasSaved ? next.delete(shotId) : next.add(shotId);
      return next;
    });

    // Call backend
    try {
      const res = await fetch(`${BASE}/api/saves/${shotId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        // Revert on failure
        setSavedIds(prev => {
          const next = new Set(prev);
          wasSaved ? next.add(shotId) : next.delete(shotId);
          return next;
        });
      }
    } catch {
      setSavedIds(prev => {
        const next = new Set(prev);
        wasSaved ? next.add(shotId) : next.delete(shotId);
        return next;
      });
    }
  };


  return (
    <section className="cards-section">

      {/* Login Modal */}
      {loginModal.show && (
        <LoginModal
          action={loginModal.action}
          onClose={() => setLoginModal({ show: false, action: "" })}
        />
      )}



      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-bar-left">
          <SortDropdown value={sort} onChange={setSort} />
          <div className="cat-tabs">
            {CATEGORIES.map(cat => (
              <button key={cat}
                className={`cat-tab ${activeCat === cat ? "active" : ""}`}
                onClick={() => setActiveCat(cat)}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <button className={`filters-btn ${filtersOpen ? "active" : ""}`}
          onClick={() => setFiltersOpen(o => !o)}>
          <FilterIcon /> Filters
        </button>
      </div>

      {/* Filters Panel */}
      {filtersOpen && (
        <div className="filters-panel">
          <div>
            <span className="filter-group-label">Tags</span>
            {/* <div className="filter-input-wrap">
              <SearchSmIcon className="filter-icon" />
              <input type="text" className="filter-input" value={tagSearch} onChange={e => setTagSearch(e.target.value)} />
            </div> */}
            <div className="filter-input-warp">
              <SearchSmIcon className="csearch-icon" />

              <input
                type="text"
                className="csearch-text"
                placeholder="Search tags..."
                value={tagSearch}
                onChange={(e) => setTagSearch(e.target.value)}
              />
            </div>
          </div>
          <div>
            <span className="filter-group-label">Color</span>
            <div className="color-input-row">
              <div className="color-wheel" />
              <input type="text" className="color-text" placeholder="Enter hex or select" value={colorVal} onChange={e => setColorVal(e.target.value)} />
            </div>
          </div>
          <div>
            <span className="filter-group-label">Timeframe</span>
            {/* <select className="timeframe-select" value={timeframe} onChange={e => setTimeframe(e.target.value)}>
              <option value="now">Now</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="all">All Time</option>
            </select> */}


              <div className="timeframe-dropdown">
  <button
  className={`timeframe-btn ${tfOpen ? "open" : ""}`}
  onClick={() => setTfOpen(prev => !prev)}
>
  <span>
    {timeframe === "now" && "Now"}
    {timeframe === "week" && "This Past Week"}
    {timeframe === "month" && "This Past Month"}
    {timeframe === "year" && "This Past Year"}
    {timeframe === "all" && "All Time"}
  </span>

  {/* 👇 ADD THIS */}
  <svg className="timeframe-arrow" viewBox="0 0 10 6">
    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.8" fill="none"/>
  </svg>
</button>

  {tfOpen && (
    <div className="btn-dropdown-options">
      <ul>
        <li className={timeframe === "now" ? "active" : ""}>
          <button onClick={() => { setTimeframe("now"); setTfOpen(false); }}>
            Now
          </button>
        </li>

        <li className={timeframe === "week" ? "active" : ""}>
          <button onClick={() => { setTimeframe("week"); setTfOpen(false); }}>
            This Past Week
          </button>
        </li>

        <li className={timeframe === "month" ? "active" : ""}>
          <button onClick={() => { setTimeframe("month"); setTfOpen(false); }}>
            This Past Month
          </button>
        </li>

        <li className={timeframe === "year" ? "active" : ""}>
          <button onClick={() => { setTimeframe("year"); setTfOpen(false); }}>
            This Past Year
          </button>
        </li>

        <li className={timeframe === "all" ? "active" : ""}>
          <button onClick={() => { setTimeframe("all"); setTfOpen(false); }}>
            All Time
          </button>
        </li>
      </ul>
    </div>
  )}
</div>

            
          </div>
        </div>
      )}

      {!filtersOpen && <div className="bar-separator" />}

      {/* Cards Grid */}
      <div className="cards-grid">
        {data.map((item, i) => (
          <ShotCard
            key={item.id}
            item={item}
            idx={i}
            user={user}
            likedIds={likedIds}
            savedIds={savedIds}
            onLike={handleLike}
            onSave={handleSave}
          />
        ))}
      </div>
    </section>
  );
}