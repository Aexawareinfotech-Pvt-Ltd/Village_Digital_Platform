import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";

import {
  getNotifications,
  createNotification,
  markAsRead,
  deleteNotification
} from "../../controllers/Notification/Notification.js";

const router = express.Router();

router.get("/", authMiddleware, getNotifications);
router.post("/", authMiddleware, createNotification);
router.put("/:id/read", authMiddleware, markAsRead);
router.delete("/:id", authMiddleware, deleteNotification);

export default router;