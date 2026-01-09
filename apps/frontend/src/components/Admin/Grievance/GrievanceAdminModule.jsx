import React, { useState, useEffect } from "react";
import {
  Users, FileText, Briefcase, Tractor, AlertCircle,
  ShoppingBag, Calendar, FileCheck, Image, TrendingUp,
  Eye, Edit, Trash2, CheckCircle, XCircle, Clock,
  Plus, Download, Search, X, Upload, MapPin,
  Feather, MessageSquare,
  Droplet
} from "lucide-react";
import { socket } from "../../../Socket/socket.js";
import GrievanceCategoryChart from "./GrievanceCategoryChart.jsx";



const GrievanceAdminModule = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    
  
    const [files, setFiles] = useState([]);
  
  
    const [grievances, setGrievances] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedGrievance, setSelectedGrievance] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    //const [pendingCount, setPendingCount] = useState(0);
    const [adminMessage, setAdminMessage] = useState("");
    const [actionStatus, setActionStatus] = useState(null);
    //const [inProgressCount,setInProgressCount] = useState(0);
    // const [grievanceCount, setGrievanceCount] = useState(0);
    // const [rejectedCount, setRejectedCount] = useState(0);
    const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    rejected: 0,

  });
  
    // const fetchPendingCount = async () => {
    //     const res = await fetch(
    //         "http://localhost:3000/api/grievances/list?status=pending",
    //         {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //         }
    //     );
    //     const data = await res.json();
    //     setPendingCount(data.length);
    //     };
    
    //     useEffect(() => {
    //     fetchPendingCount();
    //     fetchGrievances();
    
    //     socket.on("grievance:new", () => {
    //         fetchPendingCount();
    //         fetchGrievances();
    //     });
    
    //     socket.on("grievance:update", () => {
    //         fetchPendingCount();
    //         fetchGrievances();
    //     });

    //     return () => {
    //     socket.off("grievance:new");
    //     socket.off("grievance:update");
    // };
    // }, []);

    // const fetchRejectedCount = async () => {
    //     const res = await fetch(
    //         "http://localhost:3000/api/grievances/list?isRejected=true",
    //         {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //         }
    //     );
    //     const data = await res.json();
    //     setRejectedCount(data.length);
    //     };
    
    //     useEffect(() => {
    //     fetchRejectedCount();
    //     fetchGrievances();
    
    //     socket.on("grievance:new", () => {
    //         fetchRejectedCount();
    //         fetchGrievances();
    //     });
    
    //     socket.on("grievance:update", () => {
    //         fetchRejectedCount();
    //         fetchGrievances();
    //     });

    //     return () => {
    //     socket.off("grievance:new");
    //     socket.off("grievance:update");
    // };
    // }, []);

    // const fetchInProgressCount = async () => {
    //     const res = await fetch(
    //         "http://localhost:3000/api/grievances/list?status=inProgress",
    //         {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //         }
    //     );
    //     const data = await res.json();
    //     setInProgressCount(data.length);
    //     };
    
    //     useEffect(() => {
    //     fetchInProgressCount();
    //     fetchGrievances();
    
    //     socket.on("grievance:new", () => {
    //         fetchInProgressCount();
    //         fetchGrievances();
    //     });
    
    //     socket.on("grievance:update", () => {
    //         fetchInProgressCount();
    //         fetchGrievances();
    //     });

    //     return () => {
    //     socket.off("grievance:new");
    //     socket.off("grievance:update");
    // };
    // }, []);

    // const fetchGrievanceCount = async () => {
    //   try {
    //     const res = await fetch(
    //       "http://localhost:3000/api/grievances/count",
    //       {
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //       }
    //     );

    //     if (!res.ok) {
    //       throw new Error(`HTTP error! status: ${res.status}`);
    //     }

    //     const data = await res.json();
    //     setGrievanceCount(data.count);
    //   } catch (err) {
    //     console.error("Failed to fetch grievance count:", err);
    //   }
    // };

    // useEffect(() => {
    //   fetchGrievanceCount();
    //   fetchGrievances();

    //   socket.on("grievance:new", fetchGrievanceCount);
    //   socket.on("grievance:update", fetchGrievanceCount);

    //   return () => {
    //     socket.off("grievance:new", fetchGrievanceCount);
    //     socket.off("grievance:update", fetchGrievanceCount);
    //   };
    // }, []);

    
  

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



    const fetchGrievances = async () => {
    const query =
      statusFilter === "all" ? "" : `?status=${statusFilter}`;
  
    const res = await fetch(
      `http://localhost:3000/api/grievances/list${query}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  
    const data = await res.json();
    if (Array.isArray(data)) {
      setGrievances(data);
    } else {
      console.error("Invalid response from backend:", data);
      setGrievances([]);
    }
  };
  
  useEffect(() => {
    fetchGrievances();
  }, [statusFilter]);
  
  /* ---------------- Helpers ---------------- */
  const getStatusBadge = (status) => ({
    Published: "bg-latte-green/10 text-latte-green border-latte-green",
    Draft: "bg-latte-yellow/10 text-latte-yellow border-latte-yellow",
    Pending: "bg-latte-yellow text-latte-yellow border-latte-yellow",
    In_Progress: "bg-latte-blue text-latte-blue border-latte-blue",
    Resolved: "bg-latte-green text-latte-green border-latte-green",
    Active: "bg-latte-green/10 text-latte-green border-latte-green",
    Closed: "bg-latte-overlay0/10 text-latte-overlay0 border-latte-overlay0",
  }[status] || "");


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

  const filteredGrievances = grievances.filter((g) => {
    const matchesSearch =
      g.grievanceId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.category?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || g.status === statusFilter;

    return matchesSearch && matchesStatus;
  });


  const updateStatus = async (id, status, adminResponse) => {
  const endpoint =
    status === "rejected"
      ? `/api/grievances/reject/${id}`
      : `/api/grievances/update/${id}`;

  await fetch(`http://localhost:3000${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ status, adminResponse }),
  });

  fetchGrievances();
};


    // const deleteGrievance = async (id) => {
    //   await fetch(
    //       `http://localhost:3000/api/grievances/delete/${id}`,
    //       {
    //       method: "DELETE",
    //       headers: {
    //           Authorization: `Bearer ${localStorage.getItem("token")}`,
    //       },
    //       }
    //   );
    //   fetchGrievances();
    // };


