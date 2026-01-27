import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Hammer,
  MapPin,
  Phone,
  IndianRupee,
  ImageIcon,
} from "lucide-react";

const API_URL = "http://localhost:3000/api/marketplace/list";

export function MarketplaceSection() {
  const [activeTab, setActiveTab] = useState("sell");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  /* ================= FETCH MARKETPLACE ITEMS ================= */
  useEffect(() => {
    const fetchMarketplace = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (res.ok) {
          setItems(data.data || data);
        }
      } catch (err) {
        console.error("Marketplace fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketplace();
  }, []);

  // ✅ ONLY CHANGE IS HERE (slice added)
  const filteredItems = items
    .filter(
      (item) =>
        item.type === (activeTab === "sell" ? "sell" : "rent") &&
        item.approvalStatus === "approved"
    )
    .slice(0, 3);
   
  const handleViewAllMarketplace = () => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/marketplace");
  } else {
    navigate("/VillageLogin");
  }
};
  return (
    <section className="py-16 bg-gray-50" id="marketplace">
      <div className="container mx-auto px-4">
        {/* TITLE */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Local Marketplace
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Buy, sell or rent local products & services from trusted villagers
          </p>
        </div>

        {/* TABS */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-2xl p-1">
            <button
              onClick={() => setActiveTab("sell")}
              className={`px-6 py-2 rounded-2xl ${
                activeTab === "sell" ? "bg-white shadow" : "text-gray-600"
              }`}
            >
              Sell
            </button>
            <button
              onClick={() => setActiveTab("rent")}
              className={`px-6 py-2 rounded-2xl ${
                activeTab === "rent" ? "bg-white shadow" : "text-gray-600"
              }`}
            >
              Rent
            </button>
          </div>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="text-center py-16 text-gray-500">
            Loading marketplace items...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden text-left"
              >
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
                  <div className="flex gap-3 mb-3">
                    <div className="bg-orange-100 p-5 rounded-xl">
                      <ShoppingBag className="text-orange-600" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-orange-600 font-medium">
                        ₹{item.price}
                      </p>
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
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
                      Active
                    </span>
                  </div>

                  {/* FOOTER */}
                  <div className="flex justify-between items-center border-t pt-4">
                    <span className="text-sm text-gray-500">
                      By <b>{item.owner?.name || "User"}</b>
                    </span>

                    <div className="flex gap-2">
                      <a
                        href={`tel:${item.phone}`}
                        className="px-3 py-2 bg-blue-500 text-white rounded-xl text-sm"
                      >
                        <Phone className="w-4 h-4 inline" />
                      </a>

                      <button className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm">
                        {item.type === "rent" ? "Rent" : "Buy"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-10">
           <button
            onClick={handleViewAllMarketplace}
            className="px-6 py-2 border border-[#ff6b35] text-[#ff6b35] rounded-2xl hover:bg-[#fff3e0] transition-colors">
                View All Product
            </button>
        </div>
      </div>
    </section>
  );
}
