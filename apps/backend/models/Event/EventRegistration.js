import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  name: String,
  email: String,
  phone: String,

  status: { type: String, default: "registered" },
  registeredAt: { type: Date, default: Date.now }
});

export default mongoose.model("EventRegistration", registrationSchema);

