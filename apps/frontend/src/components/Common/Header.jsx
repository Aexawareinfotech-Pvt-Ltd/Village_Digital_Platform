import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home, Newspaper, Building2, Sprout, Briefcase, MessageSquare,
  ShoppingBag, Calendar, Phone, Menu, X, User
} from 'lucide-react';
import { LogOut } from 'lucide-react';

export default function Header({ currentModule, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', path: '/Dashboard' },
    { id: 'news', icon: Newspaper, label: 'News', path: '/News' },
    { id: 'services', icon: Building2, label: 'Services', path: '/Services' },
    { id: 'agriculture', icon: Sprout, label: 'Agriculture', path: '/Agriculture' },
    { id: 'jobs', icon: Briefcase, label: 'Jobs', path: '/Jobs' },
    { id: 'grievance', icon: MessageSquare, label: 'Grievances', path: '/Grievance' },
    { id: 'marketplace', icon: ShoppingBag, label: 'Marketplace', path: '/Marketplace' },
    { id: 'events', icon: Calendar, label: 'Events', path: '/events' },

  ];

  const handleNavigate = (item) => {
    onNavigate?.(item.id); // safe call (kept for backward compatibility)
    navigate(item.path);   // 🔥 navigation
    setMobileMenuOpen(false);
  };


  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* LEFT — Static Home Icon + Title */}
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 p-2 rounded-2xl">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-latte-text hidden sm:block">Village Management</h1>
            </div>

            {/* DESKTOP MENU */}
            <nav className="hidden xl:flex items-center gap-3">
              {menuItems.slice(0, 10).map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path; // ✅ FIX
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-2xl transition-all text-sm ${
                      isActive 
                        ? 'bg-orange-500 text-white shadow-md' 
                        : 'text-gray-700 hover:bg-orange-500 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-2 sm:gap-3">

              {/* Profile Button */}
              <button
                onClick={() => navigate('/UserProfile')}
                className="p-2 rounded-full text-gray-700 hover:bg-gray-100"
              >
                <User className="w-6 h-6" />
              </button>

              {/* MOBILE TOGGLE */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-gray-200 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path; // ✅ FIX
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item)}
                    className={`flex items-center gap-2 px-3 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
              <button
                onClick={handleLogout}
                className="col-span-full flex items-center justify-center gap-2
                          px-4 py-3 bg-latte-red text-white
                          rounded-lg hover:bg-latte-maroon transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* EMERGENCY MODAL */}
      {emergencyOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setEmergencyOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="bg-red-500 p-2 rounded-lg">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Emergency</h2>
              </div>
              <button 
                onClick={() => setEmergencyOpen(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-3">
              <a 
                href="tel:100" 
                className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors"
              >
                <span className="font-medium text-gray-800">Police</span>
                <span className="font-bold text-red-600 text-lg">100</span>
              </a>

              <a 
                href="tel:108" 
                className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors"
              >
                <span className="font-medium text-gray-800">Ambulance</span>
                <span className="font-bold text-red-600 text-lg">108</span>
              </a>

              <a 
                href="tel:101" 
                className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors"
              >
                <span className="font-medium text-gray-800">Fire</span>
                <span className="font-bold text-red-600 text-lg">101</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}