import { Outlet } from "react-router-dom";
import Header from "../components/Common/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="px-4 py-6 bg-gray-50">
        <Outlet />   {/* 🔥 REQUIRED FOR ROUTER V6 */}
      </main>
    </>
  );
};

export default MainLayout;
