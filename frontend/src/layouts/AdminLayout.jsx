import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminComponents/Sidebar.jsx";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
