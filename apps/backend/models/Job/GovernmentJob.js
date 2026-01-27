import mongoose from "mongoose";

const governmentJobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    applicationLink: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Administrative",
        "Technical",
        "Education",
        "Healthcare",
        "Police",
        "Other",
      ],
    },

    jobType: {
      type: String,
      required: true,
      enum: ["Permanent", "Contract", "Temporary"],
    },

    location: {
      type: String,
      required: true,
    },

    salary: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    deadlineDate: {
      type: Date,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("GovernmentJob", governmentJobSchema);
