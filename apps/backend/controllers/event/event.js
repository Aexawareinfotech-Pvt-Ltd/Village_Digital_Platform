import Event from "../../models/Event/Event.js";
import EventRegistration from "../../models/Event/EventRegistration.js";
import Ticket from "../../models/Event/Ticket.js";

export const createEvent = async (req, res) => {            
    try {
        const event = await Event.create({ 
            eventName: req.body.eventName,
            category: req.body.category, 
            description: req.body.description,  
            venue: req.body.venue,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            isRegistrationRequired: req.body.isRegistrationRequired,
            maxAttendees: req.body.maxAttendees,
            createdBy: req.user.id, 
        }); 
        const io = req.app.get("io");
        io.emit("event:analytics:update");
        res.status(201).json({
            success: true,
            data: event,
        });
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message,
        });
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

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        eventName: req.body.eventName, 
        description: req.body.description,
        venue: req.body.venue,
        category: req.body.category,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        isRegistrationRequired: req.body.isRegistrationRequired,
        maxAttendees: req.body.maxAttendees,
      },
      {
        new: true,        
      }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;   // ✅ FIX HERE

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    await Event.findByIdAndDelete(id);
    await EventRegistration.deleteMany({ eventId: id });
    await Ticket.deleteMany({ eventId: id });

    const io = req.app.get("io");
    io.emit("event:analytics:update");

    res.status(200).json({
      success: true,
      message: "Event and associated data deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET ATTENDEES FOR EVENT
export const getEventAttendees = async (req, res) => {
  try {
    const { id } = req.params;

    const registrations = await EventRegistration.find({ eventId: id });

    const attendees = await Promise.all(
      registrations.map(async (reg) => {
        const ticket = await Ticket.findOne({
          registrationId: reg._id
        });

        return {
          name: reg.name,
          email: reg.email,
          phone: reg.phone,
          ticketId: ticket ? ticket.ticketId : null,
          registeredAt: reg.registeredAt
        };
      })
    );

    res.json({
      totalRegistered: attendees.length,
      attendees
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};