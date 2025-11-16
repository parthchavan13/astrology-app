import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedPandit() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  console.log("🟣 ProtectedPandit:", { token, role });

  if (!token || role !== "pandit") {
    console.log("❗ ProtectedPandit redirect (NO TOKEN)");
    console.log("❗ ProtectedPandit redirect (WRONG ROLE:", role, ")");
    return <Navigate to="/pandit/login" replace />;
  }
  console.log("🟢 ProtectedPandit ALLOW");
  return <Outlet />;
}
