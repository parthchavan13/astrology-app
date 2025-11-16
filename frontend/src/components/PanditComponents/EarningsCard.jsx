import React from "react";

export default function EarningsCard({ title, amount }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className="mt-2 text-2xl font-bold text-gray-900">₹{amount}</p>
    </div>
  );
}
