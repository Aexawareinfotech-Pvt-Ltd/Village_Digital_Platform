import React from "react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
import  Header  from "../components/Common/Header";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header/>

      <main className="min-h-screen px-4 py-6 bg-gray-50">
        {children}
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
