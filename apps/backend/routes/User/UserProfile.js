import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import  upload  from "../../middlewares/profileUploads.js";

import {
  getMyProfile,
  updateProfile,
  uploadProfilePhoto,
  getProfileStats,
  getProfileActivity,
  getMyListings,
  updateNotifications,
} from "../../controllers/UserProfile/UserProfileController.js";

const router = express.Router();

router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateProfile);
router.put("/photo", authMiddleware, upload.single("image"), uploadProfilePhoto);
router.get("/stats", authMiddleware, getProfileStats);
router.get("/activity", authMiddleware, getProfileActivity);
router.get("/listings", authMiddleware, getMyListings);
router.put("/notifications", authMiddleware, updateNotifications);

export default router;
