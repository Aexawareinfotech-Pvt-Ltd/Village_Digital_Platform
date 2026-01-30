import Event from "../../models/Event/Event.js";
import EventRegistration from "../../models/Event/EventRegistration.js";
import Ticket from "../../models/Event/Ticket.js";
import sendEmail from "../../utils/sendemail.js";

// REGISTER FOR EVENT
export const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;
    const { name, email, phone } = req.body;

    const event = await Event.findById(eventId);
    if (!event || !event.registrationOpen) {
      return res.status(400).json({ message: "Registration closed" });
    }

    const already = await EventRegistration.findOne({ eventId, userId });
    if (already) {
      return res.status(400).json({ message: "Already registered" });
    }

    const count = await EventRegistration.countDocuments({ eventId });
    if (event.maxAttendees && count >= event.maxAttendees) {
      return res.status(400).json({ message: "Event full" });
    }

    const registration = await EventRegistration.create({
      eventId,
      userId,
      name,
      email,
      phone
    });

    const ticketId = `EVT-${Date.now()}`;

    const ticket = await Ticket.create({
      ticketId,
      eventId,
      userId,
      registrationId: registration._id,
      eventName: event.eventName,
      venue: event.venue,
      eventDate: event.startDate,
      userName: name
    });

    await sendEmail(email, event, ticket);

    const io = req.app.get("io");
    io.emit("event:analytics:update");

    res.json({
      message: "Registration successful",
      ticket
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET EVENTS REGISTERED BY USER
export const getUserRegistrations = async (req, res) => {
  try {
    const { userId } = req.params;

    const registrations = await EventRegistration.find({ userId })
      .populate("eventId", "eventName startDate venue");

    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CANCEL REGISTRATION
export const cancelRegistration = async (req, res) => {
  try {
    const { eventId, userId } = req.params;

    const registration = await EventRegistration.findOneAndDelete({
      eventId,
      userId
    });

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    await Ticket.findOneAndDelete({
      registrationId: registration._id
    });

    const io = req.app.get("io");
    io.emit("event:analytics:update");

    res.json({ message: "Registration cancelled" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });  
        res.json({
            success: true,
            data: events,
        });
    }   
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

