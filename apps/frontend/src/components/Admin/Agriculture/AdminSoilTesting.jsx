import { useState, useEffect } from "react";
import { Building2, Phone, MapPin, Plus, Trash2, X, Pencil, AlertCircle, Loader2, Trash } from "lucide-react";

export default function AdminSoilTesting() {
  const [soilCenters, setSoilCenters] = useState([]);
  const [showSoilModal, setShowSoilModal] = useState(false);
  const [editingSoilCenter, setEditingSoilCenter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [centerToDelete, setCenterToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    testsOffered: "",
  });

  const API_BASE_URL = "http://localhost:3000/api/agriculture/soil-testing";

  useEffect(() => {
    fetchSoilCenters();
  }, []);

  const fetchSoilCenters = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("tokens");
      const response = await fetch(`${API_BASE_URL}/list`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch");
      
      setSoilCenters(data.data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("tokens");
      let response;

      if (editingSoilCenter) {
        response = await fetch(`${API_BASE_URL}/update/${editingSoilCenter._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch(`${API_BASE_URL}/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to save");

      await fetchSoilCenters();
      closeModal();
    } catch (err) {
      setError(err.message);
      console.error("Error saving:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!centerToDelete) return;

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("tokens");
      const response = await fetch(`${API_BASE_URL}/delete/${centerToDelete._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete");

      setSoilCenters(soilCenters.filter((c) => c._id !== centerToDelete._id));
      setShowDeleteDialog(false);
      setCenterToDelete(null);
    } catch (err) {
      setError(err.message);
      console.error("Error deleting:", err);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteDialog = (center) => {
    setCenterToDelete(center);
    setShowDeleteDialog(true);
  };

  const openModal = (center = null) => {
    if (center) {
      setEditingSoilCenter(center);
      setFormData({
        name: center.name || "",
        address: center.address || "",
        phone: center.phone || "",
        testsOffered: center.testsOffered || "",
      });
    } else {
      setEditingSoilCenter(null);
      setFormData({
        name: "",
        address: "",
        phone: "",
        testsOffered: "",
      });
    }
    setShowSoilModal(true);
    setError("");
  };

  const closeModal = () => {
    setShowSoilModal(false);
    setEditingSoilCenter(null);
    setError("");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#fe640b] font-bold text-2xl">Soil Testing Information</h2>
        <button
          onClick={() => openModal()}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-[#fe640b] text-white rounded-2xl hover:bg-[#e55a0a] transition-colors disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          Add Center
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Info Banner */}
      <div className="bg-gradient-to-br from-[#fe640b]/5 to-transparent border-l-4 border-[#fe640b] p-4 rounded-lg mb-6">
        <h3 className="text-[#fe640b] font-semibold mb-2 text-left">Why Soil Testing?</h3>
        <ul className="text-[#4c4f69] space-y-1 text-sm text-left">
          <li>✔ Better crop yield</li>
          <li>✔ Correct fertilizer usage</li>
          <li>✔ Save money on unnecessary inputs</li>
          <li>✔ Improve soil health</li>
        </ul>
      </div>

      {loading && soilCenters.length === 0 && (
        <div className="p-8 text-center">
          <Loader2 className="w-8 h-8 text-[#fe640b] animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading soil testing centers...</p>
        </div>
      )}

      {!loading && soilCenters.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#6c6f85]">No soil testing centers found. Add one to get started!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {soilCenters.map((center) => (
          <div
            key={center._id}
            className="border-2 border-[#fe640b]/20 rounded-2xl p-5 hover:shadow-md transition-shadow bg-[#fffbf7]"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-[#fe640b] font-semibold mb-3 text-left" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>{center.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#6c6f85] mt-0.5 flex-shrink-0" />
                    <span className="text-[#4c4f69] text-left" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>{center.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#6c6f85]" />
                    <a href={`tel:${center.phone}`} className="text-[#1e66f5] hover:underline">
                      {center.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-[#6c6f85] mt-0.5 flex-shrink-0" />
                    <span className="text-[#4c4f69] text-left" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>{center.testsOffered}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => openModal(center)}
                  disabled={loading}
                  className="p-2 text-[#fe640b] hover:bg-[#fe640b]/10 rounded-2xl transition-colors disabled:opacity-50"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openDeleteDialog(center)}
                  disabled={loading}
                  className="p-2 text-[#d20f39] hover:bg-[#fe640b]/10 rounded-2xl transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Soil Testing Center Modal */}
      {showSoilModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#dce0e8]">
              <h2 className="text-[#4c4f69] text-xl font-semibold">
                {editingSoilCenter ? "Edit" : "Add"} Soil Testing Center
              </h2>
              <button onClick={closeModal} className="text-[#6c6f85] hover:text-[#4c4f69]">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-[#4c4f69] text-left font-medium mb-2">Center Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                  placeholder="e.g., Rajkot Soil Test Lab"
                />
              </div>

              <div>
                <label className="block text-[#4c4f69] text-left font-medium mb-2">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                  placeholder="Full address"
                />
              </div>

              <div>
                <label className="block text-[#4c4f69] text-left font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                  placeholder="10-digit phone number"
                />
              </div>

              <div>
                <label className="block text-[#4c4f69] text-left font-medium mb-2">Tests Offered</label>
                <input
                  type="text"
                  name="testsOffered"
                  value={formData.testsOffered}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                  placeholder="e.g., pH, Nitrogen, Potassium"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={closeModal}
                  type="button"
                  disabled={loading}
                  className="flex-1 px-4 py-2 border border-[#dce0e8] text-[#4c4f69] rounded-2xl hover:bg-[#e6e9ef] transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  type="button"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-[#fe640b] text-white rounded-2xl hover:bg-[#e55a0a] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? "Saving..." : editingSoilCenter ? "Update" : "Add"} Center
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && centerToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#fe640b]/10 flex items-center justify-center">
                <Trash className="w-6 h-6 text-[#fe640b]" />
              </div>
              <div>
                <h2 className="text-[#4c4f69] text-lg font-semibold">Delete Center?</h2>
              </div>
            </div>
            
            <p className="text-[#6c6f85] mb-6 text-left">
              Are you sure you want to delete <strong>"{centerToDelete.name}"</strong>? This action cannot be undone.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteDialog(false);
                  setCenterToDelete(null);
                }}
                disabled={loading}
                className="flex-1 px-4 py-2 border border-[#ccd0da] text-[#4c4f69] rounded-2xl hover:bg-[#e6e9ef] transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-[#fe640b] hover:bg-[#fe640b]/90 text-white rounded-2xl transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
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
    </div>
  );
}