import { Routes, Route } from "react-router-dom";

import PanditLogin from "../pages/Pandit/PanditLogin.jsx";
import PanditRegister from "../pages/Pandit/PanditRegister.jsx";
import PanditDashboard from "../pages/Pandit/PanditDashboard.jsx";
import PanditWallet from "../pages/Pandit/PanditWallet.jsx";
import PanditChangePassword from "../pages/Pandit/PanditChangePassword.jsx";
// import ChatPandit from "../pages/Pandit/ChatPandit.jsx";
import ChatBox from "../pages/Pandit/Pandit_chatbox.jsx";

import ProtectedPandit from "./ProtectedPandit.jsx";
import PanditLayout from "../layouts/PanditLayout.jsx";

export default function PanditRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="login" element={<PanditLogin />} />
      <Route path="register" element={<PanditRegister />} />

      {/* Protected */}
      <Route element={<ProtectedPandit />}>
        <Route element={<PanditLayout />}>
          <Route path="dashboard" element={<PanditDashboard />} />
          <Route path="wallet" element={<PanditWallet />} />
          <Route path="changepassword" element={<PanditChangePassword />} />
          {/* <Route path="chat" element={<ChatPandit />} /> */}
          <Route path="chat/:userId" element={<ChatBox />} />
        </Route>
      </Route>
    </Routes>
  );
}
