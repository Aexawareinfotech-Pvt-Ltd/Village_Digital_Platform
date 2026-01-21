import { ArrowLeft, User, Mail, Phone, FileText, Download, Briefcase } from "lucide-react";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function JobApplicantsView({ job, onClose }) {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/job-applications/job/${job._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setApplicants(data);
      } else {
        setError(data.message || "Failed to fetch applicants");
      }
    } catch (error) {
      console.error("Error fetching applicants:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

 const handleDownload = () => {
  const doc = new jsPDF("p", "mm", "a4");

  // ===== TITLE =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Job Applicants Report", 105, 20, { align: "center" });

  // ===== DATE =====
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(
    `Generated on: ${new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })}`,
    105,
    28,
    { align: "center" }
  );

  // ===== JOB INFO =====
  doc.setFontSize(12);
  doc.text(`Job Title: ${job.title}`, 14, 42);
  doc.text(`Posted By: ${job.ownerName || "N/A"}`, 14, 50);
  doc.text(`Total Applicants: ${applicants.length}`, 14, 58);

  // ===== TABLE =====
  autoTable(doc, {
    startY: 66,
    head: [["No.", "Name", "Email", "Phone", "Applied On"]],
    body: applicants.map((applicant, index) => {
      const name =
        applicant.userId?.name || applicant.name || "-";
      const email =
        applicant.userId?.email || applicant.email || "-";
      const phone =
        applicant.userId?.phone || applicant.phone || "-";
      const appliedAt =
        applicant.createdAt || applicant.appliedAt;

      return [
        index + 1,
        name,
        email,
        phone,
        appliedAt
          ? new Date(appliedAt).toLocaleString("en-IN")
          : "-",
      ];
    }),
    theme: "plain", // clean professional look
    styles: {
      fontSize: 10,
      cellPadding: 4,
    },
    headStyles: {
      fontStyle: "bold",
    },
  });

  // ===== SAVE =====
  doc.save(`${job.title.replace(/\s+/g, "_")}_applicants.pdf`);
};


  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <div className="min-h-screen">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Jobs</span>
            </button>
          </div>
        </div>

        {/* Main Container */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#fe640b] rounded-2xl flex items-center justify-center shadow-lg">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl text-gray-900 mb-1">Job Applicants</h1>
                  <p className="text-gray-700 text-left font-medium">{job.title}</p>
                  <p className="text-sm text-gray-500 mt-1 text-left">
                    {applicants.length}{" "}
                    {applicants.length === 1 ? "applicant" : "applicants"}
                  </p>
                </div>
              </div>

              {applicants.length > 0 && (
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-6 py-3 bg-[#fe640b] text-white rounded-2xl font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <Download className="w-5 h-5" />
                  Download List
                </button>
              )}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
              <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Loading applicants...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl">
              {error}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && applicants.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-16 text-center border border-gray-100">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No applicants yet</p>
              <p className="text-gray-400 text-sm mt-2">
                Applicants will appear here once they apply for this job
              </p>
            </div>
          )}

          {/* Applicants List */}
          {!loading && !error && applicants.length > 0 && (
            <div className="space-y-4">
              {applicants.map((applicant, index) => {
                // Handle both populated userId and direct fields
                const name = applicant.userId?.name || applicant.name || "N/A";
                const email = applicant.userId?.email || applicant.email || "N/A";
                const phone = applicant.userId?.phone || applicant.phone || "N/A";
                const appliedDate = applicant.createdAt || applicant.appliedAt || new Date();
                
                return (
                  <div
                    key={applicant._id}
                    className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-[#fe640b] text-white rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                        <span className="text-lg font-bold">{index + 1}</span>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 text-left">
                          {name}
                        </h3>
                        <p className="text-sm text-gray-500 text-left">
                          Applied:{" "}
                          {new Date(appliedDate).toLocaleString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-16">
                      <div className="flex items-center gap-3 text-gray-700 bg-orange-50 px-4 py-3 rounded-xl">
                        <Mail className="w-5 h-5 text-[#fe640b] flex-shrink-0" />
                        <span className="text-sm font-medium">{email}</span>
                      </div>

                      <div className="flex items-center gap-3 text-gray-700 bg-orange-50 px-4 py-3 rounded-xl">
                        <Phone className="w-5 h-5 text-[#fe640b] flex-shrink-0" />
                        <span className="text-sm font-medium">{phone}</span>
                      </div>
                    </div>

                    {applicant.coverLetter && (
                      <div className="mt-4 ml-16">
                        <div className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
                          <div className="flex items-start gap-3">
                            <FileText className="w-5 h-5 text-[#fe640b] flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-700 mb-1">
                                Cover Letter
                              </p>
                              <p className="text-sm text-gray-600 text-left leading-relaxed">
                                {applicant.coverLetter}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}