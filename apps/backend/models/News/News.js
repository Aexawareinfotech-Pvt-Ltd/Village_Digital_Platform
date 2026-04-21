import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema({
  fileName: String,
  fileUrl: String,
  fileType: String,
});

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["Administrative", "Event", "Emergency", "Health", "Education", "Infrastructure", "Agriculture"],
      required: true,
    },

    // NEW FIELD
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
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

    publishDate: { type: Date, default: Date.now },
    expiryDate: { type: Date },
    featured: { type: Boolean, default: false },
    attachments: [attachmentSchema],
  },
  { timestamps: true }
);

export default mongoose.model("News", newsSchema);
