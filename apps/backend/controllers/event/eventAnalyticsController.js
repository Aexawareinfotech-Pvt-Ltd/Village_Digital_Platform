import Event from "../../models/Event/Event.js";
import EventRegistration from "../../models/Event/EventRegistration.js";

// 🔹 EVENT ANALYTICS
export const getEventAnalytics = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const totalRegistrations = await EventRegistration.countDocuments();

    // Events per category
    const eventsByCategory = await Event.aggregate([
      {
        $group: {
          _id: "$category",
          totalEvents: { $sum: 1 }
        }
      }
    ]);

    // Registrations per category
    const registrationsByCategory = await EventRegistration.aggregate([
      {
        $lookup: {
          from: "events",
          localField: "eventId",
          foreignField: "_id",
          as: "event"
        }
      },
      { $unwind: "$event" },
      {
        $group: {
          _id: "$event.category",
          totalRegistrations: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalEvents,
        totalRegistrations,
        eventsByCategory,
        registrationsByCategory
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
