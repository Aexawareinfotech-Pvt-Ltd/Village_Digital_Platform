import { useState, useEffect } from "react";
import {
  MessageSquare,
  Upload,
  Eye,
  EyeOff,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react";

const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'inProgress':
        return <AlertCircle className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;  
      default:
        return null;
    }
  };


const translations = {
  en: {
    title: "Grievance & Feedback System",
    subtitle: "Submit complaints and track their status",
    submitTab: "Submit Grievance",
    trackTab: "Track Status",
    category: "Category",
    selectCategory: "Select a category",
    categories: {
      water: "Water Supply",
      electricity: "Electricity",
      roads: "Roads & Infrastructure",
      sanitation: "Sanitation",
      education: "Education",
      health: "Health Services",
      other: "Other",
    },
    subject: "Subject",
    subjectPlaceholder: "Brief description of your grievance",
    description: "Detailed Description",
    descriptionPlaceholder: "Provide complete details of your complaint...",
    attachments: "Attach Photo/Video Evidence (Optional)",
    anonymous: "Submit Anonymously",
    contactInfo: "Contact Information",
    name: "Your Name",
    phone: "Phone Number",
    submit: "Submit Grievance",
    grievanceId: "Grievance ID",
    grievanceIdPlaceholder: "Enter your grievance ID",
    track: "Track Status",
    myGrievances: "My Recent Grievances",
    status: {
      pending: "Pending",
      inProgress: "In Progress",
      resolved: "Resolved",
    },
    grievances: [
      {
        id: "GRV001234",
        subject: "Water Supply Irregular",
        category: "Water Supply",
        date: "5 Dec 2025",
        status: "inProgress",
        response:
          "Issue reported to water department. Inspection scheduled for 10 Dec.",
      },
      {
        id: "GRV001189",
        subject: "Street Light Not Working",
        category: "Electricity",
        date: "1 Dec 2025",
        status: "resolved",
        response: "Street light has been repaired. Issue resolved.",
      },
      {
        id: "GRV001156",
        subject: "Road Damaged Near School",
        category: "Roads & Infrastructure",
        date: "28 Nov 2025",
        status: "pending",
        response:
          "Your complaint has been registered. We will update you soon.",
      },
    ],
  },
};

