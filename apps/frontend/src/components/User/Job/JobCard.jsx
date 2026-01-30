import { MapPin, Clock, Briefcase, Eye, Calendar } from "lucide-react";
import { useState } from "react";
import ApplyJobModal from "./ApplyJobModal";

const getCategoryColor = (category) => {
  switch (category) {
    case "Retail":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "Agriculture":
      return "bg-orange-100 text-orange-500 border-orange-200";
    case "Education":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "Healthcare":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "Government":
      return "bg-orange-100 text-orange-700 border-orange-200";
    default:
      return "bg-orange-100 text-orange-700 border-orange-200";
  }
};

export default function JobCard({ job, isOwnJob = false, onViewApplicants }) {
  const [showApplyModal, setShowApplyModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-latte-peach rounded-xl flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-5 h-5 text-white" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 text-left" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
                {job.title}
              </h3>
             <p className="text-sm text-gray-600 text-left flex items-center gap-2">
  <span className="font-medium">
    {job.ownerName || "Local Employer"}
  </span>
  <span className="text-gray-400">•</span>
  <span>
    {job.ownerContact || "N/A"}
  </span>
</p>

            </div>
          </div>

          {job.category && (
            <span
              className={`px-4 py-2 rounded-xl text-sm font-semibold border ${getCategoryColor(
                job.category
              )}`}
            >
              {job.category}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed mb-5 text-left" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
          {job.description || "No description provided."}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 mb-5 text-sm">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-2xl">
            <MapPin className="w-4 h-4 text-latte-peach" />
            <span>{job.location}</span>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-2xl">
            <Clock className="w-4 h-4 text-latte-peach" />
            <span>{job.type}</span>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-2xl">
            <Briefcase className="w-4 h-4 text-latte-peach" />
            <span>{job.level}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
              Salary Range
            </p>
            <p className="text-lg font-bold text-gray-900">
              {job.salary || job.salaryRange || "Not disclosed"}
            </p>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
              <Calendar className="w-4 h-4 text-latte-peach" />
              <span>Posted: {job.posted}</span>
              <span className="text-gray-400">•</span>
              <span>Deadline: {job.deadline}</span>
            </div>

            {/* Action Button */}
            <div className="flex justify-end mt-4">
            {isOwnJob ? (
              <button
                onClick={onViewApplicants}
                className="flex items-center gap-2 bg-latte-peach text-white px-6 py-2.5 rounded-xl font-semibold shadow-md "
              >
                <Eye className="w-4 h-4" />
                View Applicants
              </button>
            ) : (
              <button
                onClick={() => setShowApplyModal(true)}
                className="bg-latte-peach text-white px-8 py-2.5 rounded-xl font-semibold  shadow-md"
              >
                Apply Now
              </button>
            )}
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <ApplyJobModal
          job={job}
          onClose={() => setShowApplyModal(false)}
        />
      )}
    </>
  );
}
