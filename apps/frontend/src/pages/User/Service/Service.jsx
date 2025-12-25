const Service = () => {
    return (
        <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to the Service Page</h1>
            <p className="text-lg text-gray-700">This is the service section of the application.</p>
        </div>
    );
}

export default Service;




// import { useState } from "react";
// import { Briefcase, X } from "lucide-react";

// export default function PostJobModal({ onClose, onJobPosted }) {
//   const [formData, setFormData] = useState({
//     title: "",
//     ownerName: "",
//     ownerContact: "",
//     description: "",
//     category: "",
//     jobType: "",
//     location: "",
//     salary: "",
//     experience: "",
//     deadlineDate: ""
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const token = localStorage.getItem("token");

//       const response = await fetch("http://localhost:5000/api/jobs/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Job posted successfully! It will be reviewed by admin before being published.");
//         if (onJobPosted) {
//           onJobPosted();
//         }
//         onClose();
//       } else {
//         setError(data.message || "Failed to post job");
//       }
//     } catch (error) {
//       console.error("Error posting job:", error);
//       setError("Network error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center">
//               <Briefcase className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h2 className="text-xl font-bold text-left text-gray-800">
//                 Post a New Job
//               </h2>
//               <p className="text-sm text-gray-600">
//                 Your job will be reviewed by admin before being published
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
//               {error}
//             </div>
//           )}

//           {/* Job Title */}
//           <div>
//             <label className="block text-sm text-left font-medium text-gray-700 mb-2">
//               Job Title <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               required
//               placeholder="e.g., Shop Assistant, Tractor Driver"
//               className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 focus:border-orange-500 focus:outline-none placeholder-gray-400"
//             />
//           </div>

//           {/* Name & Contact */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm text-left font-medium text-gray-700 mb-2">
//                 Your Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="ownerName"
//                 value={formData.ownerName}
//                 onChange={handleChange}
//                 required
//                 placeholder="Your full name"
//                 className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 focus:border-orange-500 focus:outline-none placeholder-gray-400"
//               />
//             </div>

//             <div>
//               <label className="block text-sm text-left font-medium text-gray-700 mb-2">
//                 Your Contact Number <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="tel"
//                 name="ownerContact"
//                 value={formData.ownerContact}
//                 onChange={handleChange}
//                 required
//                 placeholder="10-digit mobile number"
//                 pattern="[0-9]{10}"
//                 className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 focus:border-orange-500 focus:outline-none placeholder-gray-400"
//               />
//             </div>
//           </div>

//           {/* Job Description */}
//           <div>
//             <label className="block text-sm text-left font-medium text-gray-700 mb-2">
//               Job Description <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//               rows="4"
//               placeholder="Describe the job responsibilities and requirements..."
//               className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 focus:border-orange-500 focus:outline-none placeholder-gray-400 resize-none"
//             />
//           </div>

//           {/* Location */}
//           <div>
//             <label className="block text-sm text-left font-medium text-gray-700 mb-2">
//               Job Location <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               required
//               placeholder="e.g., Village Center, Taluka Office"
//               className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 focus:border-orange-500 focus:outline-none placeholder-gray-400"
//             />
//           </div>

//           {/* Salary */}
//           <div>
//             <label className="block text-sm text-left font-medium text-gray-700 mb-2">
//               Salary <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="salary"
//               value={formData.salary}
//               onChange={handleChange}
//               required
//               placeholder="e.g., ₹8,000 – ₹12,000 / month"
//               className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 focus:border-orange-500 focus:outline-none placeholder-gray-400"
//             />
//           </div>

//           {/* Application Deadline */}
//           <div>
//             <label className="block text-sm text-left font-medium text-gray-700 mb-2">
//               Application Deadline <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               name="deadlineDate"
//               value={formData.deadlineDate}
//               onChange={handleChange}
//               required
//               min={new Date().toISOString().split('T')[0]}
//               className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 focus:border-orange-500 focus:outline-none"
//             />
//           </div>

