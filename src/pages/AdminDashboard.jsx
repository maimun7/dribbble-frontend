






import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AdminDashboard.css";
const BASE = import.meta.env.VITE_API_URL;

/* ── ICONS ── */
const IconUsers    = ()=><svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>;
const IconHeart    = ()=><svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>;
const IconBookmark = ()=><svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>;
const IconShots    = ()=><svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>;
const IconAdmin    = ()=><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>;
const IconTrash    = ()=><svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>;
const IconPromote  = ()=><svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
const IconRefresh  = ()=><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>;
const IconSearch   = ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>;
const IconBack     = ()=><svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>;
const HeartSmall   = ({filled})=><svg viewBox="0 0 16 16" fill={filled?"#ea4c89":"none"} stroke={filled?"#ea4c89":"#aaa"} strokeWidth="1.5" width="12" height="12"><path d="M8 13.7l-1-.9C3.5 9.5 1 7.3 1 4.7 1 2.6 2.6 1 4.7 1c1.2 0 2.3.5 3.3 1.4C9 1.5 10.1 1 11.3 1 13.4 1 15 2.6 15 4.7c0 2.6-2.5 4.8-6 8.1l-1 .9z"/></svg>;
const BookmarkSmall= ({filled})=><svg viewBox="0 0 16 16" fill={filled?"#0d0d0d":"none"} stroke={filled?"#0d0d0d":"#aaa"} strokeWidth="1.6" width="12" height="12"><path d="M3 2h10v12l-5-3-5 3V2z"/></svg>;

const COLORS = ["#ea4c89","#6366f1","#0ea5e9","#10b981","#f59e0b","#8b5cf6","#ef4444","#14b8a6"];

/* ── STAT CARD ── */
function StatCard({ label, value, color, icon, sub }) {
  return (
    <div className="ad-stat-card">
      <div className="ad-stat-icon" style={{ background: color+"18", color }}>{icon}</div>
      <div className="ad-stat-body">
        <div className="ad-stat-value">{value}</div>
        <div className="ad-stat-label">{label}</div>
        {sub && <div className="ad-stat-sub">{sub}</div>}
      </div>
    </div>
  );
}

/* ── SHOT MINI CARD for likes/saves ── */
function ShotMiniCard({ shot, idx, type, userName }) {
  const bg = shot.bgStyle || shot.shotBg || COLORS[idx % COLORS.length];
  const title  = shot.title  || shot.shotTitle  || `Shot #${shot.shotId}`;
  const cat    = shot.category || "";
  const likes  = shot.likeCount ?? 0;
  const views  = shot.viewCount ?? 0;
  const tsKey  = type === "liked" ? shot.likedAt : shot.savedAt;
  const tsDate = tsKey ? new Date(tsKey).toLocaleDateString() : "";

  return (
    <div className="ad-shot-mini-card">
      {/* Thumbnail */}
      <div className="ad-shot-mini-thumb" style={{ background: bg }}>
        {shot.imageUrl && (
          <img src={shot.imageUrl} alt={title} className="ad-shot-mini-img" />
        )}
        <div className="ad-shot-mini-badge">
          {type === "liked" ? <HeartSmall filled /> : <BookmarkSmall filled />}
        </div>
      </div>

      {/* Info */}
      <div className="ad-shot-mini-info">
        <span className="ad-shot-mini-title">{title}</span>
        {cat && <span className="ad-shot-mini-cat">{cat}</span>}
        <div className="ad-shot-mini-meta">
          <span>{likes} ♥</span>
          {tsDate && <span>{tsDate}</span>}
        </div>
        {userName && <span className="ad-shot-mini-user">by {userName}</span>}
      </div>
    </div>
  );
}