const GrievanceSystem = ({ language = "en" }) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState("submit");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [myGrievances, setMyGrievances] = useState([]);
  const [loading, setLoading] = useState(false);

  const submitGrievance = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:3000/api/grievances/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        category: selectedCategory,
        subject,
        description,
        isAnonymous,
        name,
        phone,
      }),
    });

    const data = await res.json();

    alert(`Grievance submitted! ID: ${data.grievanceId}`);
    setActiveTab("track");
    fetchMyGrievances();
    }
   catch (err) {
    alert("Failed to submit grievance");
    }
  };

  

  const fetchMyGrievances = async () => {
  try {
    const res = await fetch(
      "http://localhost:3000/api/grievances/myrecent",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await res.json();

    if (Array.isArray(data)) {
      setMyGrievances(data);
    } else {
      setMyGrievances([]); // 🔥 prevents crash
      console.error("Unexpected response:", data);
    }
  } catch (err) {
    console.error(err);
    setMyGrievances([]);
  }
 };


 useEffect(() => {
  if (activeTab === "track") {
    fetchMyGrievances();
  }
 }, [activeTab]);




  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 rounded-xl p-1 text-yellow-700 border-yellow-200";
      case "inProgress":
        return "bg-blue-100 rounded-xl p-1 text-blue-700 border-blue-200";
      case "resolved":
        return "bg-green-100 rounded-xl p-1 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 rounded-xl p-1 text-red-700 border-red-200";
      default:
        return "bg-gray-100 rounded-xl p-1 text-gray-700 border-gray-200";
    }
  };

  const filteredGrievances = myGrievances.filter((g) => {
  const matchesSearch =
    g.grievanceId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.category?.toLowerCase().includes(searchQuery.toLowerCase());

  const matchesStatus =
    statusFilter === "all" || g.status === statusFilter;

  return matchesSearch && matchesStatus;
  });


  
  return (
    <div className="max-w-5xl mx-auto mt-12">
      <div className="mb-6 text-left">
        <h1 className="text-orange-600 mb-2 text-4xl">{t.title}</h1>
        <p className="text-gray-600 ">{t.subtitle}</p>
      </div>
      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-2 mb-6">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setActiveTab("submit")}
            className={`px-4 py-3 rounded-xl ${
              activeTab === "submit"
                ? "bg-orange-500 text-white"
                : "bg-gray-50 text-gray-700 hover:bg-orange-50"
            }`}
          >
            {t.submitTab}
          </button>
          <button
            onClick={() => setActiveTab("track")}
            className={`px-4 py-3 rounded-xl ${
              activeTab === "track"
                ? "bg-orange-500 text-white"
                : "bg-gray-50 text-gray-700 hover:bg-orange-50"
            }`}
          >
            {t.trackTab}
          </button>
        </div>
      </div>

      {/* Submit Form */}
      {activeTab === 'submit' && (
        <div className="bg-white rounded-xl text-left shadow-sm border border-orange-100 p-6">
          <form className="space-y-6" onSubmit={submitGrievance}>
            {/* Category */}
            <div>
              <label className="block text-gray-700 mb-2">{t.category}</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">{t.selectCategory}</option>
                {Object.entries(t.categories).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-gray-700 mb-2">{t.subject}</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={t.subjectPlaceholder}
                className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

              
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 mb-2">{t.description}</label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.descriptionPlaceholder}
                className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Attachments */}
            <div>
              <label className="block text-gray-700 mb-2">{t.attachments}</label>
              <div className="border-2 border-dashed border-orange-200 rounded-xl p-6 text-center hover:border-orange-400 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <p className="text-gray-600 text-sm">
                  {language === 'en'
                    ? 'Click to upload or drag and drop'
                    : language === 'hi'
                    ? 'अपलोड करने के लिए क्लिक करें या ड्रैग और ड्रॉप करें'
                    : 'અપલોડ કરવા માટે ક્લિક કરો અથવા ડ્રેગ અને ડ્રોપ કરો'}
                </p>
              </div>
            </div>

            {/* Anonymous Checkbox */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsAnonymous(!isAnonymous)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-xl hover:bg-orange-100 transition-colors"
              >
                {isAnonymous ? (
                  <EyeOff className="w-4 h-4 text-orange-600" />
                ) : (
                  <Eye className="w-4 h-4 text-orange-600" />
                )}
                <span className="text-gray-700">{t.anonymous}</span>
              </button>
            </div>

            {/* Contact Info (if not anonymous) */}
            {!isAnonymous && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <h3 className="text-gray-900 mb-4">{t.contactInfo}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm mb-2">{t.name}</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm mb-2">{t.phone}</label>
                    <input
                     type="tel"
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              {t.submit}
            </button>
          </form>
        </div>
      )}


      {/* Track Tab */}
      {activeTab === 'track' && (
        <div className="space-y-6 text-left">
          
          {/* Search & Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-4 mb-4">
            <div className="flex flex-col sm:flex-row gap-3">
                <input
                type="text"
                placeholder="Search by ID, subject or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="inProgress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
                </select>
            </div>
            </div>


          {/* My Grievances */}
          <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
            <h2 className="text-latte-peach mb-4 text-left">{t.myGrievances}</h2>
            <div className="space-y-4">
              {filteredGrievances.length > 0 ? (filteredGrievances.map((grievance) => (
                <div key={grievance._id} className="border border-latte-peach rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                        <h3 className="text-gray-900 mb-1">{grievance.subject}</h3>
                        <p className="text-sm text-gray-600">{grievance.category}</p>
                        </div>
                        <div
                        className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(
                            grievance.status
                        )}`}
                        >
                        {getStatusIcon(grievance.status)}
                        <span className="text-sm">{t.status[grievance.status] || grievance.status}</span>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <p className="text-sm text-gray-700">{grievance.adminResponse || "No update yet"}</p>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">ID: {grievance.grievanceId}</span>
                    <span className="text-gray-600">{new Date(grievance.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                  ))
                ) : (
                <p className="text-center text-gray-500">
                    No grievances found
                </p>
                )}


            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrievanceSystem;