//           {/* Experience Level */}
//           <div>
//             <label className="block text-sm text-left font-medium text-gray-700 mb-2">
//               Experience Level <span className="text-red-500">*</span>
//             </label>
//             <select
//               name="experience"
//               value={formData.experience}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 focus:border-orange-500 focus:outline-none"
//             >
//               <option value="">Select experience</option>
//               <option value="Fresher">Fresher</option>
//               <option value="1-3 Years">1–3 Years</option>
//               <option value="3-5 Years">3–5 Years</option>
//               <option value="5+ Years">5+ Years</option>
//             </select>
//           </div>

//           {/* Category & Type */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm text-left font-medium text-gray-700 mb-2">
//                 Job Category <span className="text-red-500">*</span>
//               </label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 focus:border-orange-500 focus:outline-none"
//               >
//                 <option value="">Select category</option>
//                 <option value="Retail">Retail</option>
//                 <option value="Agriculture">Agriculture</option>
//                 <option value="Education">Education</option>
//                 <option value="Healthcare">Healthcare</option>
//                 <option value="Government">Government</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm text-left font-medium text-gray-700 mb-2">
//                 Job Type <span className="text-red-500">*</span>
//               </label>
//               <select
//                 name="jobType"
//                 value={formData.jobType}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 focus:border-orange-500 focus:outline-none"
//               >
//                 <option value="">Select type</option>
//                 <option value="Full-time">Full-time</option>
//                 <option value="Part-time">Part-time</option>
//                 <option value="Contract">Contract</option>
//                 <option value="Temporary">Temporary</option>
//               </select>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex gap-4 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               disabled={loading}
//               className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 transition-colors disabled:opacity-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? "Submitting..." : "Submit Job"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }




// import { useState, useEffect } from "react";
// import { Plus } from "lucide-react";
// import PostJobModal from "./PostJobModal";
// import TrainingCard from "./TrainingCard";
// import JobCard from "./JobCard";

// /* ======================= STATIC DATA ======================= */

// const GOVERNMENT_JOBS = [
//   {
//     id: "GOV001",
//     title: "Village Accountant",
//     ownerName: "District Administration",
//     ownerContact: "Government Office",
//     description: "Maintain village accounts, assist in government schemes, and handle documentation. Graduate degree required.",
//     location: "Village Office",
//     salary: "₹20,000 - ₹25,000/month",
//     jobType: "Full-time",
//     experience: "Experienced",
//     category: "Government",
//     postedDate: "2025-12-05",
//     deadlineDate: "2025-12-20"
//   },
//   {
//     id: "GOV002",
//     title: "Anganwadi Worker",
//     ownerName: "Women & Child Development",
//     ownerContact: "Government Office",
//     description: "Manage anganwadi center, provide nutrition to children, and conduct health awareness programs.",
//     location: "Village Anganwadi",
//     salary: "₹9,000 - ₹11,000/month",
//     jobType: "Full-time",
//     experience: "Fresher",
//     category: "Government",
//     postedDate: "2025-12-07",
//     deadlineDate: "2025-12-23"
//   }
// ];

// const TRAINING_PROGRAMS = [
//   {
//     id: "TRN001",
//     title: "Digital Marketing Basics",
//     provider: "Skill India",
//     description: "Learn social media marketing, online advertising, and content creation. 3-month course with certification.",
//     duration: "3 months",
//     fee: "Free",
//     mode: "Online & Offline",
//     eligibility: "10th Pass",
//     startDate: "2026-01-05"
//   },
//   {
//     id: "TRN002",
//     title: "Organic Farming Techniques",
//     provider: "Agricultural Department",
//     description: "Modern organic farming methods, composting, and natural pest control. Practical training included.",
//     duration: "1 month",
//     fee: "Free",
//     mode: "Offline",
//     eligibility: "Farmers",
//     startDate: "2025-12-28"
//   },
//   {
//     id: "TRN003",
//     title: "Mobile Repair Course",
//     provider: "Technical Training Center",
//     description: "Learn smartphone hardware and software repair. Includes tools and certification.",
//     duration: "2 months",
//     fee: "₹2,000",
//     mode: "Offline",
//     eligibility: "12th Pass",
//     startDate: "2026-01-10"
//   }
// ];

