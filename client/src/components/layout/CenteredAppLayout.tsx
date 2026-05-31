import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function CenteredAppLayout() {
  return (
    <>
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 py-6">
        <Outlet />
      </main>
    </>
  );
}
