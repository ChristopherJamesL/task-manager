import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function AuthLayout() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center">
        <Outlet />
      </div>
    </>
  );
}