/* ── USER ROW ── */
function UserRow({ user, onPromote, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const initials = user.name?.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase() || "U";
  const color = COLORS[(user.id||0) % COLORS.length];

  return (
    <>
      <tr className="ad-table-row" onClick={() => setExpanded(e => !e)} style={{cursor:"pointer"}}>
        <td className="ad-td">
          <div className="ad-user-cell">
            <div className="ad-user-avatar" style={{background:color}}>{initials}</div>
            <div>
              <div className="ad-user-name">{user.name}</div>
              <div className="ad-user-email">{user.email}</div>
            </div>
          </div>
        </td>
        <td className="ad-td">
          <span className={`ad-role-badge ${user.role==="ADMIN"?"admin":"user"}`}>
            {user.role==="ADMIN"?<><IconAdmin/> Admin</>:"User"}
          </span>
        </td>
        <td className="ad-td ad-td-center">
          <span className="ad-count-badge ad-count-pink">{user.likedCount ?? 0} ♥</span>
        </td>
        <td className="ad-td ad-td-center">
          <span className="ad-count-badge ad-count-dark">{user.savedCount ?? 0} 🔖</span>
        </td>
        <td className="ad-td">
          <span className="ad-date">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</span>
        </td>
        <td className="ad-td" onClick={e => e.stopPropagation()}>
          <div className="ad-actions">
            {user.role !== "ADMIN" && (
              <button className="ad-action-btn ad-action-promote" onClick={() => onPromote(user.id)}>
                <IconPromote/> Promote
              </button>
            )}
            <button className="ad-action-btn ad-action-delete" onClick={() => onDelete(user.id)}>
              <IconTrash/>
            </button>
          </div>
        </td>
      </tr>

      {/* Expanded row — shows liked + saved shot cards */}
      {expanded && (user.likedShots?.length > 0 || user.savedShots?.length > 0) && (
        <tr className="ad-expanded-row">
          <td colSpan={6} className="ad-expanded-td">
            {user.likedShots?.length > 0 && (
              <div className="ad-expanded-section">
                <div className="ad-expanded-label">❤️ Liked Shots ({user.likedShots.length})</div>
                <div className="ad-shot-mini-grid">
                  {user.likedShots.map((s, i) => (
                    <ShotMiniCard key={s.shotId ?? i} shot={s} idx={i} type="liked" />
                  ))}
                </div>
              </div>
            )}
            {user.savedShots?.length > 0 && (
              <div className="ad-expanded-section">
                <div className="ad-expanded-label">🔖 Saved Shots ({user.savedShots.length})</div>
                <div className="ad-shot-mini-grid">
                  {user.savedShots.map((s, i) => (
                    <ShotMiniCard key={s.shotId ?? i} shot={s} idx={i} type="saved" />
                  ))}
                </div>
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
}

/* ═══════════════════════════════════════
   MAIN ADMIN DASHBOARD
═══════════════════════════════════════ */
export default function AdminDashboard({ user }) {
  const navigate = useNavigate();

  const [activeTab,      setActiveTab]      = useState("overview");
  const [users,          setUsers]          = useState([]);
  const [stats,          setStats]          = useState(null);
  const [likes,          setLikes]          = useState([]);
  const [saves,          setSaves]          = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [search,         setSearch]         = useState("");
  const [confirmDelete,  setConfirmDelete]  = useState(null);
  const [toast,          setToast]          = useState(null);

  useEffect(() => {
    if (!user)                 { navigate("/login");     return; }
    if (user.role !== "ADMIN") { navigate("/dashboard"); return; }
    fetchAll();
  }, [user]);

  const token = () => localStorage.getItem("token");

  const showToast = (msg, type="success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchAll = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token()}` };
      const [statsRes, usersRes, likesRes, savesRes] = await Promise.all([
        fetch(`${BASE}/api/admin/stats`, { headers }),
        fetch(`${BASE}/api/admin/likes`, { headers }),
        fetch(`${BASE}/api/admin/saves`, { headers }),
        fetch(`${BASE}/api/admin/users`, { headers }),
      ]);
      if (statsRes.ok) setStats(await statsRes.json());
      if (usersRes.ok) setUsers(await usersRes.json());
      if (likesRes.ok) setLikes(await likesRes.json());
      if (savesRes.ok) setSaves(await savesRes.json());
    } catch {
      /* offline mock */
      setStats({ totalUsers:4, totalShots:16, totalLikes:12, totalSaves:8 });
      setUsers([
        { id:1, name:"Admin",           email:"admin@dribbble.com",  role:"ADMIN", likedCount:3, savedCount:2, createdAt:new Date().toISOString(),
          likedShots:[
            { shotId:1, title:"Cachely Brand",    bgStyle:"#f5f5f3",                                           likeCount:58,  viewCount:4300,  category:"Branding", likedAt:new Date().toISOString() },
            { shotId:2, title:"AERON App",         bgStyle:"linear-gradient(135deg,#1a1a2e,#16213e)",          likeCount:87,  viewCount:8700,  category:"Mobile",   likedAt:new Date().toISOString() },
            { shotId:3, title:"NEKO Ramen",        bgStyle:"linear-gradient(135deg,#f5c842,#e8a020)",          likeCount:149, viewCount:5300,  category:"Branding", likedAt:new Date().toISOString() },
          ],
          savedShots:[
            { shotId:4, title:"Cultiva Brand",     bgStyle:"linear-gradient(135deg,#6ec72d,#4a9e1a)",          likeCount:127, viewCount:3600,  category:"Branding", savedAt:new Date().toISOString() },
            { shotId:5, title:"AI Dashboard",      bgStyle:"linear-gradient(135deg,#7c3aed,#4f46e5,#2563eb)", likeCount:211, viewCount:9200,  category:"Product Design", savedAt:new Date().toISOString() },
          ]
        },
        { id:2, name:"Jeroen van Eerden",email:"jeroen@example.com", role:"USER",  likedCount:4, savedCount:2, createdAt:new Date().toISOString(),
          likedShots:[
            { shotId:6, title:"Mobile Banking",    bgStyle:"linear-gradient(135deg,#0f172a,#1e293b)",          likeCount:312, viewCount:12400, category:"Mobile",   likedAt:new Date().toISOString() },
            { shotId:7, title:"Food Branding",     bgStyle:"linear-gradient(135deg,#f59e0b,#d97706)",          likeCount:176, viewCount:7400,  category:"Branding", likedAt:new Date().toISOString() },
          ],
          savedShots:[]
        },
      ]);
      setLikes([
        { likeId:1, userName:"Admin",  userEmail:"admin@dribbble.com", shotId:1, shotTitle:"Cachely Brand", shotBg:"#f5f5f3", category:"Branding", likedAt:new Date().toISOString() },
        { likeId:2, userName:"Jeroen", userEmail:"jeroen@example.com", shotId:2, shotTitle:"AERON App",     shotBg:"linear-gradient(135deg,#1a1a2e,#16213e)", category:"Mobile", likedAt:new Date().toISOString() },
      ]);
      setSaves([
        { saveId:1, userName:"Admin",  userEmail:"admin@dribbble.com", shotId:4, shotTitle:"Cultiva Brand", shotBg:"linear-gradient(135deg,#6ec72d,#4a9e1a)", category:"Branding", savedAt:new Date().toISOString() },
      ]);
    }
    setLoading(false);
  };

  const handlePromote = async (userId) => {
    try {
      const res = await fetch(`${BASE}/api/admin/users/${userId}/promote`, {
        method:"PUT", headers:{ Authorization:`Bearer ${token()}` }
      });
      if (res.ok) {
        setUsers(prev => prev.map(u => u.id===userId ? {...u, role:"ADMIN"} : u));
        showToast("User promoted to Admin ✓");
      }
    } catch { showToast("Could not promote user", "error"); }
  };

  const handleDelete = (userId) => setConfirmDelete(userId);

  const confirmDeleteUser = async () => {
    const userId = confirmDelete;
    setConfirmDelete(null);
    try {
      const res = await fetch(`${BASE}/api/admin/users/${userId}`, {
        method:"DELETE", headers:{ Authorization:`Bearer ${token()}` }
      });
      if (res.ok) {
        setUsers(prev => prev.filter(u => u.id !== userId));
        showToast("User deleted ✓");
      }
    } catch { showToast("Could not delete user", "error"); }
  };

  const filteredUsers = users.filter(u =>
    !search ||
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (!user || user.role !== "ADMIN") return null;

  return (
    <div className="ad-page">

      {/* Toast */}
      {toast && (
        <div className={`ad-toast ${toast.type==="error" ? "ad-toast--error" : ""}`}>
          {toast.msg}
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="ad-modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="ad-modal" onClick={e => e.stopPropagation()}>
            <div className="ad-modal-icon">⚠️</div>
            <h3>Delete User?</h3>
            <p>This will permanently delete the user and all their likes and saves.</p>
            <div className="ad-modal-btns">
              <button className="ad-modal-btn-delete" onClick={confirmDeleteUser}>Yes, Delete</button>
              <button className="ad-modal-btn-cancel" onClick={() => setConfirmDelete(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="ad-container">

        {/* Header */}
        <div className="ad-header">
          <div>
            <div className="ad-header-breadcrumb">
              <Link to="/" className="ad-breadcrumb-link">Home</Link>
              <span>›</span><span>Admin Panel</span>
            </div>
            <h1 className="ad-header-title"><IconAdmin /> Admin Dashboard</h1>
            <p className="ad-header-sub">Manage users, liked shots, saved shots, and platform activity.</p>
          </div>
          <div className="ad-header-actions">
            <button className="ad-btn-refresh" onClick={fetchAll} disabled={loading}>
              <IconRefresh /> {loading ? "Loading…" : "Refresh"}
            </button>
            <Link to="/dashboard" className="ad-btn-back"><IconBack /> My Profile</Link>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="ad-stats-grid">
            <StatCard label="Total Users"  value={stats.totalUsers}  color="#6366f1" icon={<IconUsers/>}    sub="Registered accounts" />
            <StatCard label="Total Shots"  value={stats.totalShots}  color="#0ea5e9" icon={<IconShots/>}    sub="Design shots" />
            <StatCard label="Total Likes"  value={stats.totalLikes}  color="#ea4c89" icon={<IconHeart/>}    sub="Across all shots" />
            <StatCard label="Total Saves"  value={stats.totalSaves}  color="#10b981" icon={<IconBookmark/>} sub="Bookmarked shots" />
          </div>
        )}

        {/* Tabs */}
        <div className="ad-tabs">
          {[
            { key:"overview", label:"Overview" },
            { key:"users",    label:`Users (${users.length})` },
            { key:"likes",    label:`Likes (${likes.length})` },
            { key:"saves",    label:`Saves (${saves.length})` },
          ].map(tab => (
            <button key={tab.key} className={`ad-tab ${activeTab===tab.key?"active":""}`} onClick={()=>setActiveTab(tab.key)}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <div className="ad-section">
            <h2 className="ad-section-title">Recent Users</h2>
            {loading ? <div className="ad-loading">Loading…</div> : (
              <div className="ad-overview-users">
                {users.slice(0,6).map(u => {
                  const initials = u.name?.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase() || "U";
                  const color = COLORS[(u.id||0) % COLORS.length];
                  return (
                    <div key={u.id} className="ad-overview-user-row">
                      <div className="ad-user-avatar" style={{background:color,width:36,height:36,fontSize:13}}>{initials}</div>
                      <div className="ad-overview-user-info">
                        <span className="ad-user-name">{u.name}</span>
                        <span className="ad-user-email">{u.email}</span>
                      </div>
                      <span className={`ad-role-badge ${u.role==="ADMIN"?"admin":"user"}`}>{u.role}</span>
                      <span className="ad-count-badge ad-count-pink">{u.likedCount??0} ♥</span>
                      <span className="ad-count-badge ad-count-dark">{u.savedCount??0} 🔖</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── USERS TABLE ── */}
        {activeTab === "users" && (
          <div className="ad-section">
            <div className="ad-section-toolbar">
              <h2 className="ad-section-title">All Users</h2>
              <div className="ad-search-wrap">
                <IconSearch/>
                <input type="text" className="ad-search-input" placeholder="Search by name or email…"
                  value={search} onChange={e=>setSearch(e.target.value)} />
              </div>
            </div>
            <p className="ad-table-hint">Click on a row to expand liked &amp; saved shots</p>
            {loading ? <div className="ad-loading">Loading users…</div> : (
              <div className="ad-table-wrap">
                <table className="ad-table">
                  <thead>
                    <tr>
                      <th className="ad-th">User</th>
                      <th className="ad-th">Role</th>
                      <th className="ad-th ad-th-center">Likes</th>
                      <th className="ad-th ad-th-center">Saves</th>
                      <th className="ad-th">Joined</th>
                      <th className="ad-th">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(u => (
                      <UserRow key={u.id} user={u} onPromote={handlePromote} onDelete={handleDelete} />
                    ))}
                  </tbody>
                </table>
                {filteredUsers.length === 0 && (
                  <div className="ad-table-empty">No users match your search.</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── LIKES — show shot cards ── */}
        {activeTab === "likes" && (
          <div className="ad-section">
            <h2 className="ad-section-title">All Like Records — {likes.length} total</h2>
            {loading ? <div className="ad-loading">Loading…</div> : likes.length === 0 ? (
              <div className="ad-table-empty" style={{padding:"40px 0"}}>No likes yet.</div>
            ) : (
              <div className="ad-shot-full-grid">
                {likes.map((l, i) => (
                  <div key={l.likeId} className="ad-shot-full-card">
                    <div className="ad-shot-full-thumb" style={{ background: l.shotBg || COLORS[i%COLORS.length] }} />
                    <div className="ad-shot-full-info">
                      <span className="ad-shot-full-title">{l.shotTitle}</span>
                      <span className="ad-shot-full-cat">{l.category}</span>
                      <div className="ad-shot-full-user">
                        <div className="ad-shot-full-dot" style={{background: COLORS[(l.likeId||i)%COLORS.length]}}>
                          {l.userName?.charAt(0).toUpperCase()}
                        </div>
                        <span>{l.userName}</span>
                      </div>
                      <span className="ad-shot-full-date">
                        ❤️ {l.likedAt ? new Date(l.likedAt).toLocaleDateString() : "—"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── SAVES — show shot cards ── */}
        {activeTab === "saves" && (
          <div className="ad-section">
            <h2 className="ad-section-title">All Save Records — {saves.length} total</h2>
            {loading ? <div className="ad-loading">Loading…</div> : saves.length === 0 ? (
              <div className="ad-table-empty" style={{padding:"40px 0"}}>No saves yet.</div>
            ) : (
              <div className="ad-shot-full-grid">
                {saves.map((sv, i) => (
                  <div key={sv.saveId} className="ad-shot-full-card">
                    <div className="ad-shot-full-thumb" style={{ background: sv.shotBg || COLORS[i%COLORS.length] }} />
                    <div className="ad-shot-full-info">
                      <span className="ad-shot-full-title">{sv.shotTitle}</span>
                      <span className="ad-shot-full-cat">{sv.category}</span>
                      <div className="ad-shot-full-user">
                        <div className="ad-shot-full-dot" style={{background: COLORS[(sv.saveId||i)%COLORS.length]}}>
                          {sv.userName?.charAt(0).toUpperCase()}
                        </div>
                        <span>{sv.userName}</span>
                      </div>
                      <span className="ad-shot-full-date">
                        🔖 {sv.savedAt ? new Date(sv.savedAt).toLocaleDateString() : "—"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}