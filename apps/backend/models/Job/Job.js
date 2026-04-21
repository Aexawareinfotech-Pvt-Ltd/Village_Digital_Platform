import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: String,
  ownerName: String,
  ownerContact: String,
  description: String,
  category: String,
  salary: String,
  location: String,
  experience : String,
  jobType: String,
  postedDate: { type: Date, default: Date.now },
  deadlineDate: Date,

  district: {
    type: String,
    default: null,
  },

  subDistrict: {
    type: String,
    default: null,
  },

  village: {
    type: String,
    default: null,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  }
});

export default mongoose.model("Job", jobSchema);
