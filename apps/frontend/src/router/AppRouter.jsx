import {Route, Routes} from 'react-router-dom';
import React from 'react';
import MainLayout from '../layouts/Mainlayout';
import HomePage from '../pages/Home/HomePage';
import Marketplace from '../pages/Marketplace/Marketplace';
import News from '../pages/News/News';
import Service from '../pages/Service/Service';
import Job from '../pages/Job/Job';
import Event from '../pages/Events/Event';
import Grievance from '../pages/Grievance/Grievance';
import Agriculture from '../pages/Agriculture/Agriculture';
import Admin from '../pages/Admin/Admin';
import VillageLogin from '../pages/Login/Login';
import Login from '../pages/Login/Login';
import ForgotPassword from '../pages/ForgotReset/ForgotPassword';
import ResetPassword from '../pages/ForgotReset/ResetPassword';
import Register from '../pages/Register/Register';

const AppRouter = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/news" element={<News />} />
        <Route path="/service" element={<Service />} />
        <Route path="/job" element={<Job />} />
        <Route path="/events" element={<Event />} />
        <Route path ="/Grievance" element={<Grievance />} />
        <Route path='/Agriculture' element={<Agriculture />} />
        <Route path="/AdminDashboard" element={<Admin/>} />
        <Route path="/VillageLogin" element={<Login/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:token" element={<ResetPassword/>} />
        <Route path="/VillageRegister" element={<Register/>} />
      </Routes>
    </MainLayout>
  );
};

export default AppRouter;