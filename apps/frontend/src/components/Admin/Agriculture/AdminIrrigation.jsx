import { useState, useEffect } from "react";
import { Plus, Trash2, X, Pencil, AlertCircle, Loader2, Trash } from "lucide-react";

export default function AdminIrrigation() {
  const [irrigationSchedules, setIrrigationSchedules] = useState([]);
  const [showIrrigationModal, setShowIrrigationModal] = useState(false);
  const [editingIrrigation, setEditingIrrigation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState(null);
  const [formData, setFormData] = useState({
    cropName: "",
    timing: "",
    waterQuantity: "",
    specialAlert: "",
  });

  const API_BASE_URL = "http://localhost:3000/api/agriculture/irrigation";

  useEffect(() => {
    fetchIrrigationSchedules();
  }, []);

  const fetchIrrigationSchedules = async () => {
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
      
      setIrrigationSchedules(data.data || []);
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

      if (editingIrrigation) {
        response = await fetch(`${API_BASE_URL}/update/${editingIrrigation._id}`, {
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

      await fetchIrrigationSchedules();
      closeModal();
    } catch (err) {
      setError(err.message);
      console.error("Error saving:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!scheduleToDelete) return;

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("tokens");
      const response = await fetch(`${API_BASE_URL}/delete/${scheduleToDelete._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete");

      setIrrigationSchedules(irrigationSchedules.filter((s) => s._id !== scheduleToDelete._id));
      setShowDeleteDialog(false);
      setScheduleToDelete(null);
    } catch (err) {
      setError(err.message);
      console.error("Error deleting:", err);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteDialog = (schedule) => {
    setScheduleToDelete(schedule);
    setShowDeleteDialog(true);
  };

  const openModal = (schedule = null) => {
    if (schedule) {
      setEditingIrrigation(schedule);
      setFormData({
        cropName: schedule.cropName || "",
        timing: schedule.timing || "",
        waterQuantity: schedule.waterQuantity || "",
        specialAlert: schedule.specialAlert || "",
      });
    } else {
      setEditingIrrigation(null);
      setFormData({
        cropName: "",
        timing: "",
        waterQuantity: "",
        specialAlert: "",
      });
    }
    setShowIrrigationModal(true);
    setError("");
  };

  const closeModal = () => {
    setShowIrrigationModal(false);
    setEditingIrrigation(null);
    setError("");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#fe640b] font-bold text-2xl">Irrigation Schedule & Water Advisory</h2>
        <button
          onClick={() => openModal()}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-[#fe640b] text-white rounded-2xl hover:bg-[#e55a0a] transition-colors disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          Add Schedule
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {loading && irrigationSchedules.length === 0 && (
        <div className="p-8 text-center">
          <Loader2 className="w-8 h-8 text-[#fe640b] animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading irrigation schedules...</p>
        </div>
      )}

      {!loading && irrigationSchedules.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#6c6f85]">No irrigation schedules found. Add one to get started!</p>
        </div>
      )}

      <div className="space-y-4">
        {irrigationSchedules.map((schedule) => (
          <div
            key={schedule._id}
            className="border-2 border-[#fe640b]/20 rounded-2xl p-5 bg-gradient-to-r from-[#fe640b]/5 to-transparent"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-[#fe640b] font-semibold mb-3 text-left" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>{schedule.cropName}</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white border border-[#fe640b]/20 rounded-2xl p-3">
                    <p className="text-[#6c6f85] text-sm mb-1 text-left">Irrigation Timing</p>
                    <p className="text-[#4c4f69] font-medium text-left" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>{schedule.timing}</p>
                  </div>
                  <div className="bg-white border border-[#fe640b]/20 rounded-2xl p-3">
                    <p className="text-[#6c6f85] text-sm mb-1 text-left">Water Quantity</p>
                    <p className="text-[#4c4f69] font-medium text-left" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>{schedule.waterQuantity}</p>
                  </div>
                  <div className="bg-white border border-[#fe640b]/20 rounded-2xl p-3">
                    <p className="text-[#6c6f85] text-sm mb-1 text-left">Special Alert</p>
                    <p className="text-[#d20f39] font-medium text-left" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>{schedule.specialAlert}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => openModal(schedule)}
                  disabled={loading}
                  className="p-2 text-[#fe640b] hover:bg-[#fe640b]/10 rounded-2xl transition-colors disabled:opacity-50"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openDeleteDialog(schedule)}
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

      {/* Irrigation Schedule Modal */}
      {showIrrigationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#dce0e8]">
              <h2 className="text-[#4c4f69] text-xl font-semibold">
                {editingIrrigation ? "Edit" : "Add"} Irrigation Schedule
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
                <label className="block text-[#4c4f69] font-medium mb-2 text-left">Crop Name</label>
                <input
                  type="text"
                  name="cropName"
                  value={formData.cropName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                  placeholder="e.g., Wheat, Cotton"
                />
              </div>

              <div>
                <label className="block text-[#4c4f69] font-medium mb-2 text-left">Irrigation Timing</label>
                <input
                  type="text"
                  name="timing"
                  value={formData.timing}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                  placeholder="e.g., Every 7 days"
                />
              </div>

              <div>
                <label className="block text-[#4c4f69] font-medium mb-2 text-left">Water Quantity</label>
                <input
                  type="text"
                  name="waterQuantity"
                  value={formData.waterQuantity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                  placeholder="e.g., Moderate (50mm per irrigation)"
                />
              </div>

              <div>
                <label className="block text-[#4c4f69] font-medium mb-2 text-left">Special Alert</label>
                <textarea
                  name="specialAlert"
                  value={formData.specialAlert}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                  placeholder="e.g., Delay irrigation if rain is expected"
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
                  {loading ? "Saving..." : editingIrrigation ? "Update" : "Add"} Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && scheduleToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#fe640b]/10 flex items-center justify-center">
                <Trash className="w-6 h-6 text-[#fe640b]" />
              </div>
              <div>
                <h2 className="text-[#4c4f69] text-lg font-semibold">Delete Schedule?</h2>
              </div>
            </div>
            
            <p className="text-[#6c6f85] mb-6 text-left">
              Are you sure you want to delete <strong>"{scheduleToDelete.cropName}"</strong> irrigation schedule? This action cannot be undone.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteDialog(false);
                  setScheduleToDelete(null);
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