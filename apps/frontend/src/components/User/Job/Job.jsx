
import { useState, useEffect } from "react";
import { Plus, Briefcase } from "lucide-react";
import PostJobModal from "./PostJobModal";
import TrainingCard from "./TrainingCard";
import JobCard from "./JobCard";
import JobApplicantsView from "./JobApplicantsView";

/* ======================= STATIC DATA ======================= */

const GOVERNMENT_JOBS = [
  {
    id: "GOV001",
    title: "Village Accountant",
    ownerName: "District Administration",
    ownerContact: "Government Office",
    description: "Maintain village accounts, assist in government schemes, and handle documentation. Graduate degree required.",
    location: "Village Office",
    salary: "₹20,000 - ₹25,000/month",
    jobType: "Full-time",
    experience: "Experienced",
    category: "Government",
    postedDate: "2025-12-05",
    deadlineDate: "2025-12-20"
  },
  {
    id: "GOV002",
    title: "Anganwadi Worker",
    ownerName: "Women & Child Development",
    ownerContact: "Government Office",
    description: "Manage anganwadi center, provide nutrition to children, and conduct health awareness programs.",
    location: "Village Anganwadi",
    salary: "₹9,000 - ₹11,000/month",
    jobType: "Full-time",
    experience: "Fresher",
    category: "Government",
    postedDate: "2025-12-07",
    deadlineDate: "2025-12-23"
  }
];

const TRAINING_PROGRAMS = [
  {
    id: "TRN001",
    title: "Digital Marketing Basics",
    provider: "Skill India",
    description: "Learn social media marketing, online advertising, and content creation. 3-month course with certification.",
    duration: "3 months",
    fee: "Free",
    mode: "Online & Offline",
    eligibility: "10th Pass",
    startDate: "2026-01-05"
  },
  {
    id: "TRN002",
    title: "Organic Farming Techniques",
    provider: "Agricultural Department",
    description: "Modern organic farming methods, composting, and natural pest control. Practical training included.",
    duration: "1 month",
    fee: "Free",
    mode: "Offline",
    eligibility: "Farmers",
    startDate: "2025-12-28"
  },
  {
    id: "TRN003",
    title: "Mobile Repair Course",
    provider: "Technical Training Center",
    description: "Learn smartphone hardware and software repair. Includes tools and certification.",
    duration: "2 months",
    fee: "₹2,000",
    mode: "Offline",
    eligibility: "12th Pass",
    startDate: "2026-01-10"
  }
];

/* ======================= MAIN COMPONENT ======================= */

export default function Job() {
  const [activeTab, setActiveTab] = useState("local");
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [approvedJobs, setApprovedJobs] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedJobForApplicants, setSelectedJobForApplicants] = useState(null);

  const fetchApprovedJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/api/jobs/approved");
      const data = await response.json();

      if (response.ok) {
        setApprovedJobs(data);
      } else {
        setError(data.message || "Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMyJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/job-applications/my-applications", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (response.ok) {
        setMyJobs(data);
      } else {
        setError(data.message || "Failed to fetch your jobs");
      }
    } catch (error) {
      console.error("Error fetching my jobs:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "local") {
      fetchApprovedJobs();
    } else if (activeTab === "myJobs") {
      fetchMyJobs();
    }
  }, [activeTab]);

  const handleJobPosted = () => {
    fetchApprovedJobs();
    if (activeTab === "myJobs") {
      fetchMyJobs();
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

  const handleViewApplicants = (job) => {
    setSelectedJobForApplicants(job);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "local":
        if (loading) {
          return (
            <div className="text-center py-16">
              <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 mt-4">Loading jobs...</p>
            </div>
          );
        }

        if (error) {
          return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl">
              {error}
            </div>
          );
        }

        if (approvedJobs.length === 0) {
          return (
            <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No approved jobs available at the moment.</p>
            </div>
          );
        }

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

      case "myJobs":
        if (loading) {
          return (
            <div className="text-center py-16">
              <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 mt-4">Loading your jobs...</p>
            </div>
          );
        }

        if (error) {
          return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl">
              {error}
            </div>
          );
        }

        if (myJobs.length === 0) {
          return (
            <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">You haven't posted any jobs yet</p>
              <p className="text-gray-500 text-sm">Click "Post a Job" to create your first job listing</p>
            </div>
          );
        }

        return (
          <div className="space-y-5">
            {myJobs.map((application) => {
  const job = application.jobId; // ✅ extract actual job

  return (
    <JobCard
      key={job._id}
      job={{
        ...job,
        posted: formatDate(job.postedDate),
        deadline: formatDate(job.deadlineDate),
        type: job.jobType,
        level: job.experience
      }}
      isOwnJob={true}
      onViewApplicants={() => handleViewApplicants(job)}
    />
  );
})}

          </div>
        );

      case "government":
        return (
          <div className="space-y-5">
            {GOVERNMENT_JOBS.map((job) => (
              <JobCard 
                key={job.id} 
                job={{
                  ...job,
                  posted: job.postedDate,
                  deadline: job.deadlineDate,
                  type: job.jobType,
                  level: job.experience
                }} 
                isOwnJob={false}
              />
            ))}
          </div>
        );

      case "training":
        return (
          <div className="space-y-5">
            {TRAINING_PROGRAMS.map((program) => (
              <TrainingCard key={program.id} program={program} />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (selectedJobForApplicants) {
    return (
      <JobApplicantsView
        job={selectedJobForApplicants}
        onClose={() => setSelectedJobForApplicants(null)}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <main className="max-w-5xl mx-auto px-4 py-8 mt-8">
        {/* Post Job Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowPostJobModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-latte-peach text-white rounded-2xl "
          >
            <Plus className="w-5 h-5" />
            Post a Job
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab("local")}
            className={`px-6 py-3 rounded-2xl font-medium transition-all ${
              activeTab === "local"
                ? "bg-latte-peach text-white shadow-lg"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-latte-peach hover:shadow-md"
            }`}
          >
            Local Jobs
          </button>
          <button
            onClick={() => setActiveTab("myJobs")}
            className={`px-6 py-3 rounded-2xl font-medium transition-all ${
              activeTab === "myJobs"
                ? "bg-latte-peach text-white shadow-lg"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-latte-peach hover:shadow-md"
            }`}
          >
            My Jobs
          </button>
          <button
            onClick={() => setActiveTab("government")}
            className={`px-6 py-3 rounded-2xl font-medium transition-all ${
              activeTab === "government"
                ? "bg-latte-peach text-white shadow-lg"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-latte-peach hover:shadow-md"
            }`}
          >
            Government Jobs
          </button>
          <button
            onClick={() => setActiveTab("training")}
            className={`px-6 py-3 rounded-2xl font-medium transition-all ${
              activeTab === "training"
                ? "bg-latte-peach text-white shadow-lg"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-latte-peach hover:shadow-md"
            }`}
          >
            Skill Training
          </button>
        </div>

        {renderContent()}
      </main>

      {/* Post Job Modal */}
      {showPostJobModal && (
        <PostJobModal
          onClose={() => setShowPostJobModal(false)}
          onJobPosted={handleJobPosted}
        />
      )}
    </div>
  );
}
