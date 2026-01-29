import { useState, useEffect } from "react";
import { Briefcase, Clock, CheckCircle, Landmark } from "lucide-react";
import { PendingJobsTab } from "./PendingJobsTab";
import { ApprovedJobsTab } from "./ApprovedJobsTab";
import { AddGovernmentJobModal } from "./AddGovernmentJobModal";
import Stat from "../../Common/Stat";
import { socket } from "../../../Socket/socket";



export function JobPortalContent() {
  const [activeTab, setActiveTab] = useState("pending");
  const [showGovJobModal, setShowGovJobModal] = useState(false);
  const [jobAnalytics, setJobAnalytics] = useState({
    totalJobs : 0,
    pendingJobs : 0,
    approvedJobs : 0,
    governmentJobs: 0,
  })

    const fetchJobAnalytics = async () => {
      const res = await fetch("http://localhost:3000/api/jobs/analytics", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
  
      const data = await res.json();
      if (data.success) {
        setJobAnalytics(data.data);
      }
    };
  
    useEffect(() => {
      fetchJobAnalytics();
  
      socket.on("job:analytics:update", fetchJobAnalytics);
  
      return () => {
        socket.off("job:analytics:update", fetchJobAnalytics);
      };
    }, []);

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-6">
      <Stat title="Total Jobs" value={jobAnalytics?.totalJobs + jobAnalytics?.governmentJobs} icon={<Briefcase />} />
      <Stat title="Government Jobs" value={jobAnalytics?.governmentJobs} icon={<Landmark/>}/>
      <Stat title="Pending Jobs" value={jobAnalytics?.pendingJobs} icon={<Clock />} />
      <Stat title="Approved Jobs" value={jobAnalytics?.approvedJobs} icon={<CheckCircle />} />
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