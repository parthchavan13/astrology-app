// src/pages/Admin/AdminNavbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <h1 className="text-xl font-bold text-indigo-600">Astro Admin</h1>
      <div className="space-x-6">
        <button onClick={() => navigate("/admin/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/admin/pandit")}>Manage Pandits</button>
        <button onClick={() => navigate("/admin/payments")}>Payments</button>
        <button onClick={logout} className="text-red-500">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
