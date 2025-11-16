// src/pages/Admin/ManagePandits.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const ManagePandits = () => {
  const [pendingPandits, setPendingPandits] = useState([]);

  useEffect(() => {
    const fetchPandits = async () => {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("/api/admin/pandit-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingPandits(res.data);
    };
    fetchPandits();
  }, []);

  const approvePandit = async (id) => {
    const token = localStorage.getItem("adminToken");
    await axios.post(`/api/admin/approve-pandit/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPendingPandits(pendingPandits.filter((p) => p._id !== id));
  };

  const rejectPandit = async (id) => {
    const token = localStorage.getItem("adminToken");
    await axios.post(`/api/admin/reject-pandit/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPendingPandits(pendingPandits.filter((p) => p._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Manage Pandit Requests</h1>
        <div className="grid gap-4">
          {pendingPandits.map((pandit) => (
            <div
              key={pandit._id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold text-lg">{pandit.name}</h2>
                <p>{pandit.email}</p>
                <p>{pandit.languages.join(", ")}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => approvePandit(pandit._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Approve
                </button>
                <button
                  onClick={() => rejectPandit(pandit._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagePandits;
