import { useState } from "react";
import { Briefcase, X } from "lucide-react";

export default function PostJobModal({ onClose, onJobPosted }) {
  const [formData, setFormData] = useState({
    title: "",
    ownerName: "",
    ownerContact: "",
    description: "",
    category: "",
    jobType: "",
    location: "",
    salary: "",
    experience: "",
    deadlineDate: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/jobs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Job posted successfully! It will be reviewed by admin before being published.");
        if (onJobPosted) {
          onJobPosted();
        }
        onClose();
      } else {
        setError(data.message || "Failed to post job");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-latte-peach px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12  bg-opacity-20 rounded-2xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-left text-white">
                Post a New Job
              </h2>
              <p className="text-sm text-orange-100">
                Your job will be reviewed by admin before being published
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white  p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Job Title */}
          <div>
            <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
              Job Title <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Shop Assistant, Tractor Driver"
              className="w-full px-4 py-3 bg-white text-gray-800 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none placeholder-gray-400 transition-colors"
            />
          </div>

          {/* Name & Contact */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
                Your Name <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
                placeholder="Your full name"
                className="w-full px-4 py-3 bg-white text-gray-800 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none placeholder-gray-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
                Your Contact Number <span className="text-orange-600">*</span>
              </label>
              <input
                type="tel"
                name="ownerContact"
                value={formData.ownerContact}
                onChange={handleChange}
                required
                placeholder="10-digit mobile number"
                pattern="[0-9]{10}"
                className="w-full px-4 py-3 bg-white text-gray-800 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none placeholder-gray-400 transition-colors"
              />
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
              Job Description <span className="text-orange-600">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Describe the job responsibilities and requirements..."
              className="w-full px-4 py-3 bg-white text-gray-800 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none placeholder-gray-400 resize-none transition-colors"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
              Job Location <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g., Village Center, Taluka Office"
              className="w-full px-4 py-3 bg-white text-gray-800 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none placeholder-gray-400 transition-colors"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
              Salary <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              placeholder="e.g., ₹8,000 – ₹12,000 / month"
              className="w-full px-4 py-3 bg-white text-gray-800 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none placeholder-gray-400 transition-colors"
            />
          </div>

          {/* Application Deadline */}
          <div>
            <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
              Application Deadline <span className="text-orange-600">*</span>
            </label>
            <input
              type="date"
              name="deadlineDate"
              value={formData.deadlineDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 bg-white text-gray-800 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
              Experience Level <span className="text-orange-600">*</span>
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white text-gray-800 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors"
            >
              <option value="">Select experience</option>
              <option value="Fresher">Fresher</option>
              <option value="1-3 Years">1–3 Years</option>
              <option value="3-5 Years">3–5 Years</option>
              <option value="5+ Years">5+ Years</option>
            </select>
          </div>

          {/* Category & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
                Job Category <span className="text-orange-600">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white text-gray-800 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors"
              >
                <option value="">Select category</option>
                <option value="Retail">Retail</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Government">Government</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
                Job Type <span className="text-orange-600">*</span>
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white text-gray-800 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors"
              >
                <option value="">Select type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-semibold disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-latte-peach text-white rounded-xl"
            >
              {loading ? "Submitting..." : "Submit Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
