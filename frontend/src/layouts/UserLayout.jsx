import { Outlet } from "react-router-dom";
import Navbar from "../components/LandingComponents/Navbar.jsx";

export default function UserLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
