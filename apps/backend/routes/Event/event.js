import express from "express";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEventAttendees
} from "../../controllers/event/event.js";

import adminMiddleware from "../../middlewares/adminMiddleware.js";
const router = express.Router();

router.post("/create", adminMiddleware, createEvent);
router.put("/:eventId", adminMiddleware, updateEvent);
router.delete("/:eventId", adminMiddleware, deleteEvent);
router.get("/list", getAllEvents);
router.get("/:eventId/attendees", adminMiddleware, getEventAttendees);

export default router;
