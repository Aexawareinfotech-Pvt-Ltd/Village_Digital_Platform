import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/Mainlayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

/* USER PAGES */
import Login from "../pages/User/Login/Login";
import Register from "../pages/User/Register/Register";
import ForgotPassword from "../pages/User/ForgotReset/ForgotPassword";
import ResetPassword from "../pages/User/ForgotReset/ResetPassword";
import UserDashboard from "../pages/User/UserDashboard/User";

import Marketplace from "../pages/User/Marketplace/Marketplace";
import News from "../pages/User/News/News";
import Service from "../pages/User/Service/Service";
import Job from "../pages/User/Job/Job";
import Event from "../pages/User/Events/Event";
import Grievance from "../pages/User/Grievance/Grievance";
import Agriculture from "../pages/User/Agriculture/Agriculture";

/* ADMIN PAGES */
import AdminDashboard from "../pages/Admin/AdminDashboard/Admin";
import JobAdminPage from "../pages/Admin/Job/JobAdminPage";
import NewsAdminPage from "../pages/Admin/News/NewsAdminPage";
import GrievanceAdminPage from "../pages/Admin/Grievance/GrievanceAdminPage";
import MarketplaceAdminPage from "../pages/Admin/Marketplace/MarketplaceAdminPage";
import LocalServicesAdminPage from "../pages/Admin/LocalServices/LocalServicesAdminPage";
import AgricultureAdminPage from "../pages/Admin/Agriculture/AgrlicultureAdminPage";
import UserProfile from "../pages/User/Profile/UserProfile";
import EventAdminPage from "../pages/Admin/Event/EventAdminPage";

const AppRouter = () => {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}
      <Route element={<MainLayout />}>
      <Route path="/" element={<UserDashboard />} />
      </Route>

      {/* AUTH */}
      
        <Route path="/VillageLogin" element={<Login />} />
        <Route path="/VillageRegister" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/UserProfile" element={<UserProfile/>}/>
      

      {/* ================= USER PROTECTED ROUTES ================= */}
      <Route element={<ProtectedRoute role="User" />}>
        <Route element={<MainLayout />}>
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/news" element={<News />} />
        <Route path="/Service" element={<Service />} />
        <Route path="/job" element={<Job />} />
        <Route path="/events" element={<Event />} />
        <Route path="/agriculture" element={<Agriculture />} />
        <Route path="/grievance" element={<Grievance />} />  
        </Route>
      </Route>
      
      {/* ================= ADMIN PROTECTED ROUTES ================= */}
      <Route element={<ProtectedRoute role="Admin" />}>
        <Route element={<AdminLayout />}>
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/AdminDashboard/JobManagement" element={<JobAdminPage />} />
          <Route path="/AdminDashboard/NewsManagement" element={<NewsAdminPage />} />
          <Route path="/AdminDashboard/GrievanceManagement" element={<GrievanceAdminPage />} />
          <Route path="/AdminDashboard/MarketplaceManagement" element={<MarketplaceAdminPage />} />
          <Route path="/AdminDashboard/ServiceManagement" element={<LocalServicesAdminPage />} />
          <Route path="/AdminDashboard/AgricultureManagement" element={<AgricultureAdminPage />} />
          <Route path="/AdminDashboard/EventManagement" element={<EventAdminPage />} />
        </Route>
      </Route>

    </Routes>
  );
};

export default AppRouter;