// /* ======================= MAIN COMPONENT ======================= */

// export default function Job() {
//   const [activeTab, setActiveTab] = useState("local");
//   const [showPostJobModal, setShowPostJobModal] = useState(false);
//   const [approvedJobs, setApprovedJobs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchApprovedJobs = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await fetch("http://localhost:5000/api/jobs/approved");
//       const data = await response.json();

//       if (response.ok) {
//         setApprovedJobs(data);
//       } else {
//         setError(data.message || "Failed to fetch jobs");
//       }
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//       setError("Network error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchApprovedJobs();
//   }, []);

//   const handleJobPosted = () => {
//     // Optionally refresh the jobs list or show a notification
//     fetchApprovedJobs();
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "local":
//         if (loading) {
//           return (
//             <div className="text-center py-12">
//               <p className="text-gray-600">Loading jobs...</p>
//             </div>
//           );
//         }

//         if (error) {
//           return (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
//               {error}
//             </div>
//           );
//         }

//         if (approvedJobs.length === 0) {
//           return (
//             <div className="text-center py-12">
//               <p className="text-gray-600">No approved jobs available at the moment.</p>
//             </div>
//           );
//         }

//         return (
//           <div className="space-y-4">
//             {approvedJobs.map((job) => (
//               <JobCard 
//                 key={job._id} 
//                 job={{
//                   ...job,
//                   posted: formatDate(job.postedDate),
//                   deadline: formatDate(job.deadlineDate),
//                   type: job.jobType,
//                   level: job.experience
//                 }} 
//               />
//             ))}
//           </div>
//         );

//       case "government":
//         return (
//           <div className="space-y-4">
//             {GOVERNMENT_JOBS.map((job) => (
//               <JobCard 
//                 key={job.id} 
//                 job={{
//                   ...job,
//                   posted: job.postedDate,
//                   deadline: job.deadlineDate,
//                   type: job.jobType,
//                   level: job.experience
//                 }} 
//               />
//             ))}
//           </div>
//         );

//       case "training":
//         return (
//           <div className="space-y-4">
//             {TRAINING_PROGRAMS.map((program) => (
//               <TrainingCard key={program.id} program={program} />
//             ))}
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <main className="max-w-5xl mx-auto px-4 py-6">
//         <div className="mb-6 text-left mt-6">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">
//             Job Portal & Skill Development
//           </h1>
//           <p className="text-gray-600">
//             Find local jobs and skill development opportunities
//           </p>
//         </div>

//         <div className="mb-3">
//           <button
//             onClick={() => setShowPostJobModal(true)}
//             className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-2xl font-medium hover:bg-orange-600 transition-colors"
//           >
//             <Plus className="w-5 h-5" />
//             Post a Job
//           </button>
//         </div>

//         <div className="flex gap-4 mb-6">
//           <button
//             onClick={() => setActiveTab("local")}
//             className={`flex-1 px-6 py-3 rounded-2xl font-medium transition-colors ${
//               activeTab === "local"
//                 ? "bg-orange-500 text-white"
//                 : "bg-white text-gray-700 border border-gray-200"
//             }`}
//           >
//             Local Jobs
//           </button>
//           <button
//             onClick={() => setActiveTab("government")}
//             className={`flex-1 px-6 py-3 rounded-2xl font-medium transition-colors ${
//               activeTab === "government"
//                 ? "bg-orange-500 text-white"
//                 : "bg-white text-gray-700 border border-gray-200"
//             }`}
//           >
//             Government Jobs
//           </button>
//           <button
//             onClick={() => setActiveTab("training")}
//             className={`flex-1 px-6 py-3 rounded-2xl font-medium transition-colors ${
//               activeTab === "training"
//                 ? "bg-orange-500 text-white"
//                 : "bg-white text-gray-700 border border-gray-200"
//             }`}
//           >
//             Skill Training
//           </button>
//         </div>

