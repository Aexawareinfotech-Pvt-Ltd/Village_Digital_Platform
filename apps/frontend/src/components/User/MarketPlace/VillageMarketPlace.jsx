import { useEffect, useState } from "react";
import MarketplaceHeader from "./MarketplaceHeader";
import MarketplaceSearch from "./MarketplaceSearch";
import MarketplaceType from "./MarketplaceType";
import MarketplaceList from "./MarketplaceList";
import SellProductModal from "./SellProductModal";

/* TEMP USER (replace with Auth Context later) */
const currentUser = {
  id: "user_123",
  name: "You",
};

const translations = {
  en: {
    title: "Local Marketplace",
    subtitle: "Buy, sell or rent local products",
    search: "Search products...",
    sell: "Sell / Rent Product",
    categories: {
      agriculture: "Agriculture",
      vehicle: "Vehicle",
      tools: "Tools",
      general: "General",
    },
  },
};

const VillageMarketPlace = ({ language = "en" }) => {
  const t = translations[language];

  const [selectedType, setSelectedType] = useState("sell");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSellModal, setShowSellModal] = useState(false);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("all"); // all | my | track
  const [editItem, setEditItem] = useState(null);
  const params = new URLSearchParams(window.location.search);
  const editId = params.get("edit");



  useEffect(() => {
  if (!editId) return;

  const loadEditProduct = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/marketplace/list/my",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();
        const product = data.find((p) => p._id === editId);

        if (product) {
          setEditItem(product);
          setSelectedType(product.type);
          setView("my");
          setShowSellModal(true);
        }
      } catch (err) {
        console.error("Edit load failed", err);
      }
    };

    loadEditProduct();
  }, [editId]);


  /* ---------------- FETCH DATA ---------------- */
  const fetchData = async () => {
    setLoading(true);

    try {
      let url = "http://localhost:3000/api/marketplace/list";

      if (view === "my") {
        url = "http://localhost:3000/api/marketplace/list/my";
      }

      if (view === "track") {
        url = "http://localhost:3000/api/marketplace/track";
      }

      const res = await fetch(url, {
        headers:
          view !== "all"
            ? {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              }
            : {},
      });

      const data = await res.json();
      setListings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Marketplace fetch error:", err);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [view]);

  /* ---------------- ADD / UPDATE PRODUCT ---------------- */
  const handleSellSubmit = (item) => {
    if (editItem) {
      setListings((prev) =>
        prev.map((p) => (p._id === item._id ? item : p))
      );
    } else {
      setListings((prev) => [item, ...prev]);
    }
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (item) => {
    setEditItem(item);
    setShowSellModal(true);
  };

  /* ---------------- DELETE (SOFT DELETE HANDLED BY BACKEND) ---------------- */
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/marketplace/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setListings((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  /* ---------------- FILTER ---------------- */
  const filteredListings = listings.filter((item) => {
    // 🌍 PUBLIC MARKET
    if (view === "all") {
      return (
        item.approvalStatus === "approved" &&
        item.status === "active" &&
        item.type === selectedType &&
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 👤 SELLER VIEW
    if (view === "my") {
      return (
        item.type === selectedType &&
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 🧾 BUYER TRACK VIEW
    if (view === "track") {
      return item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    }

    return true;
  });

  return (
    <div className="max-w-6xl mx-auto mt-12">
      <MarketplaceHeader
        title={t.title}
        subtitle={t.subtitle}
        sellLabel={t.sell}
        onSellClick={() => setShowSellModal(true)}
      />

      <MarketplaceSearch
        placeholder={t.search}
        value={searchQuery}
        onChange={setSearchQuery}
      />

      {/* VIEW TABS */}
      <div className="flex gap-3 mb-6">
        {["all", "my", "track"].map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-4 py-2 rounded-xl transition-colors ${
              view === v
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {v === "all" && "All Products"}
            {v === "my" && "My Products"}
            {v === "track" && "Track Products"}
          </button>
        ))}
      </div>

      <MarketplaceType
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      {loading ? (
        <p className="text-gray-500 text-center mt-10">
          Loading products...
        </p>
      ) : (
        <MarketplaceList
          listings={filteredListings}
          currentUser={currentUser}
          onEdit={handleEdit}
          onDelete={handleDelete}
          view={view}
        />
      )}

      {showSellModal && (
        <SellProductModal
          categories={t.categories}
          defaultType={selectedType}
          editItem={editItem}
          onClose={() => {
            setShowSellModal(false);
            setEditItem(null);
          }}
          onSubmit={handleSellSubmit}
        />
      )}
    </div>
  );
};

export default VillageMarketPlace;
