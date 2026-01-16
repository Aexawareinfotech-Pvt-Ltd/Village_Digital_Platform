import { Users, MessageSquare, FileText, CheckCircle, Calendar, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { ArrowRight, Clock, AlertCircle } from "lucide-react";
import { io } from "socket.io-client";
import NewsCategoryChart from "../News/NewsCategoryChart";
import GrievanceCategoryChart from "../Grievance/GrievanceCategoryChart";
import { useNavigate } from "react-router-dom";
import Stat from "../../Common/Stat";



const socket = io("http://localhost:3000");

export default function AdminDashboard({ setActiveSection }) {
  const [recentGrievances, setRecentGrievances] = useState([]);
  const [recentNews, setRecentNews] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [marketCounts, setMarketCounts] = useState({
    total: 0,
    active: 0,
    sold: 0,
    rented: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    
  });


  const [grievanceCounts, setGrievanceCounts] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    rejected: 0,
  });

  const [newsCount, setNewsCount] = useState(0);
  const [Products, setTotalProducts] = useState([]);

  /* ---------------- Fetch Grievance Counts ---------------- */
  const fetchGrievanceCounts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/grievances/count", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      setGrievanceCounts(data);
    } catch (err) {
      console.error("Grievance count error:", err);
    }
  };

  useEffect(() => {
    fetchGrievanceCounts();
    socket.on("grievance:count:update", fetchGrievanceCounts);
    return () => socket.off("grievance:count:update", fetchGrievanceCounts);
  }, []);

  /* ---------------- Fetch Marketplace Counts ---------------- */
  const fetchMarketplaceCounts = async () => {
      const res = await fetch("http://localhost:3000/api/marketplace/count", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setMarketCounts(data);
    };
  
    useEffect(() => {
      fetchMarketplaceCounts();
  
      socket.on("marketplace:count:update", fetchMarketplaceCounts);
  
      return () => {
        socket.off("marketplace:count:update", fetchMarketplaceCounts);
      };
    }, []);

  /* ---------------- Fetch News Count ---------------- */
  const fetchNewsCount = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/news/count", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      setNewsCount(Number(data.totalN) || 0);
    } catch (err) {
      console.error("News count error:", err);
    }
  };

  useEffect(() => {
    fetchNewsCount();
    socket.on("news:count:update", fetchNewsCount);
    return () => socket.off("news:count:update", fetchNewsCount);
  }, []);

  /* ---------------- Fetch Users Count ---------------- */
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/admin/stats/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed");

        const data = await res.json();
        setTotalUsers(Number(data.totalUsers) || 0);
      } catch (err) {
        console.error("User count error:", err);
      }
    };

    fetchUserCount();
  }, []);

  const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/marketplace/list",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        const data = await res.json();
        setTotalProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Admin fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);

  /* ---------------- Fetch Recent Grievances ---------------- */
  const fetchRecentGrievances = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/grievances/list", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });


      const data = await res.json();
      setLoading(false);
      
      if (Array.isArray(data)) {
        setRecentGrievances(data.slice(0, 3));
      }
    } catch (err) {
      console.error("Recent grievance error:", err);
    }
  };

  useEffect(() => {
    fetchRecentGrievances();
  }, []);

    const fetchRecentNews = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/news/list", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });

        const result = await res.json();
        setLoading(false);

        const newsArray = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
        ? result.data
        : [];

        setRecentNews(newsArray.slice(0, 3));
    } catch (err) {
        console.error("Recent news error:", err);
        setRecentNews([]);
    }
    };

    useEffect(() => {
    fetchRecentNews();
   }, []);

    const fetchRecentProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/marketplace/admin/list", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });


        const data = await res.json();
        setLoading(false);
        
        if (Array.isArray(data)) {
          setRecentProducts(data.slice(0, 3));
        }
      } catch (err) {
        console.error("Recent grievance error:", err);
      }
    };

    useEffect(() => {
      fetchRecentProducts();
    }, []);


  /* ---------------- Helpers ---------------- */
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "inProgress":
        return <AlertCircle className="w-4 h-4" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "inProgress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "resolved":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getApprovalStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getApprovalStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  }

    const getNewsStatusColor = (status) => {
    switch (status) {
        case "published":
        return "bg-green-100 text-green-700 border-green-200";
        case "draft":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
        default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
    };

    const getCategoryColor = (category) => {
    const colors = {
        Administrative: "bg-blue-100 text-blue-700",
        Health: "bg-red-100 text-red-700",
        Education: "bg-purple-100 text-purple-700",
        Infrastructure: "bg-orange-100 text-orange-700",
        Agriculture: "bg-green-100 text-green-700",
        Event: "bg-pink-100 text-pink-700",
        Emergency: "bg-red-200 text-red-800",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
    };

    



  const resolutionRate =
    grievanceCounts.total > 0
      ? ((grievanceCounts.resolved / grievanceCounts.total) * 100).toFixed(1)
      : 0;

  /* ---------------- UI ---------------- */
  return (
    <div className="text-left mb-6 px-6 pt-6">  {/* Added px-6 pt-6 here */}
        <h1 className="text-3xl font-semibold text-latte-peach">
          Dashboard Overview
        </h1>

        {loading ? (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fe640b] mx-auto mb-4"></div>
            <p className="text-[#6c6f85]">Loading products...</p>
          </div>
        </div>
      </div>
    ) : (
      <>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-6">
        <Stat title="Total Users" value={totalUsers} icon={<Users />} />
        <Stat
          title="Active Grievances"
          value={grievanceCounts.pending + grievanceCounts.inProgress}
          icon={<MessageSquare />}
        />
        <Stat
          title="Resolution Rate"
          value={`${resolutionRate}%`}
          icon={<CheckCircle />}
        />
        <Stat title="News Articles" value={newsCount} icon={<FileText />} />
        <Stat title="Total Active Products" value={marketCounts.active} icon={<ShoppingBag />} />
        <Stat title="Total Sold/Rented Products" value={marketCounts.sold + marketCounts.rented} icon={<ShoppingBag />} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <GrievanceCategoryChart />
        <NewsCategoryChart />
      </div>

      {/* Recent Grievances */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-latte-peach">
            Recent Grievances
          </h2>
          <button
            onClick={() => navigate("/AdminDashboard/GrievanceManagement")}
            className="flex items-center gap-2 text-orange-600 hover:underline"
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {recentGrievances.length > 0 ? (
          <div className="space-y-4">
            {recentGrievances.map((g) => (
              <div
                key={g._id}
                className="bg-orange-50 rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{g.subject}</p>
                  <p className="text-sm text-gray-500">{g.category}</p>
                </div>
                <span
                  className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm ${getStatusColor(
                    g.status
                  )}`}
                >
                  {getStatusIcon(g.status)}
                  {g.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No grievances found</p>
        )}
      </div>

      {/* Recent News */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-latte-peach">
            Recent News & Announcements
            </h2>
            <button
            onClick={() => navigate("/AdminDashboard/NewsManagement")}
            className="flex items-center gap-2 text-orange-600 hover:underline"
            >
            View All <ArrowRight className="w-4 h-4" />
            </button>
        </div>
        


        {recentNews.length > 0 ? (
            <div className="space-y-4">
            {recentNews.map((news) => (
                <div
                key={news._id}
                className="bg-orange-50 rounded-xl p-4 flex justify-between items-center"
                >
                <div>
                    <p className="font-medium text-gray-800">
                    {news.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                    <span
                        className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(
                        news.category
                        )}`}
                    >
                        {news.category}
                    </span>
                    <div className="flex items-center gap-4 text-[#9ca0b0] text-sm flex-wrap">
                        {news.expiryDate && (
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                            Expires:{" "}
                            {new Date(news.expiryDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                            </span>
                        </div>
                        )}
                        <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                            Created:{" "}
                            {new Date(news.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                            })}
                        </span>
                        </div>
                        </div>
                    </div>
                </div>

                <span
                    className={`px-3 py-1 rounded-full border text-sm ${getNewsStatusColor(
                    news.status
                    )}`}
                >
                    {news.status}
                </span>
                </div>
            ))}
            </div>
        ) : (
            <p className="text-sm text-gray-500">No news available</p>
        )}
        </div>

        {/* Recent Products */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-latte-peach">
            Recent Products
          </h2>
          <button
            onClick={() => navigate("/AdminDashboard/MarketplaceManagement")}
            className="flex items-center gap-2 text-orange-600 hover:underline"
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {recentProducts.length > 0 ? (
          <div className="space-y-4">
            {recentProducts.map((item) => (
              <div
                key={item._id}
                className="bg-orange-50 rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <div className="flex ">
                  <p className="text-sm text-gray-500 pr-2">{item.price} Rs</p>
                  <p className="text-sm text-gray-500">For {item.type}</p>
                  </div>
                </div>
                <span
                  className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm ${getApprovalStatusColor(
                    item.approvalStatus
                  )}`}
                >
                  {getApprovalStatusIcon(item.approvalStatus)}
                  {item.approvalStatus}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No grievances found</p>
        )}
      </div>



      </>
    )}


    </div>
  );
}