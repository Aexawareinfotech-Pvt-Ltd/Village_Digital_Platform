import { useState, useEffect } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  ShoppingBag,
  Briefcase,
  AlertCircle,
  Bell,
  Lock,
  Camera,
  X,
  Save,
  Eye,
  Clock,
  Calendar1,
  Backpack,
  LogOut,
} from "lucide-react";
import Stat from "../../Common/Stat";


/* ---------------- TRANSLATIONS ---------------- */
const translations = {
  title: "My Profile",
  subtitle: "Manage your account and preferences",
  tabs: {
    overview: "Overview",
    activity: "Activity",
    listings: "My Listings",
    settings: "Settings",
  },
  profile: {
    edit: "Edit Profile",
    memberSince: "Member Since",
  },
  stats: {
    listingsPosted: "Listings Posted",
    jobsApplied: "Jobs Applied",
    grievancesFiled: "Grievances Filed",
    eventsAttended: "Events Attended",
  },
  activity: {
    title: "Recent Activity",
    viewAll: "View All",
  },
  listings: {
    title: "My Marketplace Listings",
    createListing: "Create Listing",
  },
  settings: {
    personalInfo: "Personal Information",
    notifications: "Notifications",
    privacy: "Privacy",
    password: "Change Password",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    emailNotifications: "Email Notifications",
    smsNotifications: "SMS Notifications",
    pushNotifications: "Push Notifications",
    darkMode: "Dark Mode",
    appearance: "Appearance",
  },
  form: {
    name: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    address: "Address",
    village: "Village/Ward",
    pincode: "PIN Code",
    bio: "About Me",
  },
};

