import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  ticketId: { type: String, unique: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  registrationId: { type: mongoose.Schema.Types.ObjectId, ref: "EventRegistration" },

  eventName: String,
  venue: String,
  eventDate: Date,
  userName: String,

  status: { type: String, default: "active" }
}, { timestamps: true });

export default mongoose.model("Ticket", ticketSchema);
