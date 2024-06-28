// components
import Navbar from "@/components/navbar/Navbar";
import Preview from "@/components/preview/Preview";

// router
import { Outlet } from "react-router-dom";

export default function StandardLayout() {
  return (
    <main className="flex w-full h-full">
        <Navbar />
        <Outlet/>
        <Preview/>
    </main>
  );
}
