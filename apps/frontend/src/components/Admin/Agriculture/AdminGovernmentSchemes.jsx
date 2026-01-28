import { useState, useEffect } from "react";
import { Plus, Trash2, X, AlertCircle, Loader2, Trash, Pencil, FileText,Eye } from "lucide-react";

export default function AdminGovernmentSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [showSchemeModal, setShowSchemeModal] = useState(false);
  const [editingScheme, setEditingScheme] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [schemeToDelete, setSchemeToDelete] = useState(null);
  const [formData, setFormData] = useState({
    schemeName: "",
    benefit: "",
    eligibility: "",
    requiredDocuments: "",
    lastDate: "",
    officialWebsite: "",
    applySteps: "",
  });

  const API_BASE_URL = "http://localhost:3000/api/agriculture/government-schemes";

  // Parse documents - handles both array and string formats
  const parseDocuments = (docsData) => {
    console.log("Documents raw data:", docsData, "Type:", typeof docsData);
    
    if (!docsData) {
      return [];
    }
    
    // If it's an array, process each item
    if (Array.isArray(docsData)) {
      // If array contains a single string with line breaks, split it
      if (docsData.length === 1 && typeof docsData[0] === 'string') {
        return docsData[0]
          .split(/[\n\r]+/)
          .map(doc => doc.trim())
          .filter(doc => doc.length > 0);
      }
      // If array contains multiple items, return as is
      return docsData.filter(doc => doc && doc.trim().length > 0);
    }
    
    // If it's a string, split by line breaks, commas, or semicolons
    if (typeof docsData === 'string') {
      return docsData
        .split(/[,\n\r;]+/)
        .map(doc => doc.trim())
        .filter(doc => doc.length > 0);
    }
    
    return [];
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
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
      
      console.log("Fetched schemes data:", data.data);
      setSchemes(data.data || []);
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

      if (editingScheme) {
        response = await fetch(`${API_BASE_URL}/update/${editingScheme._id}`, {
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

      await fetchSchemes();
      closeModal();
    } catch (err) {
      setError(err.message);
      console.error("Error saving:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!schemeToDelete) return;

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/delete/${schemeToDelete._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete");

      setSchemes(schemes.filter((s) => s._id !== schemeToDelete._id));
      setShowDeleteDialog(false);
      setSchemeToDelete(null);
    } catch (err) {
      setError(err.message);
      console.error("Error deleting:", err);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteDialog = (scheme) => {
    setSchemeToDelete(scheme);
    setShowDeleteDialog(true);
  };

  const openModal = (scheme = null) => {
    if (scheme) {
      setEditingScheme(scheme);
      setFormData({
        schemeName: scheme.schemeName || "",
        benefit: scheme.benefit || "",
        eligibility: scheme.eligibility || "",
        requiredDocuments: scheme.requiredDocuments || "",
        lastDate: scheme.lastDate || "",
        officialWebsite: scheme.officialWebsite || "",
        applySteps: scheme.applySteps || "",
      });
    } else {
      setEditingScheme(null);
      setFormData({
        schemeName: "",
        benefit: "",
        eligibility: "",
        requiredDocuments: "",
        lastDate: "",
        officialWebsite: "",
        applySteps: "",
      });
    }
    setShowSchemeModal(true);
    setError("");
  };

  const closeModal = () => {
    setShowSchemeModal(false);
    setEditingScheme(null);
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
          Government Schemes Management
        </h2>
        <button
          onClick={() => openModal()}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-[#fe640b] text-white rounded-2xl hover:bg-[#e55a0a] transition-colors disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          Add Scheme
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {loading && schemes.length === 0 && (
        <div className="p-8 text-center">
          <Loader2 className="w-8 h-8 text-[#fe640b] animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading government schemes...</p>
        </div>
      )}

      {!loading && schemes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#6c6f85]">No government schemes found. Add one to get started!</p>
        </div>
      )}

      <div className="space-y-4">
        {schemes.map((scheme) => {
          const documentsArray = parseDocuments(scheme.requiredDocuments);
          
          return (
            <div
              key={scheme._id}
              className="border-2 border-[#fe640b]/20 rounded-2xl p-6 hover:shadow-md transition-shadow bg-gradient-to-br from-[#fe640b]/5 to-transparent"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[#fe640b] font-semibold text-left text-xl mb-2" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
                    {scheme.schemeName}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(scheme)}
                    disabled={loading}
                    className="p-2 text-[#fe640b] hover:bg-[#fe640b]/10 rounded-2xl transition-colors disabled:opacity-50"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openDeleteDialog(scheme)}
                    disabled={loading}
                    className="p-2 text-[#d20f39] hover:bg-[#fe640b]/10 rounded-2xl transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#fff7f0] rounded-2xl p-4 border border-[#fe640b]/30 self-start min-h-[140px]">
                  <h4 className="text-[#fe640b] font-semibold mb-2 text-left">Key Benefit</h4>
                  <p className="text-[#4c4f69] text-sm break-words overflow-wrap-anywhere text-left">
                    {expandedSections[`${scheme._id}-benefit`] || scheme.benefit?.length <= 100
                      ? scheme.benefit
                      : truncateText(scheme.benefit, 100)}
                  </p>
                  {scheme.benefit?.length > 100 && (
                    <button
                      onClick={() => toggleSection(`${scheme._id}-benefit`)}
                      className=" flex items-center gap-2 text-[#fe640b] block text-left text-xs  font-medium mt-2 hover:underline"
                    >
                      <Eye className="w-4 h-4 text-[#fe640b]" />
                      {expandedSections[`${scheme._id}-benefit`] ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>

                {/* Required Documents Section - New Design */}
                <div className="mb-5 p-4 bg-[#fff7f0] rounded-2xl border border-[#ffd4b3] self-start">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-[#fe640b]" />
                    <h4 className="text-[#fe640b] font-semibold">Required Documents</h4>
                  </div>
                  {documentsArray.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {documentsArray.map((doc, index) => (
                        <li key={index} className="flex items-start gap-2 text-[#5c5f77]">
                          <span className="text-[#fe640b] mt-1"></span>
                          <span className="flex-1 text-[#4c4f69] text-left">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[#4c4f69] text-sm text-left">No documents specified</p>
                  )}
                </div>

                <div className="bg-[#fff7f0] rounded-2xl p-4 border border-[#fe640b]/30 self-start">
                  <h4 className="text-[#fe640b] font-semibold mb-2 text-left">Last Date</h4>
                  <p className="text-[#4c4f69] text-sm break-words overflow-wrap-anywhere text-left">
                    {scheme.lastDate || "Not specified"}
                  </p>
                </div>

                <div className="bg-[#fff7f0] rounded-2xl p-4 border border-[#fe640b]/30">
                  <h4 className="text-[#fe640b] font-semibold mb-2 text-left">Official Website</h4>
                  {scheme.officialWebsite ? (
                    <a 
                      href={scheme.officialWebsite} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#4c4f69] text-sm break-all hover:text-[#fe640b] transition-colors text-left block"
                    >
                      {scheme.officialWebsite}
                    </a>
                  ) : (
                    <p className="text-[#4c4f69] text-sm text-left">Not specified</p>
                  )}
                </div>

                <div className="bg-[#fff7f0] rounded-2xl p-4 border border-[#fe640b]/30">
                  <h4 className="text-[#fe640b] font-semibold mb-2 text-left">How to Apply</h4>
                  <p className="text-[#4c4f69] text-sm break-words overflow-wrap-anywhere text-left">
                    {expandedSections[`${scheme._id}-apply`] || scheme.applySteps?.length <= 100
                      ? scheme.applySteps || "Not specified"
                      : truncateText(scheme.applySteps, 100)}
                  </p>
                  {scheme.applySteps?.length > 100 && (
                    <button
                      onClick={() => toggleSection(`${scheme._id}-apply`)}
                      className="  flex items-center gap-2 text-[#fe640b] block text-left text-xs font-medium mt-2 hover:underline"
                    >
                      <Eye className="w-4 h-4 text-[#fe640b]" />
                      {expandedSections[`${scheme._id}-apply`] ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showSchemeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#dce0e8]">
              <h2 className="text-[#4c4f69] text-xl font-semibold">
                {editingScheme ? "Edit" : "Add"} Government Scheme
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

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-[#4c4f69] font-medium mb-2 text-left">Scheme Name</label>
                  <input
                    type="text"
                    name="schemeName"
                    value={formData.schemeName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                    placeholder="e.g., Pradhan Mantri Awas Yojana"
                  />
                </div>
              </div>

              <div className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#4c4f69] font-medium mb-2 text-left">Key Benefit</label>
                    <textarea
                      name="benefit"
                      value={formData.benefit}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                      placeholder="Describe the main benefit of this scheme"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4c4f69] font-medium mb-2 text-left">Eligibility Criteria</label>
                    <textarea
                      name="eligibility"
                      value={formData.eligibility}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                      placeholder="Who can apply for this scheme"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4c4f69] font-medium mb-2 text-left">Required Documents</label>
                    <textarea
                      name="requiredDocuments"
                      value={formData.requiredDocuments}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                      placeholder="List of required documents (separate with commas or new lines)"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4c4f69] font-medium mb-2 text-left">Application Deadline</label>
                    <input
                      type="text"
                      name="lastDate"
                      value={formData.lastDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                      placeholder="e.g., March 31, 2026"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4c4f69] font-medium mb-2 text-left">Official Website</label>
                    <input
                      type="url"
                      name="officialWebsite"
                      value={formData.officialWebsite}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                      placeholder="https://example.gov.in"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4c4f69] font-medium mb-2 text-left">How to Apply</label>
                    <textarea
                      name="applySteps"
                      value={formData.applySteps}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                      placeholder="Step-by-step application process"
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
                  {loading ? "Saving..." : editingScheme ? "Update" : "Add"} Scheme
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && schemeToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#fe640b]/10 flex items-center justify-center">
                <Trash className="w-6 h-6 text-[#fe640b]" />
              </div>
              <div>
                <h2 className="text-[#4c4f69] text-lg font-semibold">Delete Scheme?</h2>
              </div>
            </div>
            
            <p className="text-[#6c6f85] mb-6 text-left">
              Are you sure you want to delete <strong>"{schemeToDelete.schemeName}"</strong>? This action cannot be undone.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteDialog(false);
                  setSchemeToDelete(null);
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