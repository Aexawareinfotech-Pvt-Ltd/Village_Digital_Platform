import mongoose from "mongoose";

const irrigationSchema = new mongoose.Schema(
  {
    cropName: {
      type: String,
      required: true,
      trim: true,
    },
    timing: {
      type: String,
      required: true,
    },
    waterQuantity: {
      type: String,
      required: true,
    },
    specialAlert: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Irrigation", irrigationSchema);
