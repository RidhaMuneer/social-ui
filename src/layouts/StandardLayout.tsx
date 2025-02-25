// components
import Navbar from "@/components/navbar/Navbar";

// router
import { Outlet } from "react-router-dom";

export default function StandardLayout() {
  return (
    <main className="flex flex-col w-full h-full mt-12">
        <Navbar />
        <Outlet />
    </main>
  );
}
