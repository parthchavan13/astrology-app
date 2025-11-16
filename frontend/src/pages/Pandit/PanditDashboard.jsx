import React, { useEffect, useState } from "react";
import { getPanditDashboard, updatePanditStatus } from "../../services/panditApi";
import EarningsCard from "../../components/PanditComponents/EarningsCard";
import StatusToggle from "../../components/PanditComponents/StatusToggle";
import TransactionItem from "../../components/PanditComponents/TransactionItem";

export default function PanditDashboard() {
  const panditId = localStorage.getItem("panditId");

  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(false);

  // Fetch Dashboard Data
  const fetchDashboard = async () => {
    try {
      const data = await getPanditDashboard(panditId);
      setDashboard(data);
      setLoading(false);
    } catch (error) {
      console.error("Dashboard error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // Handle Online/Offline toggle
  const handleStatusChange = async () => {
    if (!dashboard) return;

    const newStatus = !dashboard.profile.isOnline;
    setStatusUpdating(true);

    try {
      await updatePanditStatus(panditId, newStatus);

      // update UI
      setDashboard((prev) => ({
        ...prev,
        profile: { ...prev.profile, isOnline: newStatus },
      }));
    } catch (error) {
      console.error("Status update failed:", error);
    }

    setStatusUpdating(false);
  };

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;

  return (
    <div className="p-5 space-y-6">

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <EarningsCard title="Today's Earnings" amount={dashboard.earnings.today} />
        <EarningsCard title="Total Earnings" amount={dashboard.earnings.total} />
        <EarningsCard title="Wallet Balance" amount={dashboard.earnings.wallet} />
      </div>

      {/* PROFILE COMPLETION + STATUS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Profile Completion */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Profile Completion</h2>
          <div className="w-full bg-gray-200 rounded h-3">
            <div
              className="bg-green-500 h-3 rounded"
              style={{ width: `${dashboard.profile.completion}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {dashboard.profile.completion}% completed
          </p>
        </div>

        {/* Status Toggle */}
        <div className="bg-white shadow rounded p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Availability</h2>

          <StatusToggle
            isOnline={dashboard.profile.isOnline}
            loading={statusUpdating}
            onChange={handleStatusChange}
          />
        </div>

      </div>

      {/* REQUESTS & ACTIVE SESSIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Incoming Requests */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-3">Incoming Requests</h2>

          {dashboard.requests.length === 0 ? (
            <p className="text-gray-500">No new requests</p>
          ) : (
            dashboard.requests.map((req) => (
              <div key={req.id} className="border p-3 rounded mb-2">
                <p className="font-semibold">{req.user}</p>
                <p className="text-sm capitalize">{req.type}</p>
                <p className="text-sm text-gray-500">
                  {new Date(req.time).toLocaleString()}
                </p>

                <div className="flex gap-2 mt-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded">
                    Accept
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded">
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Active Sessions */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-3">Active Sessions</h2>

          {dashboard.activeSessions.length === 0 ? (
            <p className="text-gray-500">No active sessions</p>
          ) : (
            dashboard.activeSessions.map((sess) => (
              <div key={sess.sessionId} className="border p-3 rounded mb-2">
                <p className="font-semibold">{sess.user}</p>
                <p className="text-sm capitalize">{sess.type}</p>
                <p className="text-sm text-gray-500">
                  Started: {new Date(sess.startedAt).toLocaleString()}
                </p>

                <button className="bg-blue-500 text-white px-3 py-1 rounded mt-2">
                  Open Session
                </button>
              </div>
            ))
          )}
        </div>

      </div>

      {/* TRANSACTIONS + HISTORY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Recent Transactions */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>

          {dashboard.recentTransactions.map((txn) => (
            <TransactionItem key={txn.id} txn={txn} />
          ))}
        </div>

        {/* Recent Chat/Call History */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-3">Recent Chat/Call History</h2>

          {dashboard.recentHistory.map((h, index) => (
            <div key={index} className="border p-3 rounded mb-2">
              <p className="font-semibold">{h.user}</p>
              <p className="text-sm capitalize">{h.type}</p>
              <p className="text-sm text-gray-500">
                {h.duration} min • {new Date(h.time).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
