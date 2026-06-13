






import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./UserDashboard.css";
const BASE = import.meta.env.VITE_API_URL;



/* ── ICONS ── */
const HeartIcon    = ({filled})=><svg viewBox="0 0 16 16" fill={filled?"#ea4c89":"none"} stroke={filled?"#ea4c89":"#6e6d7a"} strokeWidth="1.5" width="14" height="14"><path d="M8 13.7l-1-.9C3.5 9.5 1 7.3 1 4.7 1 2.6 2.6 1 4.7 1c1.2 0 2.3.5 3.3 1.4C9 1.5 10.1 1 11.3 1 13.4 1 15 2.6 15 4.7c0 2.6-2.5 4.8-6 8.1l-1 .9z"/></svg>;
const BookmarkIcon = ({filled})=><svg viewBox="0 0 16 16" fill={filled?"#0d0d0d":"none"} stroke={filled?"#0d0d0d":"#6e6d7a"} strokeWidth="1.6" width="14" height="14"><path d="M3 2h10v12l-5-3-5 3V2z"/></svg>;
const EyeIcon      = ()=><svg viewBox="0 0 16 16" fill="none" stroke="#6e6d7a" strokeWidth="1.5" width="13" height="13"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"/><circle cx="8" cy="8" r="2"/></svg>;
const EditIcon     = ()=><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>;
const LocationIcon = ()=><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>;
const AdminIcon    = ()=><svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>;

const FALLBACK_COLORS = ["#ea4c89","#6366f1","#0ea5e9","#10b981","#f59e0b","#8b5cf6","#ef4444","#14b8a6"];
// const BASE = "http://localhost:8080";
// const BASE = "https://dribbblebackend-production.up.railway.app";

/* ── STAT CARD ── */
function StatCard({ label, value, color, icon }) {
  return (
    <div className="ud-stat-card">
      <div className="ud-stat-icon" style={{ background: color + "18", color }}>{icon}</div>
      <div>
        <div className="ud-stat-value">{value}</div>
        <div className="ud-stat-label">{label}</div>
      </div>
    </div>
  );
}

/* ── SHOT CARD ── */
function ShotCard({ shot, idx, type }) {
  const [hov, setHov] = useState(false);

  // Support both ShotResponse fields (id/bgStyle) and admin fields (shotId/shotBg)
  const id       = shot.id       ?? shot.shotId;
  const title    = shot.title    ?? shot.shotTitle ?? `Shot #${id}`;
  const bg       = shot.bgStyle  ?? shot.shotBg   ?? FALLBACK_COLORS[idx % FALLBACK_COLORS.length];
  const category = shot.category ?? "";
  const likes    = shot.likeCount  ?? 0;
  const views    = shot.viewCount  ?? 0;
  const author   = shot.authorName ?? shot.author ?? "";
  const badge    = shot.badge ?? "";

  return (
    <div
      className="ud-shot-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Thumbnail */}
      <div className="ud-shot-thumb">
        {shot.imageUrl
          ? <img src={shot.imageUrl} alt={title} className="ud-shot-img" />
          : <div className="ud-shot-bg" style={{ background: bg }} />
        }

        {hov && (
          <div className="ud-shot-overlay">
            <span className="ud-shot-overlay-text">{title}</span>
          </div>
        )}

        <div className="ud-shot-badge">
          {type === "liked" ? <HeartIcon filled /> : <BookmarkIcon filled />}
        </div>
      </div>

      {/* Info */}
      <div className="ud-shot-info">
        <div className="ud-shot-details">
          <span className="ud-shot-title">{title}</span>
          {category && <span className="ud-shot-category">{category}</span>}
        </div>
        <div className="ud-shot-stats">
          <span className="ud-shot-stat"><HeartIcon /> {likes}</span>
          <span className="ud-shot-stat"><EyeIcon /> {views.toLocaleString()}</span>
        </div>
      </div>

      {/* Author */}
      {author && (
        <div className="ud-shot-author">
          <div className="ud-shot-author-dot"
            style={{ background: FALLBACK_COLORS[(shot.authorId || idx) % FALLBACK_COLORS.length] }}>
            {author.charAt(0).toUpperCase()}
          </div>
          <span>{author}</span>
          {badge === "pro"     && <span className="ud-badge ud-badge-pro">PRO</span>}
          {badge === "proplus" && <span className="ud-badge ud-badge-proplus">PRO+</span>}
        </div>
      )}
    </div>
  );
}

