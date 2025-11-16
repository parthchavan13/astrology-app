import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/LandingPage/Home.jsx";

import UserRoutes from "./routes/userRoutes.jsx";
import PanditRoutes from "./routes/panditRoutes.jsx";
import AdminRoutes from "./routes/adminRoutes.jsx";

import { isTokenExpired, logout } from "./utils/auth";

export default function App() {
  useEffect(() => {
    /* =============================
         🔒 SESSION EXPIRY CHECKER
    ============================== */
    const checkSessionExpiry = () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      if (isTokenExpired()) {
        alert("Your session has expired. Please log in again.");
        logout();
      }
    };

    const expiryInterval = setInterval(checkSessionExpiry, 60 * 1000);

    /* =============================
         💤 INACTIVITY LOGOUT CHECKER
    ============================== */
    let inactivityTimer;

    const resetInactivityTimer = () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      clearTimeout(inactivityTimer);

      inactivityTimer = setTimeout(() => {
        alert("You've been inactive too long. Logging out...");
        logout();
      }, 30 * 60 * 1000); // 30 minutes
    };

    window.addEventListener("mousemove", resetInactivityTimer);
    window.addEventListener("keydown", resetInactivityTimer);
    // resetInactivityTimer();
    setTimeout(resetInactivityTimer, 2000);

    return () => {
      clearInterval(expiryInterval);
      window.removeEventListener("mousemove", resetInactivityTimer);
      window.removeEventListener("keydown", resetInactivityTimer);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<Home />} />

        {/* User / Pandit / Admin Role Routes */}
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/pandit/*" element={<PanditRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* No forced redirects to user login anymore */}
        {/* Prevents pandit getting sent to /user/login */}
        
        {/* Catch-all → send to home (safe fallback) */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}
