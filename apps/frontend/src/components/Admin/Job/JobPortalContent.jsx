import { useState } from "react";
import { Plus } from "lucide-react";
import { PendingJobsTab } from "./PendingJobsTab";
import { ApprovedJobsTab } from "./ApprovedJobsTab";
import { AddGovernmentJobModal } from "./AddGovernmentJobModal";


export function JobPortalContent() {
  const [activeTab, setActiveTab] = useState("pending");
  const [showGovJobModal, setShowGovJobModal] = useState(false);

  return (
    <div className="p-0">  {/* Changed from p-6 to p-0 */}
      <div className="flex items-center justify-between mb-6 px-6 pt-6">  {/* Added px-6 pt-6 here */}
        <div>
          <h1 className="text-[#fe640b]">Job Portal & Skill Development</h1>
          <p className="text-[#6c6f85] mt-1">
            Manage job postings and training programs
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 h-14 bg-white shadow-md p-1 mb-6 mx-6 rounded-xl">  {/* Added mx-6 */}
        <button
          onClick={() => setActiveTab("pending")}
          className={`rounded-2xl ${
            activeTab === "pending"
              ? "bg-[#fe640b] text-white"
              : "hover:bg-[]"
          }`}
        >
          Pending Jobs
        </button>

        <button
          onClick={() => setActiveTab("approved")}
          className={`rounded-2xl ${
            activeTab === "approved"
              ? "bg-[#fe640b] text-white"
              : "hover:bg-[]"
          }`}
        >
          Approved Jobs
        </button>

        <button
          onClick={() => setActiveTab("government")}
          className={`rounded-2xl ${
            activeTab === "government"
              ? "bg-[#fe640b] text-white"
              : "hover:bg-[]"
          }`}
        >
          Government Jobs
        </button>
      </div>

      <div className="px-6 pb-6">  {/* Added wrapper with padding */}
        {activeTab === "pending" && <PendingJobsTab />}
        {activeTab === "approved" && <ApprovedJobsTab />}
        {activeTab === "government" &&  <AddGovernmentJobModal
        open={showGovJobModal}
        onOpenChange={setShowGovJobModal}
      />}
      </div>

    </div>
  );
}