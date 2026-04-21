import { Outlet } from "react-router-dom";

export default function MasterAdminLayout() {
  return (
    <div className="flex h-screen">
      <main className="flex-1 bg-[#eff1f5] overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