return (
    <div className="p-0">
        <div className="text-left mb-6 px-6 pt-6">  {/* Added px-6 pt-6 here */}
        <h1 className="text-3xl font-semibold text-latte-peach">
          Grievance Management
        </h1>
        <p className="mt-1 text-[#6c6f85]">
          Review, update, and resolve grievances submitted by village users
        </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Stat title="Total Grievances" value={counts.total} icon={<FileText />} />
        <Stat title="Pending Grievances" value={counts.pending} icon={<MessageSquare />} />
        <Stat title="In-Progress Grievances" value={counts.inProgress} icon={<AlertCircle />} />
        <Stat title="Rejected Grievances" value={counts.rejected} icon={<XCircle/>}/>
        <Stat title="Resolved Grievances" value={counts.resolved} icon={<CheckCircle/>}/>
        
      </div>
      <div className="mt-6 "><GrievanceCategoryChart/></div>
        
        <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 mb-6 mt-6">
        {/* Search and Filter Bar */}
        <div className="p-6 border-b border-latte-surface0">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-latte-subtext0" />
              <input
                type="text"
                placeholder="Search grievances..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 hover:bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text placeholder-latte-subtext0 focus:outline-none focus:ring-2 focus:ring-latte-peach"
              />
            </div>
            <div className="flex gap-2">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach">
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="inProgress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-latte-surface0">
                <th className="text-left p-4 text-latte-subtext0">ID</th>
                <th className="text-left p-4 text-latte-subtext0">Subject</th>
                <th className="text-left p-4 text-latte-subtext0">Category</th>
                <th className="text-left p-4 text-latte-subtext0">Status</th>
                <th className="text-left p-4 text-latte-subtext0">Date</th>
                <th className="text-left p-4 text-latte-subtext0">Actions</th>
              </tr>
            </thead>
            <tbody>
          {filteredGrievances.length > 0 ? (filteredGrievances.map((g) => (
              <tr
              key={g._id}
              className="border-b border-latte-surface0 hover:bg-latte-mantle text-left text-latte-subtext0"
              >
              <td className="p-4">#{g.grievanceId}</td>
              <td className="p-4">{g.subject}</td>
              <td className="p-4">{g.category}</td>

              <td className="p-4">
                  <div
                        className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(
                            g.status
                        )}`}
                        >
                        {getStatusIcon(g.status)}
                        <span className="text-sm">{g.status}</span>
                  </div>
              </td>

              <td className="p-4">
                  {new Date(g.createdAt).toLocaleDateString()}
              </td>

              <td className="p-4">
                  <div className="flex gap-2">
                  

                  <button
                      title="In Progress"
                      onClick={() => {
                        setSelectedGrievance(g);
                        setActionStatus("inProgress");
                        setShowViewModal(true);
                      }}

                      className="p-2 text-latte-yellow hover:bg-latte-yellow/10 rounded-xl"
                  >
                      <AlertCircle className="w-4 h-4" />
                  </button>

                  <button
                      title="Resolved"
                      onClick={() => {
                      setSelectedGrievance(g);
                      setActionStatus("resolved");
                      setShowViewModal(true);
                    }}

                      className="p-2 text-latte-green hover:bg-latte-green/10 rounded-xl"
                  >
                      <CheckCircle className="w-4 h-4" />
                  </button>

                  <button
                    title="Reject"
                    onClick={() => {
                      setSelectedGrievance(g);
                      setActionStatus("rejected");
                      setShowViewModal(true);
                    }}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-xl"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>

                  </div>
              </td>
              </tr>
                ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-gray-500">
                      No grievances found
                    </td>
                  </tr>
                )}
          </tbody>

          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 flex items-center justify-between border-t border-latte-surface0">
          <p className="text-latte-subtext0 text-sm">Showing 1-4 of 27 results</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text hover:bg-latte-surface0 transition-colors disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-4 py-2 bg-latte-peach text-latte-base rounded-xl hover:bg-latte-peach/90 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

        {showViewModal && selectedGrievance && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => setShowViewModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-latte-peach">
                Grievance Details
              </h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4 text-left">
              <div>
                <p className="text-sm text-gray-500">Grievance ID</p>
                <p className="font-medium">#{selectedGrievance.grievanceId}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Subject</p>
                <p className="font-medium">{selectedGrievance.subject}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium">{selectedGrievance.category}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="bg-gray-50 p-3 rounded-xl text-sm">
                  {selectedGrievance.description}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Admin Message</p>
                <textarea
                  rows={4}
                  value={adminMessage}
                  onChange={(e) => setAdminMessage(e.target.value)}
                  placeholder="Write a message for the user..."
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-latte-peach"
                />
              </div>


              <div className="flex gap-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`flex items-center mt-1 px-3 py-1 rounded-full text-sm border ${getStatusColor(
                      selectedGrievance.status
                    )}`}
                  >
                    {getStatusIcon(selectedGrievance.status)}
                        <span className="text-sm ml-1">{selectedGrievance.status}</span>
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Submitted On</p>
                  <p className="text-sm">
                    {new Date(selectedGrievance.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <button
              onClick={async () => {
                await updateStatus(
                  selectedGrievance._id,
                  actionStatus,
                  adminMessage
                );
                setAdminMessage("");
                setShowViewModal(false);
                setStatusFilter("all");
              }}
              className="px-4 py-2 bg-latte-peach text-white rounded-xl"
            >
              Update & Notify User
            </button>

          </div>
        </div>
      )}

    </div>
)


}

function Stat({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border flex justify-between border-orange-100 p-6">
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


export default GrievanceAdminModule;


