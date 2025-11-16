import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedAdmin() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
