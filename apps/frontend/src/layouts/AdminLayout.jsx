import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Common/Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      
      <Sidebar />
      <main className="flex-1 bg-[#eff1f5] overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

