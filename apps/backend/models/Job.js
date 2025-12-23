import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: String,
  ownerName: String,
  ownerContact: String,
  category: String,
  salary: String,
  location: String,
  jobType: String,
  postedDate: Date,
  deadlineDate: Date,

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
