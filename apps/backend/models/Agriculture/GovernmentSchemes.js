import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema(
  {
    schemeName: {
      type: String,
      required: true,
      trim: true,
    },
    benefit: {
      type: String,
      required: true,
    },
    requiredDocuments: {
      type: [String],
      required: true,
    },
    lastDate: {
      type: String,
      required: true,
    },
    officialWebsite: {
      type: String,
      required: true,
    },
    applySteps: {
      type: String,
      required: true,
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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  },
  { timestamps: true }
);

export default mongoose.model("Scheme", schemeSchema);
