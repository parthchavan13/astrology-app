// // src/routes/userRoutes.jsx
// import { Routes, Route, Navigate } from "react-router-dom";

// import Home from "../pages/LandingPage/Home.jsx";
// import Login from "../pages/LandingPage/Login.jsx";
// import Signup from "../pages/LandingPage/Signup.jsx";
// import Pandits from "../pages/LandingPage/Pandits.jsx";

// import HomeUser from "../pages/UserPage/HomeUser.jsx";
// import ChatUser from "../pages/UserPage/ChatUser.jsx";

// const UserRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/pandit" element={<Pandits />} />

//       <Route path="/user/home" element={<HomeUser />} />
//       <Route path="/user/chat" element={<ChatUser />} />

//       {/* IMPORTANT: accept /user/:id which your login navigates to */}
//       <Route path="/user/:id" element={<HomeUser />} />

//       {/* Fallback: redirect unknown user routes to home (prevents "No routes matched") */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// };

// export default UserRoutes;

import { Routes, Route } from "react-router-dom";

import Login from "../pages/LandingPage/Login.jsx";
import Signup from "../pages/LandingPage/Signup.jsx";
import HomeUser from "../pages/UserPage/HomeUser.jsx";

import ProtectedUser from "./ProtectedUser.jsx";
import UserLayout from "../layouts/UserLayout.jsx";

export default function UserRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Signup />} />

      {/* Protected */}
      <Route element={<ProtectedUser />}>
        <Route element={<UserLayout />}>
          <Route path="home" element={<HomeUser />} />
        </Route>
      </Route>
    </Routes>
  );
}
