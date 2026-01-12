import { Users, MessageSquare, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight,Clock,AlertCircle,CheckCircle } from "lucide-react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");


export default function AdminDashboard({ setActiveSection }) {
    const navigate = useNavigate();
    const [recentGrievances, setRecentGrievances] = useState([]);
    //const [pendingCount, setPendingCount] = useState(0);

    const [totalUsers, setTotalUsers] = useState(0);
    const [counts, setCounts] = useState({
        total: 0,
        pending: 0,
        inProgress: 0,
        resolved: 0,
        rejected: 0,
      });


      const fetchCounts = async () => {
          const res = await fetch("http://localhost:3000/api/grievances/count", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const data = await res.json();
          setCounts(data);
        };
      
        useEffect(() => {
          fetchCounts();
      
          socket.on("grievance:count:update", fetchCounts);
      
          return () => {
            socket.off("grievance:count:update");
          };
        }, []);

    useEffect(() => {
    const fetchUserCount = async () => {
        try {
        const res = await fetch(
            "http://localhost:3000/api/admin/stats/users",
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            }
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setTotalUsers(data.totalUsers);
        } catch (error) {
        console.error("User count error:", error);
        }
    };

    fetchUserCount();
    }, []);



  useEffect(() => {
    fetchRecentGrievances();
  }, []);

    // const fetchPendingCount = async () => {
    // const res = await fetch(
    //     "http://localhost:3000/api/grievances/list?status=pending",
    //     {
    //     headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //     }
    // );
    // const data = await res.json();
    // setPendingCount(data.length);
    // };

    // useEffect(() => {
    // fetchPendingCount();
    // fetchRecentGrievances();

    // socket.on("grievance:new", () => {
    //     fetchPendingCount();
    //     fetchRecentGrievances();
    // });

    // socket.on("grievance:update", () => {
    //     fetchPendingCount();
    //     fetchRecentGrievances();
    // });

    // return () => {
    //     socket.off("grievance:new");
    //     socket.off("grievance:update");
    // };
    // }, []);



  const fetchRecentGrievances = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/grievances/list",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setRecentGrievances(data.slice(0, 3)); // 👈 LAST 3
      }
    } catch (err) {
      console.error("Failed to fetch grievances", err);
    }
  };

  const getStatusIcon = (status) => {
      switch (status) {
        case 'pending':
          return <Clock className="w-4 h-4" />;
        case 'inProgress':
          return <AlertCircle className="w-4 h-4" />;
        case 'resolved':
          return <CheckCircle className="w-4 h-4" />;
          default:
          return null;
      }
    };

    const getStatusColor = (status) => {
      switch (status) {
        case "pending":
          return "bg-yellow-100 rounded-xl p-1 text-yellow-700 border-yellow-200";
        case "inProgress":
          return "bg-blue-100 rounded-xl p-1 text-blue-700 border-blue-200";
        case "resolved":
          return "bg-green-100 rounded-xl p-1 text-green-700 border-green-200";
        default:
          return "bg-gray-100 rounded-xl p-1 text-gray-700 border-gray-200";
      }
    };

  return (
    <div>
      <h1 className="text-2xl text-orange-600 mb-6">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Stat title="Total Users" value={totalUsers} icon={<Users />} />
        <Stat title="Active Grievances" value={counts.pending+counts.inProgress} icon={<MessageSquare />} />
        <Stat title="Resolution Rate" value={ ((counts.resolved / counts.total) * 100).toFixed(2)+"%"} icon={<CheckCircle />} />
        {/* <Stat title="News Articles" value="89" icon={<FileText />} /> */}
      </div>
      {/* Recent Grievances */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 mb-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-latte-peach ">
            Recent Grievances
          </h2>

          <button
            onClick={() => setActiveSection("Grievance & Feedback")}
            className="flex items-center gap-2 text-orange-600 hover:underline"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {recentGrievances.length > 0 ? (
          <div className="space-y-4 ">
            {recentGrievances.map((g) => (
              <div
                key={g._id}
                className=" bg-orange-100 rounded-xl p-4 text-left"
              >
                <div className="flex justify-between items-center ">
                  <div>
                    <p className="font-medium text-gray-800">
                      {g.subject}
                    </p>
                    <p className="text-sm text-gray-500">
                      {g.category}
                    </p>
                  </div>

                  <div
                        className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(
                            g.status
                        )}`}
                        >
                        {getStatusIcon(g.status)}
                        <span className="text-sm">{g.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            No grievances found
          </p>
        )}
      </div>
    </div>
  );
}
   

function Stat({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border flex justify-between border-orange-100 p-6 mb-6 mt-6">
      <div className="flex items-center mb-4 space-x-4">
        <div className="text-orange-500">{icon}</div>
      </div>
      <div className="text-right">
       <p className="text-gray-500">{title}</p>
       <h2 className="text-3xl">{value}</h2>
      </div>
    </div>
  );
}