export default function UserProfile() {
  
  const t = translations;
  const token = localStorage.getItem("token");

  const [activeTab, setActiveTab] = useState("overview");
  const [showEditModal, setShowEditModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({});
  const [activities, setActivities] = useState([]);
  const [listings, setListings] = useState([]);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activityDetails, setActivityDetails] = useState(null);
  const [activitySearch, setActivitySearch] = useState("");
  const [activityFilter, setActivityFilter] = useState("all");
  const [listingTab, setListingTab] = useState("active"); // active | sold



  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const auth = {
    headers: { Authorization: `Bearer ${token}` },
  };

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
  if (!token) {
    window.location.href = "/VillageLogin";
    return;
  }

  loadProfile();
  loadStats();
  loadActivity();
  loadListings();
}, []);

  const loadProfile = async () => {
  const res = await axios.get("http://localhost:3000/api/profile/me", auth);
  console.log("PROFILE DATA FROM API:", res.data);
  setUserData(res.data);
};


  const loadStats = async () => {
    const res = await axios.get("http://localhost:3000/api/profile/stats", auth);
    setStats(res.data);
  };

  const loadActivity = async () => {
    const res = await axios.get("http://localhost:3000/api/profile/activity", auth);
    setActivities(res.data);
  };

  const loadListings = async () => {
    const res = await axios.get("http://localhost:3000/api/profile/listings", auth);
    setListings(res.data);
  };

  const loadActivityDetails = (activity) => {
  setSelectedActivity(activity);
  setActivityDetails(activity.data); // ✅ already available
  setShowActivityModal(true);
};


  /* ---------------- UPDATE PROFILE ---------------- */
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    await axios.put(
      "http://localhost:3000/api/profile/me",
      {
        name: form.name.value,
        phone: form.phone.value,
        village: form.village.value,
        address: form.address.value,
        pincode: form.pincode.value,
        bio: form.bio.value,
      },
      auth
    );

    loadProfile();
    setShowEditModal(false);
  };

  /* ---------------- IMAGE UPLOAD ---------------- */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    await axios.put(
    "http://localhost:3000/api/profile/photo",
    formData,
    {
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        },
    }
    );


    loadProfile();
  };

  /* ---------------- SAVE NOTIFICATIONS ---------------- */
  const saveNotifications = async () => {
    await axios.put("http://localhost:3000/api/profile/notifications", notificationSettings, auth);
    alert("Notification settings saved");
  };

  if (!userData) return null;

  const getIcon = (icon) =>{
    switch(icon) {
        case 1:
            return <AlertCircle/>;
        case 2:
            return <ShoppingBag/>;
        case 3:
            return <Briefcase/>;
        case 4:
            return <Calendar/>;
        case 5:
            return <Briefcase/>; // For job applications
       
    }
  }

  const filteredActivities = activities
  .filter((a) => {
    const matchesSearch =
      a.title?.toLowerCase().includes(activitySearch.toLowerCase());

    const matchesFilter =
      activityFilter === "all" || a.type === activityFilter;

    return matchesSearch && matchesFilter;
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredListings = listings.filter((item) => {
  if (listingTab === "active") return item.status === "active";
  if (listingTab === "sold") return ["sold", "rented"].includes(item.status);
  return true;
});

const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      // redirect (adjust if you use router)
      window.location.href = "/VillageLogin";
    }
  };



  /* ---------------- UI (UNCHANGED DESIGN) ---------------- */
  return (
    <div className="max-w-6xl mx-auto mt-12">
    <div className="flex justify-between">
      <div>
      <h1 className="text-latte-peach text-4xl mb-2 text-left">{t.title}</h1>
      <p className="text-latte-subtext0 mb-6 text-left">{t.subtitle}</p>
      </div>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-latte-peach text-white rounded-xl m-10 flex items-center">
        LogOut<LogOut className="w-4 h-4 ml-2 " />
      </button>
    </div>

      {/* PROFILE HEADER */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 mb-6">
  <div className="flex gap-6 items-center">

    {/* Avatar */}
    <div className="relative">
      <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center">
        {userData.profilePicture ? (
        <img
            src={`http://localhost:3000${userData.profilePicture}`}
            className="w-full h-full rounded-full object-cover"
            alt="Profile"
        />
        ) : (
        <User className="w-16 h-16 text-latte-peach" />
        )}
        </div>


      <label className="absolute bottom-0 right-0 bg-latte-peach p-2 rounded-full cursor-pointer">
        <Camera className="w-4 h-4 text-white" />
        <input hidden type="file" onChange={handleImageUpload} />
      </label>
    </div>

    {/* User Info */}
    <div className="text-left w-full">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold text-gray-900">
        {userData.name}
      </h2>

      <button
        onClick={() => setShowEditModal(true)}
        className="mt-4 px-4 py-2 bg-latte-peach text-white rounded-xl"
      >
        <Edit className="inline w-4 h-4 mr-1" />
        Edit Profile
      </button>
      
    </div>
      <div className="mt-2 space-y-1 text-gray-600 text-sm flex justify-between">
        <p>
          <Mail className="inline w-4 h-4 mr-2 text-latte-peach" />
          {userData.email}
        </p>

        <p>
          <Phone className="inline w-4 h-4 mr-2 text-latte-peach" />
          {userData.phone}
        </p>

        {userData.address && (
          <p>
            <MapPin className="inline w-4 h-4 mr-2 text-latte-peach" />
            {userData.address}
          </p>
        )}

        <p className="text-sm text-gray-600">
        <Calendar className="inline w-4 h-4 mr-2 text-latte-peach"/>
        Member Since:{" "}
        {new Date(userData.createdAt).getFullYear()}
        </p>

      </div>
      <div>
        <p className="text-sm text-gray-600 mt-2">{userData.bio}</p>
      </div>
      
      </div>

      
    

  </div>
</div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Stat title="Listing Posted"  value={stats.listingsPosted} icon={<ShoppingBag/>} />
        <Stat title="jobs Applied" value={stats.jobsApplied} icon={<Briefcase/>}/>
        <Stat title="Grievance Filed" value={stats.grievancesFiled} icon={<AlertCircle/>} />
        <Stat title="Event Attnended" value={stats.eventsAttended} icon={<Calendar/>}/>
      </div>

      {/* TABS */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 mb-6">
        <div className="flex gap-4 mb-6">
          {Object.keys(t.tabs).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={
                activeTab === tab ? "border-b-2 border-latte-peach" : ""
              }
            >
              {t.tabs[tab]}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
    
    {/* LEFT: RECENT ACTIVITY */}
    <div className="lg:col-span-2 bg-white rounded-xl border p-5  shadow-sm  border-orange-100 mb-6 ">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Recent Activity
        </h3>
        <button onClick={() => setActiveTab("activity")} className="text-latte-peach text-sm hover:underline">
          View All
        </button>
      </div>

      {activities.length === 0 ? (
        <p className="text-sm text-gray-500">No recent activity</p>
      ) : (
        <div className="space-y-3">
          {activities.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-xl bg-orange-50 hover:bg-gray-100 transition"
            >
              <Clock className="w-5 h-5 text-latte-peach mt-1" />

              <div>
                <p className="text-sm font-medium text-gray-800">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500 text-left">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* RIGHT: QUICK ACTIONS */}
    <div className="bg-white rounded-xl border p-5  shadow-sm  border-orange-100  mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Quick Actions
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <QuickAction
          icon={<ShoppingBag className="w-6 h-6 text-orange-600" />}
          title="Add Listing"
          onClick={() => window.location.href = "/MarketPlace"}
        />

        <QuickAction
          icon={<Briefcase className="w-6 h-6 text-blue-600" />}
          title="Browse Jobs"
          onClick={() => window.location.href = "/Jobs"}
        />

        <QuickAction
          icon={<AlertCircle className="w-6 h-6 text-red-600" />}
          title="File Grievance"
          onClick={() => window.location.href = "/Grievance"}
        />

        <QuickAction
          icon={<Calendar className="w-6 h-6 text-green-600" />}
          title="View Events"
          onClick={() => window.location.href = "/Events"}
        />

      </div>
    </div>

  </div>
)}


        {/* ACTIVITY */}
       {activeTab === "activity" && (
  <div className="space-y-4">

    {/* SEARCH + FILTER */}
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <input
        type="text"
        placeholder="Search activity..."
        value={activitySearch}
        onChange={(e) => setActivitySearch(e.target.value)}
        className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      <select
        value={activityFilter}
        onChange={(e) => setActivityFilter(e.target.value)}
        className="px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <option value="all">All</option>
        <option value="grievance">Grievances</option>
        <option value="listing">Posted Products</option>
        <option value="event">Events</option>
        <option value="job">Jobs</option> 
        <option value="product_bought">Purchased Products</option>
      </select>
    </div>

    {/* ACTIVITY LIST */}
    {filteredActivities.length === 0 ? (
      <p className="text-center text-gray-500">
        No activity found
      </p>
    ) : (
      filteredActivities.map((a, i) => (
        <div
          key={i}
          className="flex justify-between items-center p-4 bg-orange-50 rounded-xl text-left"
        >
          <div className="flex gap-3 items-start">
          <div className="text-latte-peach">
            {getIcon(a.icon)}
          </div>
            <div>
              <p className="font-medium">{a.title}</p>
              <p className="text-xs text-gray-500">
                {new Date(a.date).toLocaleString()}
              </p>
            </div>
          </div>

          <button
            onClick={() => loadActivityDetails(a)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl"
          >
            <Eye size={18} />
          </button>
        </div>
      ))
    )}
  </div>
)}



        {showActivityModal && activityDetails && (
        <div
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={() => setShowActivityModal(false)}
        >
            <div
            className="bg-white rounded-2xl max-w-xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
            >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-latte-peach">
                {selectedActivity.type === "listing"
                    ? "Product Details"
                    : "Grievance Details"}
                </h2>
                <button
                onClick={() => setShowActivityModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl"
                >
                <X className="w-5 h-5" />
                </button>
            </div>

            {/* ================== MARKETPLACE ================== */}
            {selectedActivity.type === "listing" && (
                <>
                <img
                    src={activityDetails.images?.[0]?.url}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <div className="text-left">
                <p><b>Product:</b> {activityDetails.title}</p>
                <p><b>Price:</b> ₹{activityDetails.price}</p>
                <p><b>Status:</b> {activityDetails.status}</p>
                <p><b>Approval:</b> {activityDetails.approvalStatus}</p>
                <p><b>Description: </b>
                    {activityDetails.description}
                </p>
                </div>

                {/* ACTIONS (LIKE MARKETPLACE CARD) */}
                {activityDetails.status === "active" && activityDetails.approvalStatus ==="panding" && (
                    <div className="flex gap-3 mt-6">
                    <button
                        onClick={() =>
                        (window.location.href = `/Marketplace/edit/${activityDetails._id}`)
                        }
                        className="px-4 py-2 bg-yellow-500 text-white rounded-xl"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() =>
                        window.confirm("Delete product?")
                        }
                        className="px-4 py-2 bg-red-500 text-white rounded-xl"
                    >
                        Delete
                    </button>
                    </div>
                )}
                </>
            )}

            
            {selectedActivity.type === "product_bought" && (
            <>
                <img
                    src={activityDetails.images?.[0]?.url}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <div className="text-left">
                <p><b>Product:</b> {activityDetails.product?.title}</p>
                <p><b>Amount:</b> ₹{activityDetails.amount}</p>
                <p><b>Payment ID:</b> {activityDetails.paymentId}</p>
                <p><b>Delivery Status:</b> {activityDetails.deliveryStatus}</p>

                <p className="text-sm text-gray-500 mt-2">
                {new Date(activityDetails.createdAt).toLocaleString()}
                </p>
                </div>
            </>
            )}


            {/* ================== GRIEVANCE ================== */}
            {selectedActivity.type === "grievance" && (
                <>
                <div className="text-left">
                <p><b>ID:</b> {activityDetails.grievanceId}</p>
                <p><b>Subject:</b> {activityDetails.subject}</p>
                <p><b>Category:</b> {activityDetails.category}</p>

                <div className="bg-gray-50 p-3 rounded-xl mt-2"><b>Description: </b>
                    {activityDetails.description}
                </div>
                <div className="bg-gray-50 p-3 rounded-xl mt-2"><b>Response: </b>
                {activityDetails.adminResponse}</div>

                <p className="mt-3">
                    <b>Status:</b>{" "}
                    <span className="px-3 py-1 rounded-full bg-orange-100">
                    {activityDetails.status}
                    </span>
                </p>

                <p className="text-sm text-gray-500 mt-2">
                    {new Date(activityDetails.createdAt).toLocaleString()}
                </p>
                </div>
                </>
            )}

            {selectedActivity.type === "event" && (
                <>
                <div className="text-left">
                <p><b>Event Name:</b> {activityDetails.eventId?.eventName || 'Unknown Event'}</p>
                <p><b>Category:</b> {activityDetails.eventId?.category || 'N/A'}</p>
                <p><b>Venue:</b> {activityDetails.eventId?.venue || 'N/A'}</p>
                <p><b>Start Date:</b> {activityDetails.eventId?.startDate ? new Date(activityDetails.eventId.startDate).toLocaleDateString() : 'N/A'}</p>
                <p><b>End Date:</b> {activityDetails.eventId?.endDate ? new Date(activityDetails.eventId.endDate).toLocaleDateString() : 'N/A'}</p>

                <div className="bg-gray-50 p-3 rounded-xl mt-2"><b>Description: </b>
                    {activityDetails.eventId?.description || 'No description available'}
                </div>

                <p className="text-sm text-gray-500 mt-2">
                    Registered on: {new Date(activityDetails.registeredAt).toLocaleString()}
                </p>
                </div>
                </>
            )}
            
            {selectedActivity.type === "job" && (
  <>
    <div className="text-left">
      <p><b>Job Title:</b> {activityDetails.jobId?.title || "Unknown Job"}</p>
      <p><b>Category:</b> {activityDetails.jobId?.category || "N/A"}</p>
      <p><b>Location:</b> {activityDetails.jobId?.location || "N/A"}</p>
      <p><b>Salary:</b> {activityDetails.jobId?.salary || "N/A"}</p>
      <p><b>Experience:</b> {activityDetails.jobId?.experience || "N/A"}</p>

      <p><b>Deadline:</b>{" "}
        {activityDetails.jobId?.deadlineDate
          ? new Date(activityDetails.jobId?.deadlineDate).toLocaleDateString()
          : "N/A"}
      </p>

      <div className="bg-gray-50 p-3 rounded-xl mt-2">
        <b>Description:</b>{" "}
        {activityDetails.jobId?.description || "No description available"}
      </div>

      <p className="text-sm text-gray-500 mt-2">
        Applied on: {new Date(activityDetails.createdAt).toLocaleString()}
      </p>
    </div>
  </>
)}


          
            </div>
        </div>
        )}



        {/* LISTINGS */}
       {activeTab === "listings" && (
  <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 mt-6">
    {/* HEADER */}
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold text-gray-800">
        My Marketplace Listings
      </h2>

      <button
        onClick={() => (window.location.href = "/MarketPlace")}
        className="px-5 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600"
      >
        Create Listing
      </button>
    </div>

    {/* STATUS TABS */}
    <div className="flex gap-3 mb-6">
      {[
        { key: "active", label: "Active" },
        { key: "sold", label: "Sold" },
      ].map((t) => (
        <button
          key={t.key}
          onClick={() => setListingTab(t.key)}
          className={`px-5 py-2 rounded-xl ${
            listingTab === t.key
              ? "bg-orange-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {t.label} (
          {listings.filter((i) =>
            t.key === "active"
              ? i.status === "active"
              : ["sold", "rented"].includes(i.status)
          ).length}
          )
        </button>
      ))}
    </div>

    {/* LISTINGS GRID */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredListings.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 mt-6 text-left"
        >
          {/* TITLE + STATUS */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h3>

            <span
              className={`px-3 py-1 text-sm rounded-full ${
                item.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {item.status}
            </span>
          </div>

          {/* PRICE */}
          <p className="text-orange-600 font-medium mb-3">
            ₹{item.price}
            {item.type === "rent" ? "/day" : ""}
          </p>

          {/* DATE */}
          <p className="text-sm text-gray-500 mb-4">
            {new Date(item.createdAt).toLocaleDateString()}
          </p>

          {/* ACTIONS */}
          <div className="flex gap-3">
            {/* EDIT – only if NOT approved & active */}
            {item.approvalStatus !== "approved" &&
              item.status === "active" && (
                <button
                  onClick={() =>
                    (window.location.href = `/MarketPlace?edit=${item._id}`)
                  }
                  className="flex-1 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600"
                >
                  Edit
                </button>
              )}

            {/* VIEW */}
            <button
              onClick={() => openListingView(item)}
              className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
            >
              {item.status === "sold" || item.status === "rented" ? "View Receipt" : "View"}
            </button>
          </div>
        </div>
      ))}

      {filteredListings.length === 0 && (
        <p className="text-gray-500 text-center col-span-full">
          No listings found
        </p>
      )}
    </div>
  </div>
)}



        {/* SETTINGS */}
        {activeTab === "settings" && (
          <div className="space-y-8">

            {/* Notification Settings */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">{t.settings.notifications}</h4>
              <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
                <Toggle
                  label="Enable Notifications"
                  value={notificationSettings.email || notificationSettings.sms || notificationSettings.push}
                  onChange={() => {
                    const allOn = !(notificationSettings.email || notificationSettings.sms || notificationSettings.push);
                    setNotificationSettings({
                      email: allOn,
                      sms: allOn,
                      push: allOn,
                    });
                  }}
                />
              </div>
            </div>

            
          </div>
        )}

      </div>



      {/* EDIT MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form
            onSubmit={handleProfileUpdate}
            className="bg-white p-6 rounded-xl w-full max-w-xl"
          >
            <h3 className="mb-4">{t.profile.edit}</h3>

            {["name", "phone", "village", "address", "pincode"].map((f) => (
              <input
                key={f}
                name={f}
                defaultValue={userData[f] || ""}
                placeholder={t.form[f]}
                className="w-full mb-3 p-2 border rounded-xl"
              />
            ))}

            <textarea
              name="bio"
              defaultValue={userData.bio}
              className="w-full mb-3 p-2 border rounded-xl"
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="flex-1 border rounded-xl p-2"
              >
                {t.settings.cancel}
              </button>
              <button className="flex-1 bg-latte-peach text-white rounded-xl p-2">
                <Save className="inline w-4 h-4 mr-1" />
                {t.settings.saveChanges}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}



const Toggle = ({ label, value, onChange }) => (
  <div className="flex justify-between items-center bg-orange-50 p-4 rounded-xl">
    <span>{label}</span>
    <button
      onClick={onChange}
      className={`w-12 h-6 rounded-full ${
        value ? "bg-latte-peach" : "bg-gray-300"
      }`}
    >
      <span
        className={`block w-4 h-4 bg-white rounded-full transform ${
          value ? "translate-x-6" : ""
        }`}
      />
    </button>
  </div>
);


const QuickAction = ({ icon, title, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-all duration-300 ease-in-out transform hover:scale-105"
  >
    <div>{icon}</div>
    <span className="font-medium text-gray-800">{title}</span>
  </button>
);


const openListingView = async (item) => {
  // 🧾 SOLD / RENTED → SHOW RECEIPT
  if (["sold", "rented"].includes(item.status)) {
    const res = await fetch(
      "http://localhost:3000/api/payment/receipts",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const receipts = await res.json();
    const receipt = receipts.find(
      (r) => r.product?._id === item._id
    );

    if (!receipt) {
      alert("Receipt not found");
      return;
    }

    const addr = receipt.deliveryAddress;

    alert(`
🧾 RECEIPT
Product: ${receipt.product.title}
Amount: ₹${receipt.amount}
Buyer: ${receipt.buyer.name}
Seller: ${receipt.seller.name}

Payment ID: ${receipt.paymentId}
Order ID: ${receipt.orderId}

Delivery Address:
${addr?.fullName || ""}
${addr?.addressLine1 || ""}
${addr?.addressLine2 || ""}
${addr?.city || ""}, ${addr?.state || ""}
${addr?.pincode || ""}

Date: ${new Date(receipt.createdAt).toLocaleString()}
    `);

    return;
  }

  // 📦 NORMAL PRODUCT VIEW
  alert(`
📦 PRODUCT DETAILS
Title: ${item.title}
Price: ₹${item.price}
Type: ${item.type}
Category: ${item.category}
Location: ${item.location}
Status: ${item.status}
Approval: ${item.approvalStatus}

Description:
${item.description}
  `);
};


