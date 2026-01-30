import {
  ShoppingBag,
  Phone,
  MapPin,
  MessageCircle,
  Pencil,
  Trash2,
  ImageIcon,
  CreditCard,
  Trash,
  Loader2,
} from "lucide-react";
import DeliveryAddressModal from "./DeliveryAddressModal";
import { useState, useEffect } from "react";
import { socket } from "../../../Socket/socket.js";


const MarketplaceCard = ({
  item,
  onEdit,
  onDelete,
  view,
}) => {
   const token = localStorage.getItem("token");
   const [showAddressModal, setShowAddressModal] = useState(false);
   const [selectedItem, setSelectedItem] = useState(null);
   const [receipt, setReceipt] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

   const COMPLETED_STATUSES = ["sold", "rented"];

    const isCompletedOrder = COMPLETED_STATUSES.includes(item.status);



   useEffect(() => {
    if (!receipt?._id) return;

    // 🔥 JOIN ROOM
    socket.emit("join-receipt", receipt._id);

    // 🔥 LISTEN FOR REAL-TIME UPDATES
    socket.on("delivery-status-updated", (data) => {
      if (data.receiptId === receipt._id) {
        setReceipt((prev) => ({
          ...prev,
          deliveryStatus: data.deliveryStatus,
        }));
      }
    });

    return () => {
      socket.off("delivery-status-updated");
    };
  }, [receipt?._id]);

   useEffect(() => {
    const COMPLETED_STATUSES = ["sold", "rented"];

    if (!COMPLETED_STATUSES.includes(item.status)) return;



    const loadReceipt = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/payment/receipts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const receipts = await res.json();
        const found = receipts.find(
          (r) => r.product?._id === item._id
        );

        if (found) setReceipt(found);
      } catch (err) {
        console.error("Receipt load failed", err);
      }
    };

    loadReceipt();
  }, [item._id, item.status, view, token]);

    const userId = token
      ? JSON.parse(atob(token.split(".")[1])).userId
      : null;

    const isOwner =
      item.owner === userId || item.owner?._id === userId;



      // 🏠 Open address modal
  const openAddressModal = (item) => {
    setSelectedItem(item);
    setShowAddressModal(true);
  };

  // 💳 Save address → then pay
  const proceedToPayment = (address) => {
  if (!address) {
    alert("Address missing");
    return;
  }

  setShowAddressModal(false);
  onBuy(selectedItem, address); // ✅ ALWAYS PASS ADDRESS
};


 const updateDeliveryStatus = async (status) => {
    if (!receipt) return;

    await fetch(
      `http://localhost:3000/api/payment/delivery-status/${receipt._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    setReceipt({ ...receipt, deliveryStatus : status });
  };


    const openReceipt = async (productId) => {
  
      const res = await fetch(
        `http://localhost:3000/api/payment/receipts`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const receipts = await res.json();
      const receipt = receipts.find(r => r.product._id === productId);

      if (!receipt) {
        alert("Receipt not found");
        return;
      }
      const addr = receipt.deliveryAddress;

      alert(`
      🧾 RECEIPT
      Product: ${receipt.product.title}
      Amount: ₹${receipt.amount}
      Buyer: ${receipt.buyer.name}
      Seller: ${receipt.seller.name}
      Payment ID: ${receipt.paymentId}
      Order ID: ${receipt.orderId}

      Delivery Address:
      ${addr?.fullName || "N/A"}
      ${addr?.addressLine1 || ""}
      ${addr?.addressLine2 || ""}
      ${addr?.city || ""}, ${addr?.state || ""}
      ${addr?.pincode || ""}
    Date: ${new Date(receipt.createdAt).toLocaleString()}
    `);
    };



  const onBuy = async (item, deliveryAddress) => {
  try {
    // 1️⃣ Create Razorpay order from backend
    const res = await fetch("http://localhost:3000/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ amount: item.price }),
    });

    const order = await res.json();

    if (!deliveryAddress) {
    alert("Delivery address required");
    return;
   }
    if (!order.id) {
      alert("Failed to create order");
      return;
    }

    // 2️⃣ Razorpay checkout options
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // ✅ Test Key ID
      amount: order.amount,
      currency: "INR",
      name: "Village Marketplace",
      description: item.title,
      order_id: order.id,

      handler: async function (response) {
        // 3️⃣ Verify payment on backend
        const verifyRes = await fetch(
          "http://localhost:3000/api/payment/verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              productId: item._id,
              amount: item.price,
              deliveryAddress,
            }),
          }
        );

        const data = await verifyRes.json();

       if (data.success) {
        alert("✅ Payment successful! Receipt created.");
       
        } else {
          alert("❌ Payment verification failed");
        }
      }, // ✅ COMMA IS IMPORTANT

      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },

      theme: {
        color: "#fe640b",
      },
    };

    // 4️⃣ Open Razorpay checkout
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Payment error:", err);
    alert("Payment failed");
  }
};

    const canDelete =
    item.status === "active" ||
    (isCompletedOrder && receipt?.deliveryStatus === "delivered");

    const deliveryOrder = [
      "pending",
      "packed",
      "shipped",
      "out_for_delivery",
      "delivered",
    ];

    




  return (
    <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden text-left">
      {/* IMAGE */}
      <div className="relative w-full h-64 bg-gray-100">
        {item.images?.length > 0 ? (
          <img
            src={item.images[0].url}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <ImageIcon className="w-10 h-10 text-gray-400" />
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">
        {/* TITLE */}
        <div className="flex gap-3 mb-3">
          <div className="bg-orange-100 p-5 rounded-xl ">
            <ShoppingBag className="text-orange-600" />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-orange-600 font-medium">{item.price} Rs</p>
            <span className="text-xs text-gray-500">
              {item.type === "rent" ? "For Rent" : "For Sale"}
            </span>
          </div>
        </div>

        <p className="text-gray-600 mb-3">{item.description}</p>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          {item.location}
        </div>

        {/* CATEGORY + STATUS */}
        <div className="flex justify-between items-center mb-4">
          <span className="px-3 py-1 text-xs rounded-full bg-orange-50 text-orange-600">
            {item.category}
          </span>
          <div>
          {item.approvalStatus !== "rejected" && (
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
          )}
          {item.approvalStatus !== "rejected" && (
          <span
            className={`px-3 py-2 text-xs rounded-full  ${
              item.approvalStatus === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : item.approvalStatus === "approved"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {item.approvalStatus}
          </span>
          )}
          
          {item.approvalStatus === "rejected" && item.rejectionReason && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-sm">
            <p className="text-red-600 font-semibold mb-1">
              ❌ Rejected by Admin
            </p>
            <p className="text-gray-700">
              <b>Reason:</b> {item.rejectionReason}
            </p>
          </div>
         )}
         </div>
         

        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center border-t pt-4">
          <span className="text-sm text-gray-500">
            Posted by <b>{item.owner?.name || "User"}</b>
          </span>

          <div className="flex gap-2 flex-wrap">
            {/* ALL PRODUCTS (NON OWNER) */}
            {!isOwner && view === "all" && item.approvalStatus === "approved" && (
              <>
                <button
                  onClick={() => openAddressModal(item)}
                  className="px-4 py-2 bg-green-500 text-white rounded-xl flex items-center gap-2 text-sm"
                >
                  <CreditCard className="w-4 h-4" />
                  {item.type === "rent" ? "Rent" : "Buy"}
                </button>
                <a
                  href={`tel:${item.phone}`}
                  className="px-3 py-2 bg-blue-500 text-white rounded-xl text-sm"
                >
                  <Phone className="w-4 h-4 inline" /> Contact
                </a>

                <a
                  href={`https://wa.me/91${item.phone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-green-600 text-white rounded-xl text-sm"
                >
                  <MessageCircle className="w-4 h-4 inline" /> WhatsApp
                </a>
              </>
            )}

            {/* ✅ MY PRODUCTS (OWNER CONTROLS) */}
            {isOwner && view === "my" && (
              <>
                
                {/* <select
                  value={item.status}
                  onChange={(e) => updateStatus(e.target.value)}
                  className="px-3 py-2 border rounded-xl text-sm"
                >
                  <option value="active">Active</option>
                  <option value="sold">Sold</option>
                  <option value="rented">Rented</option>
                  <option value="inactive">Inactive</option>
                </select> */}

                {isCompletedOrder  && (
                  <button
                    onClick={() => openReceipt(item._id)}
                    className="px-3 py-2 bg-indigo-600 text-white rounded-xl text-sm"
                  >
                    View Receipt
                  </button>
                )}
 
                {isCompletedOrder && receipt && (
                  <select
                    value={receipt.deliveryStatus}
                    onChange={(e) => updateDeliveryStatus(e.target.value)}
                    className="px-3 py-2 border rounded-xl text-sm"
                  >
                    {deliveryOrder.map((status) => (
                      <option
                        key={status}
                        value={status}
                        disabled={
                          deliveryOrder.indexOf(status) <
                          deliveryOrder.indexOf(receipt.deliveryStatus)
                        }
                      >
                        {status.replaceAll("_", " ")}
                      </option>
                    ))}
                  </select>
                )}



                {item.status === "active" && item.approvalStatus === "panding" &&(
                <button 
                  onClick={() => onEdit(item)}
                  className="px-3 py-2 bg-yellow-500 text-white rounded-xl text-sm"
                >
                  <Pencil className="w-4 h-4 inline" /> Edit
                </button>
                )}
                {canDelete && (
                <button
                  onClick={() => setShowDeleteDialog(true)}
                  className="px-3 py-2 bg-red-500 text-white rounded-xl text-sm"
                >
                  <Trash2 className="w-4 h-4 inline" /> Delete
                </button>

                )}
              </>
            )}

            {/* TRACK PRODUCTS (READ ONLY) */}
            {view === "track" && receipt && (
              <>
                <div className="px-4 py-2 bg-gray-100 rounded-xl text-sm">
                  📦 Delivery Status:
                  <b className="ml-2 text-orange-600">
                    {receipt.deliveryStatus.replaceAll("_", " ")}
                  </b>
                </div>

                <button
                  onClick={() => openReceipt(item._id)}
                  className="px-3 py-2 bg-indigo-600 text-white rounded-xl text-sm"
                >
                  View Receipt
                </button>
              </>
            )}

          </div>
        </div>
      </div>
         
         {showDeleteDialog && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#fe640b]/10 flex items-center justify-center">
                <Trash className="w-6 h-6 text-[#fe640b]" />
              </div>
              <div>
                <h2 className="text-[#4c4f69] text-lg font-semibold">Delete Product?</h2>
              </div>
            </div>
            
            <p className="text-[#6c6f85] mb-6 text-left">
              Are you sure you want to delete <strong>"{item.title}"</strong>?
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteDialog(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 border border-[#ccd0da] text-[#4c4f69] rounded-2xl hover:bg-[#e6e9ef] transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    setIsDeleting(true);
                    await onDelete(item._id);
                  } catch (err) {
                    console.error("Delete failed:", err);
                    // keep dialog open so user can retry or cancel
                  } finally {
                    setIsDeleting(false);
                    setShowDeleteDialog(false);
                  }
                }}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-[#fe640b] hover:bg-[#fe640b]/90 text-white rounded-2xl transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
          )}

        
        {showAddressModal && (
        <DeliveryAddressModal
          item={selectedItem}
          onClose={() => setShowAddressModal(false)}
          onProceed={proceedToPayment}
        />
)}

    </div>
  );
};

export default MarketplaceCard;
