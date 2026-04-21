import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  title: String,
  message: String,
  type: String,        // news
  path: String,        // /News
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
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
});

export default mongoose.model("Notification", notificationSchema);
