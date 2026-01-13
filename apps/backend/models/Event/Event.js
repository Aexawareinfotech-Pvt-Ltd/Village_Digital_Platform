import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  startDate: Date,
  endDate: Date,
  venue: String,

  isRegistrationRequired: { type: Boolean, default: false },
  maxAttendees: { type: Number, default: null },
  registrationOpen: { type: Boolean, default: true },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
