import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

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


  },
  { timestamps: true }
);

export default mongoose.model("JobApplication", jobApplicationSchema);
