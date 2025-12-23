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
      </Routes>
    </MainLayout>
  );
};

export default AppRouter;