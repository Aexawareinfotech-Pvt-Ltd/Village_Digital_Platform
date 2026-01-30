import { useState, useEffect } from "react";
import { Plus, Trash2, X, AlertCircle, Loader2, Trash, Pencil, Eye, Building, Calendar, MapPin, DollarSign, Briefcase } from "lucide-react";

export  function AddGovernmentJobModal({ open, onOpenChange }) {
  const [jobs, setJobs] = useState([]);
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    applicationLink: "",
    description: "",
    category: "",
    jobType: "",
    location: "",
    salary: "",
    experience: "",
    deadlineDate: ""
  });

  const API_BASE_URL = "http://localhost:3000/api/government-jobs";

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
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
      
      setJobs(data.data || []);
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

      if (editingJob) {
        response = await fetch(`${API_BASE_URL}/update/${editingJob._id}`, {
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

      await fetchJobs();
      closeModal();
    } catch (err) {
      setError(err.message);
      console.error("Error saving:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!jobToDelete) return;

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/delete/${jobToDelete._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete");

      setJobs(jobs.filter((j) => j._id !== jobToDelete._id));
      setShowDeleteDialog(false);
      setJobToDelete(null);
    } catch (err) {
      setError(err.message);
      console.error("Error deleting:", err);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteDialog = (job) => {
    setJobToDelete(job);
    setShowDeleteDialog(true);
  };

  const openModal = (job = null) => {
    if (job) {
      setEditingJob(job);
      setFormData({
        title: job.title || "",
        applicationLink: job.applicationLink || "",
        description: job.description || "",
        category: job.category || "",
        jobType: job.jobType || "",
        location: job.location || "",
        salary: job.salary || "",
        experience: job.experience || "",
        deadlineDate: job.deadlineDate ? job.deadlineDate.split('T')[0] : "",
      });
    } else {
      setEditingJob(null);
      setFormData({
        title: "",
        applicationLink: "",
        description: "",
        category: "",
        jobType: "",
        location: "",
        salary: "",
        experience: "",
        deadlineDate: ""
      });
    }
    setShowJobModal(true);
    setError("");
  };

  const closeModal = () => {
    setShowJobModal(false);
    setEditingJob(null);
    setError("");
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => openModal()}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-[#fe640b] text-white rounded-2xl "
        >
          <Plus className="w-4 h-4" />
          Add Job
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {loading && jobs.length === 0 && (
        <div className="p-8 text-center">
          <Loader2 className="w-8 h-8 text-[#fe640b] animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading government jobs...</p>
        </div>
      )}

      {!loading && jobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#6c6f85]">No government jobs found. Add one to get started!</p>
        </div>
      )}

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="border-2 border-[#fe640b]/20 rounded-2xl p-6 hover:shadow-md transition-shadow bg-gradient-to-br from-[#fe640b]/5 to-transparent"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-left flex-1">
                <h3 className="text-[#fe640b] font-semibold text-xl mb-2" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
                  {job.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-block px-3 py-1 bg-[#fe640b] text-white text-sm rounded-full">
                    {job.category}
                  </span>
                  <span className="inline-block px-3 py-1 bg-[#fe640b] text-white text-sm rounded-full">
                    {job.jobType}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(job)}
                  disabled={loading}
                  className="p-2 text-[#fe640b] hover:bg-[#fe640b]/10 rounded-2xl"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openDeleteDialog(job)}
                  disabled={loading}
                  className="p-2 text-[#d20f39] hover:bg-[#fe640b]/10 rounded-2xl "
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-[#4c4f69]">
                <MapPin className="w-4 h-4 text-[#fe640b]" />
                <span className="text-sm">{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-[#4c4f69]">
                <DollarSign className="w-4 h-4 text-[#fe640b]" />
                <span className="text-sm">{job.salary}</span>
              </div>
              <div className="flex items-center gap-2 text-[#4c4f69]">
                <Briefcase className="w-4 h-4 text-[#fe640b]" />
                <span className="text-sm">{job.experience}</span>
              </div>
              <div className="flex items-center gap-2 text-[#4c4f69]">
                <Calendar className="w-4 h-4 text-[#fe640b]" />
                <span className="text-sm">Deadline: {formatDate(job.deadlineDate)}</span>
              </div>
            </div>

            <div className="bg-[#fff7f0] rounded-2xl p-4 border border-[#fe640b]/30">
              <h4 className="text-[#fe640b] font-semibold mb-2 text-left">Job Description</h4>
              <p className="text-[#4c4f69] text-sm break-words overflow-wrap-anywhere text-left whitespace-pre-line">
                {expandedSections[`${job._id}-desc`] || job.description?.length <= 150
                  ? job.description
                  : truncateText(job.description, 150)}
              </p>
              {job.description?.length > 150 && (
                <button
                  onClick={() => toggleSection(`${job._id}-desc`)}
                  className="flex items-center gap-2 text-[#fe640b] text-xs font-medium mt-2 hover:underline"
                >
                  <Eye className="w-4 h-4 text-[#fe640b]" />
                  {expandedSections[`${job._id}-desc`] ? "Read Less" : "Read More"}
                </button>
              )}
            </div>

            {job.applicationLink && (
              <div className="mt-4">
                <a
                  href={job.applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#fe640b] text-white rounded-2xl text-sm"
                >
                  Apply Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#dce0e8]">
              <h2 className="text-[#4c4f69] text-xl font-semibold">
                {editingJob ? "Edit" : "Add"} Government Job
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
                <label className="block text-[#4c4f69] font-medium mb-2 text-left">
                  Job Title <span className="text-[#fe640b]">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                  placeholder="e.g., Junior Clerk, Peon, Driver"
                />
              </div>

              <div>
                <label className="block text-[#4c4f69] font-medium mb-2 text-left">
                  Application Link <span className="text-[#fe640b]">*</span>
                </label>
                <input
                  type="url"
                  name="applicationLink"
                  value={formData.applicationLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                  placeholder="https://example.gov.in/apply"
                />
              </div>

              <div>
                <label className="block text-[#4c4f69] font-medium mb-2 text-left">
                  Description <span className="text-[#fe640b]">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                  placeholder="Describe the job responsibilities and requirements..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#4c4f69] font-medium mb-2 text-left">
                    Category <span className="text-[#fe640b]">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                  >
                    <option value="">Select category</option>
                    <option value="Administrative">Administrative</option>
                    <option value="Technical">Technical</option>
                    <option value="Education">Education</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Police">Police</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#4c4f69] font-medium mb-2 text-left">
                    Job Type <span className="text-[#fe640b]">*</span>
                  </label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                  >
                    <option value="">Select type</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Contract">Contract</option>
                    <option value="Temporary">Temporary</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#4c4f69] font-medium mb-2 text-left">
                    Location <span className="text-[#fe640b]">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                    placeholder="e.g., District Office"
                  />
                </div>

                <div>
                  <label className="block text-[#4c4f69] font-medium mb-2 text-left">
                    Salary <span className="text-[#fe640b]">*</span>
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                    placeholder="e.g., ₹15,000 – ₹25,000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#4c4f69] font-medium mb-2 text-left">
                    Experience <span className="text-[#fe640b]">*</span>
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                  >
                    <option value="">Select experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="1-3 Years">1–3 Years</option>
                    <option value="3-5 Years">3–5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#4c4f69] font-medium mb-2 text-left">
                    Deadline <span className="text-[#fe640b]">*</span>
                  </label>
                  <input
                    type="date"
                    name="deadlineDate"
                    value={formData.deadlineDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-[#dce0e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fe640b] text-[#4c4f69]"
                  />
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
                  {loading ? "Saving..." : editingJob ? "Update" : "Add"} Job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && jobToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#fe640b]/10 flex items-center justify-center">
                <Trash className="w-6 h-6 text-[#fe640b]" />
              </div>
              <div>
                <h2 className="text-[#4c4f69] text-lg font-semibold">Delete Job?</h2>
              </div>
            </div>
            
            <p className="text-[#6c6f85] mb-6 text-left">
              Are you sure you want to delete <strong>"{jobToDelete.title}"</strong>? This action cannot be undone.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteDialog(false);
                  setJobToDelete(null);
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