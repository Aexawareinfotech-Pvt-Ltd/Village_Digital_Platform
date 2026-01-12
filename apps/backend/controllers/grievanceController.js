import Grievance from "../models/Grievances.js";
import crypto from "crypto";

/* ---------------- CREATE GRIEVANCE ---------------- */
export const createGrievance = async (req, res) => {
  try {
    const {
      category,
      subject,
      description,
      isAnonymous,
      name,
      phone,
    } = req.body;

    const grievanceId = "GRV" + crypto.randomBytes(4).toString("hex").toUpperCase();

    const grievance = await Grievance.create({
      grievanceId,
      userId: req.user.userId,
      category,
      subject,
      description,
      isAnonymous,
      contactInfo: isAnonymous ? {} : { name, phone },
      attachments: [], // add Cloudinary later
    });

    const io = req.app.get("io");
    io.emit("grievance:count:update");


    res.status(201).json({
      message: "Grievance submitted successfully",
      grievanceId: grievance.grievanceId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- TRACK BY ID ---------------- */
export const trackGrievance = async (req, res) => {
  try {
    const { grievanceId } = req.params;

    const grievance = await Grievance.findOne({ grievanceId });
    if (!grievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }

    res.json(grievance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- GET RECENT GRIEVANCES ---------------- */
export const getRecentGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json(grievances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ALL GRIEVANCES */
export const getAllGrievances = async (req, res) => {
  const { status } = req.query;

  const filter = {
      isRejected: false,
    };

    // 👇 OPTIONAL STATUS FILTER
    if (status && status !== "all") {
      filter.status = status;
    }

  const grievances = await Grievance.find(filter)
    .populate("userId", "name email phone")
    .sort({ createdAt: -1 });

  res.json(grievances);
};

/* UPDATE STATUS */
export const updateGrievanceStatus = async (req, res) => {
  try {
    const { status, adminResponse } = req.body;

    const grievance = await Grievance.findById(req.params.id);
    if (!grievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }

    grievance.status = status;
    grievance.adminResponse = adminResponse || grievance.adminResponse;

    await grievance.save();

    const io = req.app.get("io");
    io.emit("grievance:count:update");


    res.json({
      message: "Grievance updated successfully",
      grievance,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* DELETE */
export const deleteGrievance = async (req, res) => {
  await Grievance.findByIdAndDelete(req.params.id);
  res.json({ message: "Grievance removed" });
};

/* REJECT GRIEVANCE */
export const rejectGrievance = async (req, res) => {
  const { adminResponse } = req.body;

  const grievance = await Grievance.findByIdAndUpdate(
    req.params.id,
    {
      status: "rejected",
      adminResponse,
      isRejected: true, // 👈 hides from admin
    },
    { new: true }
  );

  const io = req.app.get("io");
  io.emit("grievance:count:update");

  res.json(grievance);
};

export const getGrievanceCounts = async (req, res) => {
  const total = await Grievance.countDocuments({});
  const rejected = await Grievance.countDocuments({ status: "rejected" });
  const pending = await Grievance.countDocuments({ status: "pending" });
  const inProgress = await Grievance.countDocuments({ status: "inProgress" });
  const resolved = await Grievance.countDocuments({ status: "resolved" });
  


  res.json({ total, pending, inProgress, resolved, rejected });
};

export const getCategoryAnalytics = async (req, res) => {
  try {
    const data = await Grievance.aggregate([
      {
        $match: { isRejected: false } // ❌ exclude rejected
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          category: "$_id",
          count: 1,
          _id: 0
        }
      }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




