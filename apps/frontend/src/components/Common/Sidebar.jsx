import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Newspaper, 
  Building2, 
  Sprout, 
  Briefcase, 
  MessageSquare, 
  Store, 
  CalendarDays, 
  Users, 
  Home,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Power
} from "lucide-react";

const navigationItems = [
  {
    name: "Dashboard",
    icon: Home,
    color: "#fe640b",
    path: "/AdminDashboard"
  },
  {
    name: "News & Announcements",
    icon: Newspaper,
    color: "#fe640b",
    path: "/AdminDashboard/NewsManagement"
  },
  {
    name: "Local Services Directory",
    icon: Building2,
    color: "#fe640b",
    path: "/AdminDashboard/ServiceManagement"
  },
  {
    name: "Agriculture & Farmer Support",
    icon: Sprout,
    color: "#fe640b",
    path: "/AdminDashboard/AgricultureManagement"
  },
  {
    name: "Job Portal & Skill Development",
    icon: Briefcase,
    color: "#fe640b",
    path: "/AdminDashboard/JobManagement"
  },
  {
    name: "Grievance & Feedback",
    icon: MessageSquare,
    color: "#fe640b",
    path: "/AdminDashboard/GrievanceManagement"
  },
  {
    name: "Local Marketplace",
    icon: Store,
    color: "#fe640b",
    path: "/AdminDashboard/MarketplaceManagement"
  },
  {
    name: "Events & Community Calendar",
    icon: CalendarDays,
    color: "#fe640b",
    path: "/AdminDashboard/EventManagement"
  },
  {
    name: "Users & Roles",
    icon: Users,
    color: "#fe640b",
    path: "/AdminDashboard/UserManagement"
  },
];

export function Sidebar({ activeSection, onSectionChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      // redirect (adjust if you use router)
      window.location.href = "/VillageLogin";
    }
  };

  return (
    <aside 
      className={`bg-white border-r border-[#dce0e8] shadow-lg flex flex-col h-full transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-74'
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b border-[#dce0e8] flex-shrink-0 relative">
        {!isCollapsed && (
          <>
            <h1 className="text-[#fe640b]">Village Admin Panel</h1>
            <p className="text-[#6c6f85] mt-1">Manage your village services</p>
          </>
        )}
        
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={`absolute top-6 bg-[#fe640b] text-white p-2 rounded-full hover:bg-[#ff8c42] transition-all shadow-lg ${
            isCollapsed ? 'left-1/2 -translate-x-1/2' : 'right-4'
          }`}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="p-4 flex-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.name}
              onClick={() => {
                onSectionChange?.(item.name);
                navigate(item.path);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                isActive 
                  ? "shadow-md transform scale-[1.02]" 
                  : "hover:bg-[#e6e9ef]"
              } ${isCollapsed ? 'justify-center' : ''}`}
              style={{
                backgroundColor: isActive ? item.color : "transparent",
                color: isActive ? "#ffffff" : "#4c4f69",
              }}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="text-left whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.name}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Unique Logout Button */}
      <div className="p-4 flex-shrink-0 mb-5">
        <button
  onClick={handleLogout}
  className={`group w-full relative overflow-hidden rounded-2xl transition-all duration-300 ${
    isCollapsed ? "p-4" : "p-4"
  }`}
  title={isCollapsed ? "Logout" : undefined}
>
  {/* Gradient background */}
  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-[#ff6b35] to-orange-500 opacity-100 group-hover:opacity-90 transition-opacity"></div>
  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-[#ff8c42] to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

  {/* Shine effect */}
  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

  {/* Content */}
  <div
    className={`relative flex items-center gap-3 text-white ${
      isCollapsed ? "justify-center" : ""
    }`}
  >
    <div className="relative">
      <Power className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />

      {/* Pulsing ring */}
      <div className="absolute inset-0 -m-1 rounded-full border-2 border-white/40 animate-ping opacity-0 group-hover:opacity-100"></div>
    </div>

    {!isCollapsed && (
      <div className="flex flex-col items-start">
        <span className="font-semibold text-sm">Logout</span>
      </div>
    )}

    {!isCollapsed && (
      <LogOut className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
    )}
  </div>
</button>

      </div>
    </aside>
  );
}
