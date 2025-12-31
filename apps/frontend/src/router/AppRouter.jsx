import { Routes, Route } from "react-router-dom";
import React from "react";

import MainLayout from "../layouts/Mainlayout";
import AdminLayout from "../layouts/AdminLayout";

import HomePage from "../pages/User/Home/HomePage";
import Marketplace from "../pages/User/Marketplace/Marketplace";
import News from "../pages/User/News/News";
import Service from "../pages/User/Service/Service";
import Job from "../pages/User/Job/Job";
import Event from "../pages/User/Events/Event";
import Grievance from "../pages/User/Grievance/Grievance";
import Agriculture from "../pages/User/Agriculture/Agriculture";
import Login from "../pages/User/Login/Login";
import ForgotPassword from "../pages/User/ForgotReset/ForgotPassword";
import ResetPassword from "../pages/User/ForgotReset/ResetPassword";
import Register from "../pages/User/Register/Register";


import JobAdminPage from "../pages/Admin/Job/JobAdminPage";
import GrievanceAdminPage from "../pages/Admin/Grievance/GrievanceAdminPage";
import VillageLogin from "../components/Login/VillageLogin";
import NewsAdminPage from "../pages/Admin/News/NewsAdminPage";

const AppRouter = () => {
  return (
    <Routes>
      {/* ================= USER ROUTES (WITH HEADER) ================= */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/news" element={<News />} />
        <Route path="/service" element={<Service />} />
        <Route path="/job" element={<Job />} />
        <Route path="/events" element={<Event />} />
        <Route path="/Grievance" element={<Grievance />} />
        <Route path="/Agriculture" element={<Agriculture />} />
        <Route path="/VillageLogin" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/VillageRegister" element={<Register />} />
      </Route>

      {/* ================= ADMIN ROUTE (NO HEADER, ONLY SIDEBAR) ================= */}
      <Route element={<AdminLayout />}>
       <Route path="/AdminDashboard" element={<JobAdminPage />} />
       <Route path="/AdminDashboard/JobManagement" element={<JobAdminPage />} />
       <Route path="/AdminDashboard/NewsManagement" element={<NewsAdminPage />} />
       <Route path="/AdminDashboard/GrievanceManagement" element={<GrievanceAdminPage/>} />
      </Route>
      

    </Routes>
  );
};

export default AppRouter;