/* ── LOADING SKELETON ── */
function SkeletonGrid() {
  return (
    <div className="ud-shots-grid">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="ud-skeleton-card">
          <div className="ud-skeleton-thumb" />
          <div className="ud-skeleton-line" />
          <div className="ud-skeleton-line ud-skeleton-line--short" />
        </div>
      ))}
    </div>
  );
}

/* ── EMPTY STATE ── */
function EmptyState({ icon, title, text }) {
  return (
    <div className="ud-empty">
      <div className="ud-empty-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      <Link to="/" className="ud-btn-dark">Browse Shots</Link>
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN USER DASHBOARD
═══════════════════════════════════════ */
export default function UserDashboard({ user }) {
  const navigate = useNavigate();

  const [activeTab,     setActiveTab]     = useState("liked");
  const [likedShots,    setLikedShots]    = useState([]);
  const [savedShots,    setSavedShots]    = useState([]);
  const [loadingLiked,  setLoadingLiked]  = useState(false);
  const [loadingSaved,  setLoadingSaved]  = useState(false);
  const [errorMsg,      setErrorMsg]      = useState("");

  /* ── Redirect if not logged in ── */
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  /* ── Fetch from backend ── */
  const fetchLiked = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token || !user) return;

    setLoadingLiked(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${BASE}/api/likes/me/shots`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        setErrorMsg("Session expired. Please log in again.");
        setLikedShots([]);
        return;
      }
      if (!res.ok) {
        setErrorMsg(`Server error ${res.status}. Check backend is running.`);
        setLikedShots([]);
        return;
      }

      const data = await res.json();
      console.log("Liked shots response:", data); // debug
      setLikedShots(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchLiked error:", err);
      setErrorMsg("Cannot connect to backend (localhost:8080). Is the server running?");
      setLikedShots([]);
    } finally {
      setLoadingLiked(false);
    }
  }, [user]);

  const fetchSaved = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token || !user) return;

    setLoadingSaved(true);

    try {
      const res = await fetch(`${BASE}/api/saves/me/shots`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        setSavedShots([]);
        return;
      }

      const data = await res.json();
      console.log("Saved shots response:", data); // debug
      setSavedShots(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchSaved error:", err);
      setSavedShots([]);
    } finally {
      setLoadingSaved(false);
    }
  }, [user]);

  /* ── Fetch both on mount ── */
  useEffect(() => {
    if (user) {
      fetchLiked();
      fetchSaved();
    }
  }, [user, fetchLiked, fetchSaved]);

  if (!user) return null;

  const initials = user.name
    ?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "U";

  return (
    <div className="ud-page">
      <div className="ud-container">

        {/* ── PROFILE HEADER ── */}
        <div className="ud-profile-header">

          {/* Avatar */}
          <div className="ud-avatar-wrap">
            <div className="ud-avatar">
              {user.avatarUrl
                ? <img src={user.avatarUrl} alt={user.name} />
                : <span>{initials}</span>
              }
            </div>
          </div>

          {/* Info */}
          <div className="ud-profile-info">
            <div className="ud-profile-top">
              <h1 className="ud-profile-name">{user.name}</h1>
              {user.role === "ADMIN" && (
                <span className="ud-admin-badge"><AdminIcon /> Admin</span>
              )}
            </div>
            <div className="ud-profile-email">{user.email}</div>
            {user.location && (
              <div className="ud-profile-location"><LocationIcon /> {user.location}</div>
            )}
            <div className="ud-profile-actions">
              <Link to="/profile/edit" className="ud-btn-outline"><EditIcon /> Edit Profile</Link>
              {user.role === "ADMIN" && (
                <Link to="/admin" className="ud-btn-pink">Admin Panel</Link>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="ud-stats-row">
            <StatCard label="Liked Shots"   value={likedShots.length} color="#ea4c89" icon={<HeartIcon filled />} />
            <StatCard label="Saved Shots"   value={savedShots.length} color="#0d0d0d" icon={<BookmarkIcon filled />} />
            <StatCard label="Profile Views" value="—"                 color="#6366f1" icon={<EyeIcon />} />
          </div>
        </div>

        {/* ── ERROR BANNER ── */}
        {errorMsg && (
          <div className="ud-error-banner">
            ⚠️ {errorMsg}
            <button className="ud-error-retry" onClick={() => { fetchLiked(); fetchSaved(); }}>
              Retry
            </button>
          </div>
        )}

        {/* ── TABS ── */}
        <div className="ud-tabs">
          {[
            { key: "liked",   label: "Liked Shots",  count: likedShots.length },
            { key: "saved",   label: "Saved Shots",  count: savedShots.length },
            { key: "account", label: "Account Info", count: null },
          ].map(tab => (
            <button
              key={tab.key}
              className={`ud-tab ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}>
              {tab.label}
              {tab.count !== null && (
                <span className="ud-tab-count">{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* ── LIKED SHOTS TAB ── */}
        {activeTab === "liked" && (
          <div className="ud-section">
            <div className="ud-section-header">
              <h2 className="ud-section-title">
                Liked Shots
                {likedShots.length > 0 && (
                  <span className="ud-section-count">{likedShots.length}</span>
                )}
              </h2>
              <button className="ud-refresh-btn" onClick={fetchLiked} disabled={loadingLiked}>
                {loadingLiked ? "Loading…" : "↻ Refresh"}
              </button>
            </div>

            {loadingLiked ? (
              <SkeletonGrid />
            ) : likedShots.length === 0 ? (
              <EmptyState
                icon={<HeartIcon />}
                title="No liked shots yet"
                text='Go to the homepage, hover a card, and click the ❤️ button to like shots.'
              />
            ) : (
              <div className="ud-shots-grid">
                {likedShots.map((shot, i) => (
                  <ShotCard
                    key={shot.id ?? shot.shotId ?? i}
                    shot={shot}
                    idx={i}
                    type="liked"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── SAVED SHOTS TAB ── */}
        {activeTab === "saved" && (
          <div className="ud-section">
            <div className="ud-section-header">
              <h2 className="ud-section-title">
                Saved Shots
                {savedShots.length > 0 && (
                  <span className="ud-section-count">{savedShots.length}</span>
                )}
              </h2>
              <button className="ud-refresh-btn" onClick={fetchSaved} disabled={loadingSaved}>
                {loadingSaved ? "Loading…" : "↻ Refresh"}
              </button>
            </div>

            {loadingSaved ? (
              <SkeletonGrid />
            ) : savedShots.length === 0 ? (
              <EmptyState
                icon={<BookmarkIcon />}
                title="No saved shots yet"
                text='Hover a card and click the 🔖 bookmark button to save shots here.'
              />
            ) : (
              <div className="ud-shots-grid">
                {savedShots.map((shot, i) => (
                  <ShotCard
                    key={shot.id ?? shot.shotId ?? i}
                    shot={shot}
                    idx={i}
                    type="saved"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── ACCOUNT INFO TAB ── */}
        {activeTab === "account" && (
          <div className="ud-section">
            <div className="ud-account-card">
              <h3 className="ud-account-title">Account Details</h3>
              <div className="ud-account-rows">
                {[
                  { label: "Full Name",    value: user.name      || "—" },
                  { label: "Email",        value: user.email },
                  { label: "Location",     value: user.location  || "Not set" },
                  { label: "Role",         isRole: true },
                  { label: "Member Since", value: user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" })
                    : "—"
                  },
                ].map(row => (
                  <div key={row.label} className="ud-account-row">
                    <span className="ud-account-label">{row.label}</span>
                    {row.isRole ? (
                      <span className={`ud-role-badge ${user.role === "ADMIN" ? "admin" : "user"}`}>
                        {user.role || "USER"}
                      </span>
                    ) : (
                      <span className="ud-account-value">{row.value}</span>
                    )}
                  </div>
                ))}
              </div>
              <Link to="/profile/edit" className="ud-btn-outline" style={{ marginTop: 20 }}>
                <EditIcon /> Edit Profile
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}