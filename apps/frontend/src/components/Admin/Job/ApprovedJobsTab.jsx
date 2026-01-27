import { useState, useEffect } from "react";
import { CircleCheck, Loader2, AlertCircle } from "lucide-react";
import JobCard from "../../User/Job/JobCard";

export function ApprovedJobsTab() {
  const [approvedJobs, setApprovedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApprovedJobs();
  }, []);

  const fetchApprovedJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/api/jobs/approved");
      const data = await response.json();

      if (response.ok) {
        setApprovedJobs(data);
      } else {
        setError(data.message || "Failed to fetch approved jobs");
      }
    } catch (error) {
      console.error("Error fetching approved jobs:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Loading State
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-12 text-center">
        <Loader2 className="w-12 h-12 text-[#fe640b] animate-spin mx-auto mb-4" />
        <p className="text-[#6c6f85]">Loading approved jobs...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center gap-3 text-red-700 bg-red-50 border border-red-200 rounded-xl p-4">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  // Empty State
  if (approvedJobs.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#e6e9ef] mb-4">
          <CircleCheck className="w-10 h-10 text-[#fe640b]" />
        </div>
        <p className="text-[#6c6f85] text-lg mb-2">No approved jobs yet</p>
        <p className="text-[#9ca0b0] text-sm">Approved jobs will appear here once available</p>
      </div>
    );
  }

  // Jobs List
  return (
    <div className="space-y-5">
      {approvedJobs.map((job) => (
        <JobCard
          key={job._id}
          job={{
            ...job,
            posted: formatDate(job.postedDate),
            deadline: formatDate(job.deadlineDate),
            type: job.jobType,
            level: job.experience
          }}
          isOwnJob={false}
        />
      ))}
    </div>
  );
}