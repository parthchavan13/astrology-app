import React from "react";

export default function TransactionItem({ txn }) {
  return (
    <div className="border p-3 rounded mb-2">
      <p className="font-semibold">₹{txn.amount}</p>
      <p className="text-sm capitalize text-gray-700">{txn.type}</p>
      <p className="text-xs text-gray-500">
        {new Date(txn.time).toLocaleString()}
      </p>
    </div>
  );
}
