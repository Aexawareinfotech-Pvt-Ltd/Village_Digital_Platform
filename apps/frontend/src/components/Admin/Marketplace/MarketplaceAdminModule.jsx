import { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  Search,
  ShoppingBag,
} from "lucide-react";
import Stat from "../../Common/Stat";
import { socket } from "../../../Socket/socket";

const MarketplaceAdminModule = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deliveryMap, setDeliveryMap] = useState({});
  const [rejectReason, setRejectReason] = useState("");
  const [rejectingProduct, setRejectingProduct] = useState(null);
  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    sold: 0,
    rented: 0,
    seller: 0,
    buyer: 0,
  });



  useEffect(() => {
  const loadDeliveryStatus = async () => {
    const map = {};
    const COMPLETED_STATUSES = ["sold", "rented"];

    for (const item of products) {
      if (COMPLETED_STATUSES.includes(item.status)) {
        try {
          const res = await fetch(
            `http://localhost:3000/api/payment/admin/delivery-status/${item._id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          const data = await res.json();
          map[item._id] = data.deliveryStatus || "pending";
        } catch {
          map[item._id] = "pending";
        }
      }
    }

    setDeliveryMap(map);
  };

  if (products.length) loadDeliveryStatus();
}, [products]);


  const fetchCounts = async () => {
      const res = await fetch("http://localhost:3000/api/marketplace/count", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setCounts(data);
    };
  
    useEffect(() => {
      fetchCounts();
  
      socket.on("marketplace:count:update", fetchCounts);
  
      return () => {
        socket.off("marketplace:count:update");
      };
    }, []);
  

  /* ---------------- FETCH ALL PRODUCTS (ADMIN) ---------------- */
  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/marketplace/admin/list",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Admin fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  /* ---------------- APPROVE ---------------- */
  const approve = async (id) => {
    await fetch(
      `http://localhost:3000/api/marketplace/approve/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setProducts((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, approvalStatus: "approved" } : p
      )
    );
    setSelectedProduct(null);
  };

  /* ---------------- REJECT ---------------- */
          const reject = async (id) => {
  if (!rejectReason || rejectReason.trim().length < 5) {
    alert("Please enter a proper rejection reason");
    return;
  }

  await fetch(
    `http://localhost:3000/api/marketplace/reject/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ reason: rejectReason }),
    }
  );

  setProducts((prev) =>
    prev.map((p) =>
      p._id === id
        ? {
            ...p,
            approvalStatus: "rejected",
            rejectionReason: rejectReason,
          }
        : p
    )
  );

  setRejectingProduct(null);
  setRejectReason("");
};


  

  /* ---------------- FILTER ---------------- */
  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.owner?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.price?.toString().includes(searchQuery);

    const matchesStatus =
      statusFilter === "all" || item.approvalStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statusBadge = (status) => {
    if (status === "pending")
      return "bg-yellow-100 text-yellow-700";
    if (status === "approved")
      return "bg-green-100 text-green-700";
    return "bg-red-100 text-red-700";
  };

  const deliveryBadge = (status) => {
  if (!status) return "bg-gray-100 text-gray-500";
  if (status === "pending") return "bg-yellow-100 text-yellow-700";
  if (status === "packed") return "bg-blue-100 text-blue-700";
  if (status === "shipped") return "bg-indigo-100 text-indigo-700";
  if (status === "out_for_delivery") return "bg-orange-100 text-orange-700";
  if (status === "delivered") return "bg-green-100 text-green-700";
};

const formatDelivery = (s) =>
  s ? s.replaceAll("_", " ").toUpperCase() : "—";


  return (
    <div className="p-0">
      {/* HEADER */}
      <div className="text-left mb-6 px-6 pt-6">
        <h1 className="text-3xl font-semibold text-latte-peach">
          Marketplace – Product Approval
        </h1>
        <p className="mt-1 text-[#6c6f85]">
          Review and manage marketplace product approvals
        </p>
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Stat title="Total Product Posts" value={counts.total} icon={<ShoppingBag />} />
      <Stat title="Pending Product Posts" value={counts.pending} icon={<Clock />} />
      <Stat title="Approved Product Posts" value={counts.approved} icon={<CheckCircle />} />
      <Stat title="Rejected Product Posts" value={counts.rejected} icon={<XCircle />} />
      <Stat title="Sold Products" value={counts.sold} icon={<ShoppingBag />} />
      <Stat title="Rented Products" value={counts.rented} icon={<ShoppingBag />} />
      <Stat title="Totoal Sellers" value={counts.seller} icon={<ShoppingBag />} />
      <Stat title="Total Buyers" value={counts.buyer} icon={<ShoppingBag />} />
      
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 mb-6 mt-6">
        {/* SEARCH & FILTER */}
        <div className="p-6 border-b border-latte-surface0">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-latte-subtext0" />
            <input
              placeholder="Search product or seller..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 hover:bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text placeholder-latte-subtext0 focus:outline-none focus:ring-2 focus:ring-latte-peach"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peachl"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-latte-surface0">
                <th className="text-left p-4 text-latte-subtext0">Seller</th>
                <th className="text-left p-4 text-latte-subtext0">Product</th>
                <th className="text-left p-4 text-latte-subtext0">Type</th>
                <th className="text-left p-4 text-latte-subtext0">Price</th>
                <th className="text-left p-4 text-latte-subtext0">Status</th>
                <th className="text-left p-4 text-latte-subtext0">Product Status</th>
                <th className="text-left p-4 text-latte-subtext0">Delivery Status</th>
                <th className="text-left p-4 text-latte-subtext0">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length ? (
                filteredProducts.map((item) => (
                  <tr key={item._id} className="border-b border-latte-surface0 hover:bg-latte-mantle text-left text-latte-subtext0">
                    <td className="p-4">{item.owner?.name}</td>
                    <td className="p-4 font-medium">{item.title}</td>
                    <td className="p-4">
                      {item.type === "rent" ? "Rent" : "Sale"}
                    </td>
                    <td className="p-4">₹{item.price}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm inline-flex items-center gap-1 ${statusBadge(
                          item.approvalStatus
                        )}`}
                      >
                        <Clock size={14} />
                        {item.approvalStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          item.status === "active"
                            ? "bg-green-100 text-green-600"
                            : item.status === "sold"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

              
                    <td className="p-4">
                      {!["sold", "rented"].includes(item.status) ? (
                        <span className="text-gray-400">—</span>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${deliveryBadge(
                            deliveryMap[item._id]
                          )}`}
                        >
                          {formatDelivery(deliveryMap[item._id])}
                        </span>
                      )}
                    </td>


                    
                    <td className="p-4 flex gap-2">
                      <button
                        onClick={() => setSelectedProduct(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl"
                      >
                        <Eye size={16} />
                      </button>
                      {item.approvalStatus !== "approved" && item.status === "active" && (
                      <button
                        onClick={() => approve(item._id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-xl"
                      >
                        <CheckCircle size={16} />
                      </button>
                      )}
                      {item.status === "active" && item.approvalStatus !== "approved" && (
                     <button
                      disabled={!rejectReason || rejectReason.trim().length < 5}
                      onClick={() => {
                        setRejectingProduct(item);
                        setRejectReason("");
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl"
                    >
                      <XCircle size={16} />
                    </button>
                  )}

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </>
    )}
        {/* VIEW MODAL */}
        {selectedProduct && (
            <div
            className="fixed inset-0 bg-black/40 z-50 flex items-center text-left justify-center p-4 "
            onClick={() => setSelectedProduct(null)}
            >
            <div
                className="bg-white rounded-2xl max-w-xl w-full p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold mb-4 text-latte-peach">
                Product Details
                </h2>

                <img
                src={selectedProduct.images?.[0]?.url}
                className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <p><b>Seller Name:</b>{selectedProduct.owner?.name}</p>
                <p><b>Seller Phone no. :</b>{selectedProduct.owner?.phone}</p>
                <p><b>Product:</b> {selectedProduct.title}</p>
                <p><b>Price:</b> ₹{selectedProduct.price}</p>
                <p><b>Category:</b> {selectedProduct.category}</p>
                <p><b>Description:</b></p>
                <p className="text-gray-600 mt-1">
                {selectedProduct.description}
                </p>
                <p><b>Location:</b>{selectedProduct.location}</p>
                <p><b>Date:</b>{new Date(selectedProduct.createdAt).toLocaleString()}</p>
                {selectedProduct.status === "active" && selectedProduct.approvalStatus !== "approved" && (
                <div className="flex gap-4 mt-6">
                <button
                    onClick={() => approve(selectedProduct._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-xl"
                >
                    Approve
                </button>

                
                  <button
                    onClick={() => {
                      setRejectingProduct(item);
                      setRejectReason("");
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-xl"
                  >
                    reject
                  </button>
                


                
                </div>
                )}
            </div>
            </div>
        )}

        {rejectingProduct && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div
              className="bg-white rounded-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-red-600 mb-3">
                Reject Product
              </h2>

              <p className="text-sm text-gray-600 mb-3">
                Please provide a reason. This will be visible to the seller.
              </p>

              <textarea
                rows={4}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g. Product image unclear, missing details, prohibited item…"
                className="w-full border rounded-xl p-3 mb-4 focus:ring-2 focus:ring-red-400 outline-none"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setRejectingProduct(null);
                    setRejectReason("");
                  }}
                  className="px-4 py-2 rounded-xl bg-gray-200"
                >
                  Cancel
                </button>

                {rejectingProduct.status === "active" && rejectingProduct.approvalStatus !== "approved" && (
                <button
                  onClick={() => {
                    setRejectingProduct(rejectingProduct);
                    setRejectReason("");
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-xl"
                >
                  
                </button>
              )}

              </div>
            </div>
          </div>
        )}

        

        

     
    </div>
  );
};

export default MarketplaceAdminModule;




