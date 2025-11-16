import React from "react";

export default function StatusToggle({ isOnline, loading, onChange }) {
  return (
    <button
      onClick={onChange}
      disabled={loading}
      className={`
        px-4 py-2 rounded-full text-white font-medium 
        transition-all duration-200
        ${isOnline ? "bg-green-500" : "bg-gray-400"}
        ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {loading ? "Updating..." : isOnline ? "Online" : "Offline"}
    </button>
  );
}
