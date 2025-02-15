// components
import Navbar from "@/components/navbar/Navbar";

// router
import { Outlet } from "react-router-dom";

export default function StandardLayout() {
  return (
    <main className="flex w-full h-full">
        <Navbar />
        <Outlet/>
    </main>
  );
}
