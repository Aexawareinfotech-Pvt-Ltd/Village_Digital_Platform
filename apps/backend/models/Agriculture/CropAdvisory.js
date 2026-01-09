import mongoose from "mongoose";

const cropAdvisorySchema = new mongoose.Schema(
  {
    cropName: {
      type: String,
      required: true,
      trim: true,
    },
    season: {
      type: String,
      enum: ["kharif", "rabi", "zaid"],
      required: true,
    },
    sowingTime: {
      type: String,
      required: true,
    },
    seedGuidance: {
      type: String,
      required: true,
    },
    fertilizerAdvice: {
      type: String,
      required: true,
    },
    irrigationAdvice: {
      type: String,
      required: true,
    },
    pestControl: {
      type: String,
      required: true,
    },
    weatherPrecaution: {
      type: String,
      required: true,
    },
    harvesting: {
      type: String,
      required: true,
    },
    dosAndDonts: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  },
  {
    timestamps: true, // creates createdAt & updatedAt
  }
);

export default mongoose.model("CropAdvisory", cropAdvisorySchema);
