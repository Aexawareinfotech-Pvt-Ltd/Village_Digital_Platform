import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Common/Header";
import { Footer } from "../components/Common/Footer";
const MainLayout = () => {
  const location = useLocation();
  const hideHeader = location.pathname === "/";

  return (
    <>
      {!hideHeader && <Header />}

      <main className="px-4 py-6 bg-gray-50">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;