import { useState, useEffect } from "react";
import { Plus, Trash2, X, AlertCircle, Loader2, Trash, Pencil,Eye } from "lucide-react";

export default function AdminCropAdvisory() {
  const [cropAdvisories, setCropAdvisories] = useState([]);
  const [showCropModal, setShowCropModal] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [cropToDelete, setCropToDelete] = useState(null);
  const [formData, setFormData] = useState({
    cropName: "",
    season: "kharif",
    sowingTime: "",
    seedGuidance: "",
    fertilizerAdvice: "",
    irrigationAdvice: "",
    pestControl: "",
    weatherPrecaution: "",
    harvesting: "",
    dosAndDonts: "",
  });

  const API_BASE_URL = "http://localhost:3000/api/agriculture/crop-advisory";

  useEffect(() => {
    fetchCropAdvisories();
  }, []);

  const fetchCropAdvisories = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/list`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch");
      
      setCropAdvisories(data.data || []);
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
      const token = localStorage.getItem("token");
      let response;

      if (editingCrop) {
        response = await fetch(`${API_BASE_URL}/update/${editingCrop._id}`, {
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

      await fetchCropAdvisories();
      closeModal();
    } catch (err) {
      setError(err.message);
      console.error("Error saving:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!cropToDelete) return;

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/delete/${cropToDelete._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete");

      setCropAdvisories(cropAdvisories.filter((c) => c._id !== cropToDelete._id));
      setShowDeleteDialog(false);
      setCropToDelete(null);
    } catch (err) {
      setError(err.message);
      console.error("Error deleting:", err);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteDialog = (crop) => {
    setCropToDelete(crop);
    setShowDeleteDialog(true);
  };

  const openModal = (crop = null) => {
    if (crop) {
      setEditingCrop(crop);
      setFormData({
        cropName: crop.cropName || "",
        season: crop.season || "kharif",
        sowingTime: crop.sowingTime || "",
        seedGuidance: crop.seedGuidance || "",
        fertilizerAdvice: crop.fertilizerAdvice || "",
        irrigationAdvice: crop.irrigationAdvice || "",
        pestControl: crop.pestControl || "",
        weatherPrecaution: crop.weatherPrecaution || "",
        harvesting: crop.harvesting || "",
        dosAndDonts: crop.dosAndDonts || "",
      });
    } else {
      setEditingCrop(null);
      setFormData({
        cropName: "",
        season: "kharif",
        sowingTime: "",
        seedGuidance: "",
        fertilizerAdvice: "",
        irrigationAdvice: "",
        pestControl: "",
        weatherPrecaution: "",
        harvesting: "",
        dosAndDonts: "",
      });
    }
    setShowCropModal(true);
    setError("");
  };

  const closeModal = () => {
    setShowCropModal(false);
    setEditingCrop(null);
    setError("");
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#fe640b] font-bold text-2xl">
          Crop Advisory & Best Practices
        </h2>
        <button
          onClick={() => openModal()}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-[#fe640b] text-white rounded-2xl hover:bg-[#e55a0a] transition-colors disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          Add Advisory
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {loading && cropAdvisories.length === 0 && (
        <div className="p-8 text-center">
          <Loader2 className="w-8 h-8 text-[#fe640b] animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading crop advisories...</p>
        </div>
      )}

      {!loading && cropAdvisories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#6c6f85]">No crop advisories found. Add one to get started!</p>
        </div>
      )}

      <div className="space-y-4">
        {cropAdvisories.map((crop) => (
          <div
            key={crop._id}
            className="border-2 border-[#fe640b]/20 rounded-2xl p-6 hover:shadow-md transition-shadow bg-gradient-to-br from-[#fe640b]/5 to-transparent"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-left">
                <h3 className="text-[#fe640b] font-semibold text-left text-xl mb-2" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
                    {crop.cropName}
                  </h3>
                <span className="inline-block px-3 py-1 bg-[#fe640b] text-white text-left text-sm rounded-full">
                  {crop.season.charAt(0).toUpperCase() + crop.season.slice(1)} Season
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(crop)}
                  disabled={loading}
                  className="p-2 text-[#fe640b] hover:bg-[#fe640b]/10 rounded-2xl transition-colors disabled:opacity-50"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openDeleteDialog(crop)}
                  disabled={loading}
                  className="p-2 text-[#d20f39] hover:bg-[#fe640b]/10 rounded-2xl transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#fff7f0] rounded-2xl p-4 border border-[#fe640b]/30">
                <h4 className="text-[#fe640b] font-semibold mb-2 text-left">Sowing Time</h4>
                <p className="text-[#4c4f69] text-sm break-words overflow-wrap-anywhere text-left">
                  {expandedSections[`${crop._id}-sowing`] || crop.sowingTime?.length <= 100
                    ? crop.sowingTime
                    : truncateText(crop.sowingTime, 100)}
                </p>
                {crop.sowingTime?.length > 100 && (
                  <button
                    onClick={() => toggleSection(`${crop._id}-sowing`)}
                    className=" flex items-center gap-2 text-[#fe640b] text-xs font-medium mt-2 hover:underline"
                  >
                    <Eye className="w-4 h-4 text-[#fe640b]" />
                    {expandedSections[`${crop._id}-sowing`] ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>

              <div className="bg-[#fff7f0] rounded-2xl p-4 border border-[#fe640b]/30">
                <h4 className="text-[#fe640b] font-semibold mb-2 text-left">Seed Guidance</h4>
                <p className="text-[#4c4f69] text-sm break-words overflow-wrap-anywhere text-left">
                  {expandedSections[`${crop._id}-seed`] || crop.seedGuidance?.length <= 100
                    ? crop.seedGuidance
                    : truncateText(crop.seedGuidance, 100)}
                </p>
                {crop.seedGuidance?.length > 100 && (
                  <button
                    onClick={() => toggleSection(`${crop._id}-seed`)}
                    className="flex items-center gap-2 text-[#fe640b] text-xs font-medium mt-2 hover:underline"
                  >
                    <Eye className="w-4 h-4 text-[#fe640b]" />
                    {expandedSections[`${crop._id}-seed`] ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>

              <div className="bg-[#fff7f0] rounded-2xl p-4 border border-[#fe640b]/30">
                <h4 className="text-[#fe640b] font-semibold mb-2 text-left">Fertilizer Advice</h4>
                <p className="text-[#4c4f69] text-sm break-words overflow-wrap-anywhere text-left">
                  {expandedSections[`${crop._id}-fertilizer`] || crop.fertilizerAdvice?.length <= 100
                    ? crop.fertilizerAdvice
                    : truncateText(crop.fertilizerAdvice, 100)}
                </p>
                {crop.fertilizerAdvice?.length > 100 && (
                  <button
                    onClick={() => toggleSection(`${crop._id}-fertilizer`)}
                    className="flex items-center gap-2 text-[#fe640b] text-xs font-medium mt-2 hover:underline"
                  >
                    <Eye className="w-4 h-4 text-[#fe640b]" />
                    {expandedSections[`${crop._id}-fertilizer`] ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>

              <div className="bg-[#fff7f0] rounded-2xl p-4 border border-[#fe640b]/30">
                <h4 className="text-[#fe640b] font-semibold mb-2 text-left">Irrigation Advice</h4>
                <p className="text-[#4c4f69] text-sm break-words overflow-wrap-anywhere text-left">
                  {expandedSections[`${crop._id}-irrigation`] || crop.irrigationAdvice?.length <= 100
                    ? crop.irrigationAdvice
                    : truncateText(crop.irrigationAdvice, 100)}
                </p>
                {crop.irrigationAdvice?.length > 100 && (
                  <button
                    onClick={() => toggleSection(`${crop._id}-irrigation`)}
                    className="flex items-center gap-2 text-[#fe640b] text-xs font-medium mt-2 hover:underline"
                  >
                    <Eye className="w-4 h-4 text-[#fe640b]" />
                    {expandedSections[`${crop._id}-irrigation`] ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>

              <div className="bg-[#fff7f0] rounded-2xl p-4 border border-[#fe640b]/30">
                <h4 className="text-[#fe640b] font-semibold mb-2 text-left">Pest Control</h4>
                <p className="text-[#4c4f69] text-sm break-words overflow-wrap-anywhere text-left">
                  {expandedSections[`${crop._id}-pest`] || crop.pestControl?.length <= 100
                    ? crop.pestControl
                    : truncateText(crop.pestControl, 100)}
                </p>
                {crop.pestControl?.length > 100 && (
                  <button
                    onClick={() => toggleSection(`${crop._id}-pest`)}
                    className="flex items-center gap-2 text-[#fe640b] text-xs font-medium mt-2 hover:underline"
                  >
                    <Eye className="w-4 h-4 text-[#fe640b]" />
                    {expandedSections[`${crop._id}-pest`] ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>

              <div className="bg-[#fff7f0] rounded-2xl p-4 border border-[#fe640b]/30">
                <h4 className="text-[#fe640b] font-semibold mb-2 text-left">Weather Precaution</h4>
                <p className="text-[#4c4f69] text-sm break-words overflow-wrap-anywhere text-left">
                  {expandedSections[`${crop._id}-weather`] || crop.weatherPrecaution?.length <= 100
                    ? crop.weatherPrecaution
                    : truncateText(crop.weatherPrecaution, 100)}
                </p>
                {crop.weatherPrecaution?.length > 100 && (
                  <button
                    onClick={() => toggleSection(`${crop._id}-weather`)}
                    className="flex items-center gap-2 text-[#fe640b] text-xs font-medium mt-2 hover:underline"
                  >
                    <Eye className="w-4 h-4 text-[#fe640b]" />
                    {expandedSections[`${crop._id}-weather`] ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>

              <div className="bg-[#fff7f0] rounded-2xl p-4 border border-[#fe640b]/30">
                <h4 className="text-[#fe640b] font-semibold mb-2 text-left">Harvesting</h4>
                <p className="text-[#4c4f69] text-sm break-words overflow-wrap-anywhere text-left">
                  {expandedSections[`${crop._id}-harvest`] || crop.harvesting?.length <= 100
                    ? crop.harvesting
                    : truncateText(crop.harvesting, 100)}
                </p>
                {crop.harvesting?.length > 100 && (
                  <button
                    onClick={() => toggleSection(`${crop._id}-harvest`)}
                    className="flex items-center gap-2 text-[#fe640b] text-xs font-medium mt-2 hover:underline"
                  >
                    <Eye className="w-4 h-4 text-[#fe640b]" />
                    {expandedSections[`${crop._id}-harvest`] ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>

              <div className="bg-[#fff7f0] rounded-2xl p-4 border border-[#fe640b]/30">
                <h4 className="text-[#fe640b] font-semibold mb-2 text-left">Do's & Don'ts</h4>
                <p className="text-[#4c4f69] text-sm break-words overflow-wrap-anywhere whitespace-pre-line text-left">
                  {expandedSections[`${crop._id}-dos`] || crop.dosAndDonts?.length <= 100
                    ? crop.dosAndDonts
                    : truncateText(crop.dosAndDonts, 100)}
                </p>
                {crop.dosAndDonts?.length > 100 && (
                  <button
                    onClick={() => toggleSection(`${crop._id}-dos`)}
                    className="flex items-center gap-2 text-[#fe640b] text-xs font-medium mt-2 hover:underline"
                  >
                    <Eye className="w-4 h-4 text-[#fe640b]" />
                    {expandedSections[`${crop._id}-dos`] ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCropModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#dce0e8]">
              <h2 className="text-[#4c4f69] text-xl font-semibold">
                {editingCrop ? "Edit" : "Add"} Crop Advisory
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#4c4f69] font-medium mb-2 text-left">Crop Name</label>
                  <input
                    type="text"
                    name="cropName"
                    value={formData.cropName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                    placeholder="e.g., Cotton, Wheat, Rice"
                  />
                </div>

                <div>
                  <label className="block text-[#4c4f69] font-medium mb-2 text-left">Season</label>
                  <select
                    name="season"
                    value={formData.season}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                  >
                    <option value="kharif">Kharif (Monsoon)</option>
                    <option value="rabi">Rabi (Winter)</option>
                    <option value="zaid">Zaid (Summer)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#4c4f69] font-medium mb-2 text-left">Sowing Time</label>
                    <textarea
                      name="sowingTime"
                      value={formData.sowingTime}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                      placeholder="Best time to plant this crop"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4c4f69] font-medium mb-2 text-left">Seed Guidance</label>
                    <textarea
                      name="seedGuidance"
                      value={formData.seedGuidance}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                      placeholder="Which seeds to use"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4c4f69] font-medium mb-2 text-left">Fertilizer Advice</label>
                    <textarea
                      name="fertilizerAdvice"
                      value={formData.fertilizerAdvice}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                      placeholder="When and how much fertilizer"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4c4f69] font-medium mb-2 text-left">Irrigation Advice</label>
                    <textarea
                      name="irrigationAdvice"
                      value={formData.irrigationAdvice}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                      placeholder="Water schedule and quantity"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4c4f69] font-medium mb-2 text-left">Pest Control</label>
                    <textarea
                      name="pestControl"
                      value={formData.pestControl}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                      placeholder="Common pests and solutions"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4c4f69] font-medium mb-2 text-left">Weather Precaution</label>
                    <textarea
                      name="weatherPrecaution"
                      value={formData.weatherPrecaution}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                      placeholder="Rain/heat/frost warnings"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4c4f69] font-medium mb-2 text-left">Harvesting</label>
                    <textarea
                      name="harvesting"
                      value={formData.harvesting}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                      placeholder="When and how to harvest"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4c4f69] font-medium mb-2 text-left">Do's & Don'ts</label>
                    <textarea
                      name="dosAndDonts"
                      value={formData.dosAndDonts}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                      placeholder="Quick tips (use bullet points)"
                    />
                  </div>
                </div>
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
                  {loading ? "Saving..." : editingCrop ? "Update" : "Add"} Advisory
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && cropToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#fe640b]/10 flex items-center justify-center">
                <Trash className="w-6 h-6 text-[#fe640b]" />
              </div>
              <div>
                <h2 className="text-[#4c4f69] text-lg font-semibold">Delete Advisory?</h2>
              </div>
            </div>
            
            <p className="text-[#6c6f85] mb-6 text-left">
              Are you sure you want to delete <strong>"{cropToDelete.cropName}"</strong>? This action cannot be undone.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteDialog(false);
                  setCropToDelete(null);
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
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
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