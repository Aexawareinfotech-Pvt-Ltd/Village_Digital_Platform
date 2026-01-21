import express from "express";
import {
  createLocalService,
  getLocalServices,
  updateLocalService,
  deleteLocalService,
} from "../../controllers/localservices/localServicesController.js";

import authMiddleware from "../../middlewares/authMiddleware.js";
import adminMiddleware from "../../middlewares/adminMiddleware.js";

const router = express.Router();

/* ===============================
   PUBLIC ROUTES (ALL USERS)
================================ */

// Get all local services (for users)
router.get("/", getLocalServices);

/* ===============================
   ADMIN ROUTES (PROTECTED)
================================ */

// Create new local service
router.post(
  "/create",
  authMiddleware,
  adminMiddleware,
  createLocalService
);

// Update existing local service
router.put(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  updateLocalService
);

// Delete local service
router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteLocalService
);

export default router;
