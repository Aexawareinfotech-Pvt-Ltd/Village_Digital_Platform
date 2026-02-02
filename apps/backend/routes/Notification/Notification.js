import express from "express";
import {
  getNotifications,
  createNotification,
  markAsRead,
  deleteNotification
} from "../../controllers/Notification/Notification.js";

const router = express.Router();

router.get("/", getNotifications);
router.post("/", createNotification); // Add this line
router.put("/:id/read", markAsRead);
router.delete("/:id", deleteNotification);

export default router;