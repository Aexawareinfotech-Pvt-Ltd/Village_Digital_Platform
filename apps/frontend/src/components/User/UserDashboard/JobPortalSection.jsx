import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  IndianRupee,
  Building2 
} from 'lucide-react';


export function JobPortalSection() {
  const [activeTab, setActiveTab] = useState('local');
  const [localJobs, setLocalJobs] = useState([]);
  const navigate = useNavigate();

  /* ================= FETCH APPROVED JOBS ================= */
  useEffect(() => {
    const fetchApprovedJobs = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/jobs/approved');
        const data = await res.json();

        if (res.ok) {
          setLocalJobs(data);
        }
      } catch (err) {
        console.error('Error fetching approved jobs', err);
      }
    };

    fetchApprovedJobs();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

const handleViewAllJobs = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/VillageLogin");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/users/me", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Unauthorized");
    }

    const data = await res.json();

    if (data.success) {
      navigate("/job");
    }
  } catch (error) {
    navigate("/VillageLogin");
  }
};

  return (
    <section className="py-16 bg-gray-50" id="jobs">
      <div className="container mx-auto px-4 mt-0">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Job Portal & Skill Development
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore local job opportunities, government positions, and skill development programs
          </p>
        </div>

        <div className="max-w-6xl mx-auto">

          {/* ================= LOCAL JOBS ================= */}
          {activeTab === 'local' && (
            <div className="space-y-4">
              {[...localJobs]
                .sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
                .slice(0, 4)
                .map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-200"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 bg-[#fff3e0] rounded-2xl flex items-center justify-center flex-shrink-0">
                            <Briefcase className="w-6 h-6 text-[#ff6b35]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-1 text-left">
                              {job.title}
                            </h3>
                            <p className="text-gray-600 flex items-center gap-2">
                              <Building2 className="w-4 h-4" />
                              {job.companyName || 'Local Employer'}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-3">
                          <span className="inline-flex items-center px-3 py-1 bg-[#fff3e0] text-[#ff6b35] text-sm rounded-full">
                            <MapPin className="w-3 h-3 mr-1" />
                            {job.location}
                          </span>

                          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                            {job.jobType}
                          </span>

                          <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">
                            <IndianRupee className="w-3 h-3 mr-1" />
                            {job.salary}
                          </span>
                        </div>

                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          Posted {formatDate(job.postedDate)}
                        </div>
                      </div>

                      <button 
                      onClick={handleViewAllJobs}
                      className="px-6 py-2 bg-[#ff6b35] text-white rounded-2xl hover:bg-[#ff8c42] transition-colors font-medium md:self-center">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-center mt-6">
                <button 
                onClick={handleViewAllJobs}
                className="px-6 py-2 border border-[#ff6b35] text-[#ff6b35] rounded-2xl hover:bg-[#fff3e0] transition-colors">
                  View All Local Jobs
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
