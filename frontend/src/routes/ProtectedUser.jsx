import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedUser() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "user") {
    return <Navigate to="/user/login" replace />;
  }

  return <Outlet />;
}