//         {renderContent()}
//       </main>

//       {/* Post Job Modal */}
//       {showPostJobModal && (
//         <PostJobModal
//           onClose={() => setShowPostJobModal(false)}
//           onJobPosted={handleJobPosted}
//         />
//       )}
//     </div>
//   );
// }





// import { MapPin, Clock, Briefcase } from "lucide-react";

// const getCategoryColor = (category) => {
//   switch (category) {
//     case "Retail":
//       return "bg-orange-100 text-orange-600";
//     case "Agriculture":
//       return "bg-green-100 text-green-600";
//     case "Education":
//       return "bg-blue-100 text-blue-600";
//     case "Healthcare":
//       return "bg-pink-100 text-pink-600";
//     case "Government":
//       return "bg-purple-100 text-purple-600";
//     default:
//       return "bg-gray-100 text-gray-600";
//   }
// };

// export default function JobCard({ job }) {
//   return (
//     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
//       <div className="flex items-start justify-between mb-4">
//         <div className="flex-1">
//           <div className="flex items-center gap-2 mb-1">
//             <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
//             <span className="text-sm text-gray-500">({job.ownerName})</span>
//           </div>
//           <p className="text-gray-600 text-left">{job.ownerContact}</p>
//         </div>
//         <span
//           className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${getCategoryColor(
//             job.category
//           )}`}
//         >
//           {job.category}
//         </span>
//       </div>

//       <p className="text-gray-600 text-left mb-4 text-sm leading-relaxed">
//         {job.description}
//       </p>

//       <div className="flex flex-wrap gap-4 mb-4 text-sm">
//         <div className="flex items-center gap-1 text-gray-600">
//           <MapPin className="w-4 h-4" />
//           <span>{job.location}</span>
//         </div>
//         <div className="flex items-center gap-1 text-gray-600">
//           <Clock className="w-4 h-4" />
//           <span>{job.type}</span>
//         </div>
//         <div className="flex items-center gap-1 text-gray-600">
//           <Briefcase className="w-4 h-4" />
//           <span>{job.level}</span>
//         </div>
//       </div>

//       <div className="flex items-center justify-between pt-4 border-t border-gray-200">
//         <div>
//           <p className="text-sm text-left text-gray-500 mb-1">Salary</p>
//           <p className="text-gray-800 font-medium">{job.salary}</p>
//         </div>
//         <div className="text-right">
//           <p className="text-sm text-gray-500 mb-2">
//             Posted: {job.posted} • Deadline: {job.deadline}
//           </p>
//           <button className="bg-orange-500 text-white px-6 py-2 rounded-2xl hover:bg-orange-600 transition-colors font-medium">
//             Apply Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




// import { Calendar, Clock, DollarSign, GraduationCap, BookOpen } from "lucide-react";

// export default function TrainingCard({ program }) {
//   return (
//     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
//       <div className="flex items-start justify-between mb-4">
//         <div className="flex-1">
//           <h3 className="text-lg font-semibold text-gray-800 mb-1">{program.title}</h3>
//           <p className="text-gray-600 text-sm">{program.provider}</p>
//         </div>
//         <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600 whitespace-nowrap">
//           {program.mode}
//         </span>
//       </div>

//       <p className="text-gray-600 text-left mb-4 text-sm leading-relaxed">
//         {program.description}
//       </p>

//       <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
//         <div className="flex items-center gap-2 text-gray-600">
//           <Clock className="w-4 h-4" />
//           <span>{program.duration}</span>
//         </div>
//         <div className="flex items-center gap-2 text-gray-600">
//           <DollarSign className="w-4 h-4" />
//           <span>{program.fee}</span>
//         </div>
//         <div className="flex items-center gap-2 text-gray-600">
//           <GraduationCap className="w-4 h-4" />
//           <span>{program.eligibility}</span>
//         </div>
//         <div className="flex items-center gap-2 text-gray-600">
//           <Calendar className="w-4 h-4" />
//           <span>Starts: {program.startDate}</span>
//         </div>
//       </div>

