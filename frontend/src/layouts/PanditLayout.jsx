import { Outlet } from "react-router-dom";
import PanditNavbar from "../components/PanditComponents/PanditNavbar.jsx";

export default function PanditLayout() {
  return (
    <>
      <PanditNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
