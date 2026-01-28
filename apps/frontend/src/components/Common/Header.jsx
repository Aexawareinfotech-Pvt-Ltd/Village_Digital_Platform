import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home, Newspaper, Building2, Sprout, Briefcase, MessageSquare,
  ShoppingBag, Calendar, Phone, Menu, X, User
} from 'lucide-react';
import { LogOut } from 'lucide-react';

export default function Header({ currentModule, onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation(); 

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', path: '/' },
    { id: 'news', icon: Newspaper, label: 'News', path: '/News' },
    { id: 'services', icon: Building2, label: 'Services', path: '/Service' },
    { id: 'agriculture', icon: Sprout, label: 'Agriculture', path: '/Agriculture' },
    { id: 'jobs', icon: Briefcase, label: 'Job', path: '/Job' },
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
            </div>
          </div>
        </div>
      </header>
    </>
  );
}