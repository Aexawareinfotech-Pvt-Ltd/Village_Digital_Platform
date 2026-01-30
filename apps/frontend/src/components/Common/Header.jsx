import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home, Newspaper, Building2, Sprout, Briefcase, MessageSquare,
  ShoppingBag, Calendar, User, LogOut
} from "lucide-react";

export default function Header({ currentModule, onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/users/me", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error();

        const data = await res.json();
        setUser(data.user);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const handleNavigate = (item) => {
    onNavigate?.(item.id);
    navigate(item.path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/VillageLogin");
  };

  if (loading) return null;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="bg-orange-500 p-2 rounded-2xl">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-latte-text hidden sm:block">
              Village Management
            </h1>
          </div>

          <nav className="hidden xl:flex items-center gap-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-2xl text-sm transition-all ${
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

          <div className="flex items-center gap-3">
            {!user ? (
              <button
                onClick={() => navigate('/VillageLogin')}
                className="px-4 py-2 border border-orange-500 text-orange-500 rounded-2xl"
              >
                Login
              </button>
            ) : (
              <>
<div
  onClick={() => navigate("/UserProfile")}
  className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center cursor-pointer hover:bg-orange-200 transition"
>
  <User className="w-5 h-5 text-orange-600" />
</div>

              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
