import { useState } from "react";
import { Home, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate(); 
  // ✅ SCROLL FUNCTION
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">

            {/* LOGO */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => scrollToSection("home")}
            >
              <div className="bg-orange-500 p-2 rounded-2xl">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-latte-text ">
                Village Management
              </h1>
            </div>

            {/* DESKTOP NAVIGATION */}
            <nav className="flex items-center gap-6 text-sm ">
              <button onClick={() => scrollToSection("home")} className="hover:text-orange-500 cursor-pointer">
                Home
              </button>
              <button onClick={() => scrollToSection("news")} className="hover:text-orange-500 cursor-pointer">
                News
              </button>
              <button onClick={() => scrollToSection("events")} className="hover:text-orange-500 cursor-pointer">
                Events
              </button>
              <button onClick={() => scrollToSection("jobs")} className="hover:text-orange-500 cursor-pointer">
                Jobs
              </button>
              <button onClick={() => scrollToSection("marketplace")} className="hover:text-orange-500 cursor-pointer">
                Marketplace
              </button>
            </nav>

            {/* AUTH BUTTONS */}
            <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/VillageLogin")} 
              className="px-4 py-2 border border-orange-500 text-orange-500 rounded-xl"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/VillageRegister")} 
              className="px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition font-medium"
              >
              Register
            </button>
            </div>

          </div>
        </div>
      </header>

    </>
  );
}
