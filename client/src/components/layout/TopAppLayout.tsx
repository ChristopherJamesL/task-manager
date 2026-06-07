import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function AppLayout() {
  return (
    <>
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-start px-4 py-6">
        <Outlet />
      </main>
    </>
  );
}
