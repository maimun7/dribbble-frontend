




import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CardsFooter from "./components/CardsFooter";
import EditProfile from "./pages/EditProfile";


function HomePage({ user, onLogout, activeTab, onTabChange }) {
  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <Home activeTab={activeTab} onTabChange={onTabChange} />
      <Cards user={user} />
      <CardsFooter user={user} />
      <Footer />
    </>
  );
}

function ProtectedRoute({ user, children }) {
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AdminRoute({ user, children }) {
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "ADMIN") return <Navigate to="/dashboard" replace />;
  return children;
}

export default function App() {
  // const [user, setUser]           = useState(null);


  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });


  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) return;

  fetch("http://localhost:8080/api/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      setUser(data); // ✅ full user
      localStorage.setItem("user", JSON.stringify(data)); // overwrite old
    })
    .catch(err => {
      console.error("Failed to fetch user", err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    });
}, []);
  

  const [activeTab, setActiveTab] = useState("shots");


  console.log("APP USER:", user);

  // useEffect(() => {
  //   const stored = localStorage.getItem("user");
  //   if (stored) {
  //     try { setUser(JSON.parse(stored)); } catch { localStorage.removeItem("user"); }
  //   }
  // }, []);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (



    <div style={{ fontFamily: "'Mona Sans','Helvetica Neue',Helvetica,Arial,sans-serif", background: "#fff", minHeight: "100vh" }}>

      <Routes>
        <Route path="/" element={
          <HomePage user={user} onLogout={handleLogout} activeTab={activeTab} onTabChange={setActiveTab} />
        } />

        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />} />
        <Route path="/signup" element={user ? <Navigate to="/" replace /> : <SignUp onLogin={handleLogin} />} />

        <Route path="/dashboard" element={
          <ProtectedRoute user={user}>
            <><Navbar user={user} onLogout={handleLogout} /><UserDashboard user={user} /><Footer /></>
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <AdminRoute user={user}>
            <><Navbar user={user} onLogout={handleLogout} /><AdminDashboard user={user} /><Footer /></>
          </AdminRoute>
        } />

        {/* <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <>
                <Navbar user={user} onLogout={handleLogout} />
                <EditProfile />
                <Footer />
              </>
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <>
                <Navbar user={user} onLogout={handleLogout} />
                <EditProfile user={user} setUser={setUser} />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </div>

  );

}