//       <div className="pt-4 border-t border-gray-200">
//         <button className="w-full bg-orange-500 text-white px-6 py-2 rounded-2xl hover:bg-orange-600 transition-colors font-medium">
//           Register Now
//         </button>
//       </div>
//     </div>
//   );
// }


// admin


// import { useEffect, useState } from "react";
// import { Clock, Check, X, MapPin, Briefcase, Calendar } from "lucide-react";

// export function PendingJobsTab() {
//   const [pendingJobs, setPendingJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchPendingJobs = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("http://localhost:5000/api/jobs/pending", {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setPendingJobs(data);
//       } else {
//         setError(data.message || "Failed to fetch pending jobs");
//       }
//     } catch (error) {
//       console.error("Error fetching pending jobs:", error);
//       setError("Network error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPendingJobs();
//   }, []);

//   const handleApprove = async (jobId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`http://localhost:5000/api/jobs/approve/${jobId}`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Job approved successfully!");
//         fetchPendingJobs();
//       } else {
//         alert(data.message || "Failed to approve job");
//       }
//     } catch (error) {
//       console.error("Error approving job:", error);
//       alert("Network error. Please try again.");
//     }
//   };

//   const handleReject = async (jobId) => {
//     if (!confirm("Are you sure you want to reject this job?")) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`http://localhost:5000/api/jobs/reject/${jobId}`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Job rejected successfully!");
//         fetchPendingJobs();
//       } else {
//         alert(data.message || "Failed to reject job");
//       }
//     } catch (error) {
//       console.error("Error rejecting job:", error);
//       alert("Network error. Please try again.");
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const getCategoryColor = (category) => {
//     switch (category) {
//       case "Retail":
//         return "bg-orange-100 text-orange-600";
//       case "Agriculture":
//         return "bg-green-100 text-green-600";
//       case "Education":
//         return "bg-blue-100 text-blue-600";
//       case "Healthcare":
//         return "bg-pink-100 text-pink-600";
//       case "Government":
//         return "bg-purple-100 text-purple-600";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="bg-white rounded-2xl shadow-md p-12 text-center">
//         <p className="text-[#6c6f85]">Loading pending jobs...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-white rounded-2xl shadow-md p-6">
//         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   if (pendingJobs.length === 0) {
//     return (
//       <div className="bg-white rounded-2xl shadow-md p-12 text-center">
//         <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#e6e9ef] mb-4">
//           <Clock className="w-10 h-10 text-[#fe640b]" />
//         </div>
//         <p className="text-[#6c6f85]">No pending jobs for approval</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {pendingJobs.map((job) => (
//         <div
//           key={job._id}
//           className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
//         >
//           <div className="flex items-start justify-between mb-4">
//             <div className="flex-1">
//               <div className="flex items-center gap-2 mb-2">
//                 <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
//                     job.category
//                   )}`}
//                 >
//                   {job.category}
//                 </span>
//               </div>
//               <div className="text-sm text-gray-600 space-y-1">
//                 <p>
//                   <strong>Posted by:</strong> {job.ownerName} ({job.ownerContact})
//                 </p>
//                 {job.createdBy && (
//                   <p>
//                     <strong>User:</strong> {job.createdBy.name} ({job.createdBy.email})
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           <p className="text-gray-600 text-left mb-4 text-sm leading-relaxed">
//             {job.description}
//           </p>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
//             <div className="flex items-center gap-2 text-gray-600">
//               <MapPin className="w-4 h-4" />
//               <span>{job.location}</span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-600">
//               <Briefcase className="w-4 h-4" />
//               <span>{job.jobType}</span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-600">
//               <Calendar className="w-4 h-4" />
//               <span>Exp: {job.experience}</span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-600">
//               <span className="font-medium">{job.salary}</span>
//             </div>
//           </div>

//           <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
//             <Calendar className="w-4 h-4" />
//             <span>
//               Posted: {formatDate(job.postedDate)} | Deadline: {formatDate(job.deadlineDate)}
//             </span>
//           </div>

//           <div className="flex gap-3 pt-4 border-t border-gray-200">
//             <button
//               onClick={() => handleApprove(job._id)}
//               className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-colors"
//             >
//               <Check className="w-4 h-4" />
//               Approve
//             </button>
//             <button
//               onClick={() => handleReject(job._id)}
//               className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-colors"
//             >
//               <X className="w-4 h-4" />
//               Reject
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { CircleCheck, MapPin, Briefcase, Calendar, Trash2 } from "lucide-react";

// export function ApprovedJobsTab() {
//   const [approvedJobs, setApprovedJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchApprovedJobs = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("http://localhost:5000/api/jobs/approved-admin", {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setApprovedJobs(data);
//       } else {
//         setError(data.message || "Failed to fetch approved jobs");
//       }
//     } catch (error) {
//       console.error("Error fetching approved jobs:", error);
//       setError("Network error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchApprovedJobs();
//   }, []);

//   const handleDelete = async (jobId) => {
//     if (!confirm("Are you sure you want to delete this job?")) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`http://localhost:5000/api/jobs/delete/${jobId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Job deleted successfully!");
//         fetchApprovedJobs();
//       } else {
//         alert(data.message || "Failed to delete job");
//       }
//     } catch (error) {
//       console.error("Error deleting job:", error);
//       alert("Network error. Please try again.");
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const getCategoryColor = (category) => {
//     switch (category) {
//       case "Retail":
//         return "bg-orange-100 text-orange-600";
//       case "Agriculture":
//         return "bg-green-100 text-green-600";
//       case "Education":
//         return "bg-blue-100 text-blue-600";
//       case "Healthcare":
//         return "bg-pink-100 text-pink-600";
//       case "Government":
//         return "bg-purple-100 text-purple-600";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="bg-white rounded-2xl shadow-md p-12 text-center">
//         <p className="text-[#6c6f85]">Loading approved jobs...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-white rounded-2xl shadow-md p-6">
//         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   if (approvedJobs.length === 0) {
//     return (
//       <div className="bg-white rounded-2xl shadow-md p-12 text-center">
//         <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#e6e9ef] mb-4">
//           <CircleCheck className="w-10 h-10 text-[#fe640b]" />
//         </div>
//         <p className="text-[#6c6f85]">No approved jobs yet</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {approvedJobs.map((job) => (
//         <div
//           key={job._id}
//           className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
//         >
//           <div className="flex items-start justify-between mb-4">
//             <div className="flex-1">
//               <div className="flex items-center gap-2 mb-2">
//                 <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
//                     job.category
//                   )}`}
//                 >
//                   {job.category}
//                 </span>
//               </div>
//               <div className="text-sm text-gray-600 space-y-1">
//                 <p>
//                   <strong>Posted by:</strong> {job.ownerName} ({job.ownerContact})
//                 </p>
//                 {job.createdBy && (
//                   <p>
//                     <strong>User:</strong> {job.createdBy.name} ({job.createdBy.email})
//                   </p>
//                 )}
//               </div>
//             </div>
//             <button
//               onClick={() => handleDelete(job._id)}
//               className="text-red-500 hover:text-red-700 transition-colors"
//               title="Delete job"
//             >
//               <Trash2 className="w-5 h-5" />
//             </button>
//           </div>

//           <p className="text-gray-600 text-left mb-4 text-sm leading-relaxed">
//             {job.description}
//           </p>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
//             <div className="flex items-center gap-2 text-gray-600">
//               <MapPin className="w-4 h-4" />
//               <span>{job.location}</span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-600">
//               <Briefcase className="w-4 h-4" />
//               <span>{job.jobType}</span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-600">
//               <Calendar className="w-4 h-4" />
//               <span>Exp: {job.experience}</span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-600">
//               <span className="font-medium">{job.salary}</span>
//             </div>
//           </div>

//           <div className="flex items-center gap-2 text-sm text-gray-500">
//             <Calendar className="w-4 h-4" />
//             <span>
//               Posted: {formatDate(job.postedDate)} | Deadline: {formatDate(job.deadlineDate)}
//             </span>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }



// import { useState } from "react";
// import { Plus } from "lucide-react";
// import { PendingJobsTab } from "./PendingJobsTab";
// import { ApprovedJobsTab } from "./ApprovedJobsTab";
// import { GovernmentJobsTab } from "./GovernmentJobsTab";
// import { TrainingProgramsTab } from "./TrainingProgramsTab";
// import { AddGovernmentJobModal } from "./AddGovernmentJobModal";
// import { AddTrainingProgramModal } from "./AddTrainingProgramModal";

// export function JobPortalContent() {
//   const [activeTab, setActiveTab] = useState("pending");
//   const [showGovJobModal, setShowGovJobModal] = useState(false);
//   const [showTrainingModal, setShowTrainingModal] = useState(false);

//   return (
//     <div className="p-0">
//       <div className="flex items-center justify-between mb-6 px-6 pt-6">
//         <div>
//           <h1 className="text-[#fe640b]">Job Portal & Skill Development</h1>
//           <p className="text-[#6c6f85] mt-1">
//             Manage job postings and training programs
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={() => setShowGovJobModal(true)}
//             className="flex items-center gap-2 px-4 py-2 bg-[#fe640b] text-white rounded-2xl shadow-lg hover:bg-[#e55a0a] transition-colors"
//           >
//             <Plus className="w-4 h-4" />
//             Add Government Job
//           </button>

//           <button
//             onClick={() => setShowTrainingModal(true)}
//             className="flex items-center gap-2 px-4 py-2 bg-[#fe640b] text-white rounded-2xl shadow-lg hover:bg-[#e55a0a] transition-colors"
//           >
//             <Plus className="w-4 h-4" />
//             Add Training Program
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-4 h-14 bg-white shadow-md p-1 mb-6 mx-6 rounded-xl">
//         <button
//           onClick={() => setActiveTab("pending")}
//           className={`rounded-2xl transition-colors ${
//             activeTab === "pending"
//               ? "bg-[#fe640b] text-white"
//               : "hover:bg-gray-100"
//           }`}
//         >
//           Pending Jobs
//         </button>

//         <button
//           onClick={() => setActiveTab("approved")}
//           className={`rounded-2xl transition-colors ${
//             activeTab === "approved"
//               ? "bg-[#fe640b] text-white"
//               : "hover:bg-gray-100"
//           }`}
//         >
//           Approved Jobs
//         </button>

//         <button
//           onClick={() => setActiveTab("government")}
//           className={`rounded-2xl transition-colors ${
//             activeTab === "government"
//               ? "bg-[#fe640b] text-white"
//               : "hover:bg-gray-100"
//           }`}
//         >
//           Government Jobs
//         </button>

//         <button
//           onClick={() => setActiveTab("training")}
//           className={`rounded-2xl transition-colors ${
//             activeTab === "training"
//               ? "bg-[#fe640b] text-white"
//               : "hover:bg-gray-100"
//           }`}
//         >
//           Training Programs
//         </button>
//       </div>

//       <div className="px-6 pb-6">
//         {activeTab === "pending" && <PendingJobsTab />}
//         {activeTab === "approved" && <ApprovedJobsTab />}
//         {activeTab === "government" && <GovernmentJobsTab />}
//         {activeTab === "training" && <TrainingProgramsTab />}
//       </div>

//       <AddGovernmentJobModal
//         open={showGovJobModal}
//         onOpenChange={setShowGovJobModal}
//       />

//       <AddTrainingProgramModal
//         open={showTrainingModal}
//         onOpenChange={setShowTrainingModal}
//       />
//     </div>
//   );
// }