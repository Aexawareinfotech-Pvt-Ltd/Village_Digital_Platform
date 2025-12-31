
import { useEffect, useState } from "react";
import { Clock, Check, X, MapPin, Briefcase, Calendar } from "lucide-react";

export function PendingJobsTab() {
  const [pendingJobs, setPendingJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPendingJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("tokens");
      const response = await fetch("http://localhost:3000/api/jobs/pending", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setPendingJobs(data);
      } else {
        setError(data.message || "Failed to fetch pending jobs");
      }
    } catch (error) {
      console.error("Error fetching pending jobs:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingJobs();
  }, []);

  const handleApprove = async (jobId) => {
    try {
      const token = localStorage.getItem("tokens");
      const response = await fetch(`http://localhost:3000/api/jobs/approve/${jobId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        alert("Job approved successfully!");
        fetchPendingJobs();
      } else {
        alert(data.message || "Failed to approve job");
      }
    } catch (error) {
      console.error("Error approving job:", error);
      alert("Network error. Please try again.");
    }
  };

  const handleReject = async (jobId) => {
    if (!confirm("Are you sure you want to reject this job?")) {
      return;
    }

    try {
      const token = localStorage.getItem("tokens");
      const response = await fetch(`http://localhost:3000/api/jobs/reject/${jobId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        alert("Job rejected successfully!");
        fetchPendingJobs();
      } else {
        alert(data.message || "Failed to reject job");
      }
    } catch (error) {
      console.error("Error rejecting job:", error);
      alert("Network error. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Retail":
        return "bg-orange-100 text-orange-600";
      case "Agriculture":
        return "bg-green-100 text-green-600";
      case "Education":
        return "bg-blue-100 text-blue-600";
      case "Healthcare":
        return "bg-pink-100 text-pink-600";
      case "Government":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-12 text-center">
        <p className="text-[#6c6f85]">Loading pending jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (pendingJobs.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#e6e9ef] mb-4">
          <Clock className="w-10 h-10 text-[#fe640b]" />
        </div>
        <p className="text-[#6c6f85]">No pending jobs for approval</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pendingJobs.map((job) => (
        <div
          key={job._id}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                    job.category
                  )}`}
                >
                  {job.category}
                </span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Posted by:</strong> {job.ownerName} ({job.ownerContact})
                </p>
                {job.createdBy && (
                  <p>
                    <strong>User:</strong> {job.createdBy.name} ({job.createdBy.email})
                  </p>
                )}
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-left mb-4 text-sm leading-relaxed">
            {job.description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Briefcase className="w-4 h-4" />
              <span>{job.jobType}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Exp: {job.experience}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="font-medium">{job.salary}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Calendar className="w-4 h-4" />
            <span>
              Posted: {formatDate(job.postedDate)} | Deadline: {formatDate(job.deadlineDate)}
            </span>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => handleApprove(job._id)}
              className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-colors"
            >
              <Check className="w-4 h-4" />
              Approve
            </button>
            <button
              onClick={() => handleReject(job._id)}
              className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
