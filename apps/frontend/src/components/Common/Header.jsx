import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home, Newspaper, Building2, Sprout, Briefcase, MessageSquare,
  ShoppingBag, Calendar, User, Bell, Clock, CheckCircle
} from "lucide-react";
import { socket } from "../../Socket/socket";

export default function Header({ currentModule, onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notificationRef = useRef(null);

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

  // Map notification types to icons
  const getIconForType = (type) => {
    const iconMap = {
      job: Briefcase,
      agriculture: Sprout,
      grievance: MessageSquare,
      event: Calendar,
      scheme: Newspaper,
      news: Newspaper,
      marketplace: ShoppingBag,
      service: Building2,
      default: CheckCircle
    };
    return iconMap[type] || iconMap.default;
  };

  // Format time ago
  const formatTimeAgo = (date) => {
    const now = new Date();
    const notifDate = new Date(date);
    const diffMs = now - notifDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check user authentication
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

  // Fetch initial notifications when user logs in
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("http://localhost:3000/api/notifications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          // Use data.data to match your backend response structure
          setNotifications(data.data || []);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (user) {
      fetchNotifications();
    }
  }, [user]);

  // Socket.IO real-time notifications
  useEffect(() => {
    if (!user) return;

    console.log("🔔 Setting up notification listener...");

    // Listen for new notifications
    const handleNewNotification = (notification) => {
      console.log("📩 New notification received:", notification);

      // Add to the beginning of notifications array
      setNotifications(prev => [notification, ...prev]);

      // Browser notification
      if (Notification.permission === "granted") {
        new Notification(notification.title, {
          body: notification.message,
          icon: "/favicon.ico",
        });
      }
    };

    socket.on("notification:new", handleNewNotification);

    // Request browser notification permission
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    // Cleanup
    return () => {
      socket.off("notification:new", handleNewNotification);
    };
  }, [user]);

  const handleNavigate = (item) => {
    onNavigate?.(item.id);
    navigate(item.path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/VillageLogin");
  };

  const handleNotificationClick = async (notification) => {
    setShowNotifications(false);

    // Mark notification as read
    if (!notification.isRead) {
      try {
        const token = localStorage.getItem("token");
        await fetch(`http://localhost:3000/api/notifications/${notification._id}/read`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        // Update local state
        setNotifications(prev =>
          prev.map(notif =>
            notif._id === notification._id ? { ...notif, isRead: true } : notif
          )
        );
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    }

    // Navigate to the path from notification
    if (notification.path) {
      navigate(notification.path);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Mark each unread notification as read using your existing endpoint
      const unreadNotifications = notifications.filter(n => !n.isRead);
      
      await Promise.all(
        unreadNotifications.map(notification =>
          fetch(`http://localhost:3000/api/notifications/${notification._id}/read`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
        )
      );

      setNotifications(prev =>
        prev.map(notif => ({ ...notif, isRead: true }))
      );
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
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
                {/* Notification Bell */}
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center hover:bg-orange-200 transition"
                  >
                    <Bell className="w-5 h-5 text-orange-600" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notification Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                      {/* Header */}
                      <div className="bg-[#fe640b] px-4 py-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-white font-semibold">Notifications</h3>
                            <p className="text-white/80 text-xs">{unreadCount} unread notifications</p>
                          </div>
                          {unreadCount > 0 && (
                            <button
                              onClick={markAllAsRead}
                              className="text-xs text-white/90 hover:text-white underline"
                            >
                              Mark all read
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Notification List */}
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center text-gray-500">
                            <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                            <p>No notifications yet</p>
                          </div>
                        ) : (
                          notifications.map((notification) => {
                            const NotifIcon = getIconForType(notification.type);
                            return (
                              <div
                                key={notification._id}
                                onClick={() => handleNotificationClick(notification)}
                                className={`px-4 py-3 border-b border-gray-100 hover:bg-orange-50 cursor-pointer transition-colors ${
                                  !notification.isRead ? 'bg-orange-50/50' : ''
                                }`}
                              >
                                <div className="flex gap-3">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    !notification.isRead ? 'bg-orange-100' : 'bg-gray-100'
                                  }`}>
                                    <NotifIcon className={`w-5 h-5 ${
                                      !notification.isRead ? 'text-orange-600' : 'text-gray-500'
                                    }`} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                      <p className={`text-sm font-medium ${
                                        !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                                      }`}>
                                        {notification.title}
                                      </p>
                                      {!notification.isRead && (
                                        <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-1"></div>
                                      )}
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1 line-clamp-2 text-left">
                                      {notification.message}
                                    </p>
                                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                                      <Clock className="w-3 h-3" />
                                      <span>{formatTimeAgo(notification.createdAt)}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* Footer */}
                      {notifications.length > 0 && (
                        <div className="bg-gray-50 px-4 py-2 text-center border-t border-gray-100">
                          <button
                            onClick={() => {
                              setShowNotifications(false);
                              navigate('/notifications');
                            }}
                            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                          >
                            View All Notifications
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

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