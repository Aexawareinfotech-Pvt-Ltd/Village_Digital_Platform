import User from "../../models/User/Users.js";
import Marketplace from "../../models/Marketplace/MarketPlace.js";
import Grievance from "../../models/Grievance/Grievances.js";
import JobApplication from "../../models/Job/JobApplication.js";
import EventRegistration from "../../models/Event/EventRegistration.js";
import Receipt from "../../models/Marketplace/Receipt.js";
import Event from "../../models/Event/Event.js";

/* ===============================
   GET MY PROFILE
================================ */
export const getMyProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-passwordHash");
  res.json(user);
};

/* ===============================
   UPDATE PROFILE
================================ */
export const updateProfile = async (req, res) => {
  const updated = await User.findByIdAndUpdate(
    req.user.id,
    {
      $set: {
        name: req.body.name ?? "",
        phone: req.body.phone ?? "",
        village: req.body.village ?? "",
        address: req.body.address ?? "",
        pincode: req.body.pincode ?? "",
        bio: req.body.bio ?? "",
        lastActive: new Date(),
      },
    },
    { new: true }
  ).select("-passwordHash");

  res.json(updated);
};


/* ===============================
   PROFILE PHOTO UPLOAD
================================ */
export const uploadProfilePhoto = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  const imageUrl = `/uploads/profile/${req.file.filename}`;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { profilePicture: imageUrl },
    { new: true }
  );

  res.json({ profilePicture: imageUrl });
};

/* ===============================
   PROFILE STATS
================================ */
export const getProfileStats = async (req, res) => {
  const userId = req.user.id;
  console.log("Getting stats for userId:", userId); // Debug log

  const [listingsPosted, grievancesFiled, jobsApplied, eventsAttended] =
    await Promise.all([
      Marketplace.countDocuments({ owner: userId }),
      Grievance.countDocuments({ userId }),
      JobApplication.countDocuments({ userId }),
      EventRegistration.countDocuments({ userId }),
    ]);

  res.json({
    listingsPosted,
    grievancesFiled,
    jobsApplied,
    eventsAttended,
  });
};



/* ===============================
   ACTIVITY TIMELINE
================================ */
export const getProfileActivity = async (req, res) => {
  const userId = req.user.id;
  const activities = [];

  const grievances = await Grievance.find({ userId });
  grievances.forEach((g) =>
    activities.push({
      type: "grievance",
      icon: 1,
      title: `Filed grievance: ${g.subject}`,
      date: g.createdAt,
      data: g, // ✅ FULL OBJECT
    })
  );

  const listings = await Marketplace.find({ owner: userId });
  listings.forEach((l) =>
    activities.push({
      type: "listing",
      icon: 2,
      title: `Posted listing: ${l.title}`,
      date: l.createdAt,
      data: l, // ✅ FULL OBJECT
    })
  );

  const eventRegistrations = await EventRegistration.find({ userId })
    .populate("eventId")
    .sort({ registeredAt: -1 });

  eventRegistrations.forEach((registration) =>
    activities.push({
      type: "event",
      icon: 4,
      title: `Registered for event: ${registration.eventId?.eventName || 'Unknown Event'}`,
      date: registration.registeredAt,
      data: registration, // contains registration + populated event details
    })
  );

  const receipts = await Receipt.find({ buyer: userId })
    .populate("product")
    .sort({ createdAt: -1 })
   

  receipts.forEach((r) =>
    activities.push({
      type: "product_bought",
      icon: 2,
      title: `You purchased: ${r.product?.title}`,
      date: r.createdAt,
      data: r, // contains product + delivery + payment
    })
  );

  

  /* -------- JOB APPLICATIONS (optional) -------- */
  const jobs = await JobApplication.find({ userId })
    .populate("jobId") 
    .sort({ createdAt: -1 });

  jobs.forEach((j) => {
    activities.push({
      type: "job",
      icon: 3,
      title: `Applied for job`,
      date: j.createdAt,
      data: j,
    });
  });

  // 🔥 SORT ALL TOGETHER
  activities.sort((a, b) => new Date(b.date) - new Date(a.date));

  res.json(activities);
};


/* ===============================
   MY LISTINGS
================================ */
export const getMyListings = async (req, res) => {
  const listings = await Marketplace.find({
    owner: req.user.id,
  }).sort({ createdAt: -1 });

  res.json(listings);
};

/* ===============================
   NOTIFICATIONS
================================ */
export const updateNotifications = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { notificationSettings: req.body },
    { new: true }
  );

  res.json(user.notificationSettings);
};
