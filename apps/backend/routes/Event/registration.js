import express from "express";
import {
  registerForEvent,
  getUserRegistrations,
  cancelRegistration,
  getAllEvents
} from "../../controllers/event/eventregistration.js";

import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:eventId", authMiddleware, registerForEvent);
router.get("/user/:userId", authMiddleware, getUserRegistrations);
router.delete("/:eventId/user/:userId", authMiddleware, cancelRegistration);
router.get("/list", getAllEvents);

export default router;
