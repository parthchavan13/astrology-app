// // src/routes/adminRoutes.jsx
// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import AdminLoginPage from "../pages/Admin/AdminLogin.jsx";
// import AdminLayout from "../components/AdminComponents/AdminLayout.jsx";
// import Dashboard from "../pages/Admin/AdminDashboard.jsx";
// import ManagePandits from "../pages/Admin/ManagePandits.jsx";
// import ManageUsers from "../pages/Admin/ManageUsers.jsx";
// import Transactions from "../pages/Admin/Transactions.jsx";
// import Settings from "../pages/Admin/Settings.jsx";

// const AdminRoutes = () => {
//   return (
//     <Routes>
//       {/* ✅ Admin Login Route */}
//       <Route path="/admin/login" element={<AdminLoginPage />} />

//       {/* ✅ Admin Protected Layout with Nested Routes */}
//       <Route path="/admin" element={<AdminLayout />}>
//         <Route index element={<Dashboard />} />            {/* /admin */}
//         <Route path="dashboard" element={<Dashboard />} /> {/* /admin/dashboard */}
//         <Route path="pandit" element={<ManagePandits />} />
//         <Route path="users" element={<ManageUsers />} />
//         <Route path="transactions" element={<Transactions />} />
//         <Route path="settings" element={<Settings />} />
//       </Route>
//     </Routes>
//   );
// };

// export default AdminRoutes;


import { Routes, Route } from "react-router-dom";

import AdminLogin from "../pages/Admin/AdminLogin.jsx";
import Dashboard from "../pages/Admin/AdminDashboard.jsx";
import ManagePandits from "../pages/Admin/ManagePandits.jsx";
import ManageUsers from "../pages/Admin/ManageUsers.jsx";
import Transactions from "../pages/Admin/Transactions.jsx";
import Settings from "../pages/Admin/Settings.jsx";

import ProtectedAdmin from "./ProtectedAdmin.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

export default function AdminRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="login" element={<AdminLogin />} />

      {/* Protected */}
      <Route element={<ProtectedAdmin />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="pandit" element={<ManagePandits />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}
