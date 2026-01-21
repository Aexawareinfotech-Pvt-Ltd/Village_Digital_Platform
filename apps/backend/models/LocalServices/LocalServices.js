import mongoose from "mongoose";

const localServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    hours: {
      type: String,
      required: true,
    },
    services: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["health", "police", "education", "government", "utilities"],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("LocalService", localServiceSchema);
