import mongoose from "mongoose";

const attachmentSchema= new mongoose.Schema({
  fileName: String,
  fileUrl: String,
  fileType: String,
});

const grievanceSchema = new mongoose.Schema(
  {
    grievanceId: {
      type: String,
      unique: true,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    attachments: [
        attachmentSchema
    ],

    isAnonymous: {
      type: Boolean,
      default: false,
    },

    contactInfo: {
      name: String,
      phone: String,
    },

    status: {
      type: String,
      enum: ["pending", "inProgress", "resolved", "rejected"],
      default: "pending",
    },

    isRejected: {
        type: Boolean,
        default: false,
    },

    adminResponse: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Grievance", grievanceSchema);
