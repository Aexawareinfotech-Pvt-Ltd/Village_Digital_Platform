import express from "express";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEventAttendees
} from "../../controllers/event/event.js";
import { getEventAnalytics } from "../../controllers/event/eventAnalyticsController.js";

import adminMiddleware from "../../middlewares/adminMiddleware.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/create", adminMiddleware, createEvent);
router.put("/:id", adminMiddleware, updateEvent);
router.delete("/:id", adminMiddleware, deleteEvent);
router.get("/list", getAllEvents);
router.get("/:id/attendees", adminMiddleware, getEventAttendees);
router.get("/analytics", authMiddleware, getEventAnalytics);

export default router;
