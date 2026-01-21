import { useState } from "react";
import { X, Send, User } from "lucide-react";

export default function ApplyJobModal({ job, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: ""
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

const response = await fetch(
  `http://localhost:3000/api/job-applications/apply/${job._id}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    })
  }
);

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Failed to submit application");
      return;
    }

    alert("Application submitted successfully!");
    onClose();
  } catch (error) {
    console.error("Error submitting application:", error);
    setError("Network error. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-latte-peach px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12  bg-opacity-20 rounded-2xl flex items-center justify-center">
              <Send className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl text-left text-white">
                Apply for Job
              </h2>
              <p className="text-sm text-orange-100 text-left">
                {job.title}
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

          {/* Job Info */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-2 text-left">Job Details</h3>
            <div className="space-y-1 text-sm">
              <p className="text-gray-700 text-left"><span className="font-medium">Company:</span> {job.ownerName}</p>
              <p className="text-gray-700 text-left"><span className="font-medium">Location:</span> {job.location}</p>
              <p className="text-gray-700 text-left"><span className="font-medium">Salary:</span> {job.salary}</p>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
              Your Full Name <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-white text-gray-800 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none placeholder-gray-400 transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
              Email Address <span className="text-orange-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 bg-white text-gray-800 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none placeholder-gray-400 transition-colors"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
              Phone Number <span className="text-orange-600">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="10-digit mobile number"
              pattern="[0-9]{10}"
              className="w-full px-4 py-3 bg-white text-gray-800 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none placeholder-gray-400 transition-colors"
            />
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
              className="flex-1 px-6 py-3 bg-[#fe640b] text-white rounded-xl "
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}