import express from "express";
import { registerAdmin, loginAdmin, getUserCount , createVillageAdmin , getVillageAdmins, updateVillageAdmin , deleteVillageAdmin } from "../../controllers/admin/adminController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import adminMiddleware from "../../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.post("/register", authMiddleware, adminMiddleware, registerAdmin);

//router.get("/user-stats", authMiddleware, adminMiddleware, userStats);

router.get("/stats/users", adminMiddleware, getUserCount);

router.post(
  "/village-admin",
  adminMiddleware,
  createVillageAdmin
);

// Get all village admins
router.get(
  "/village-admins",
  adminMiddleware,
  getVillageAdmins
);

// Update village admin
router.put(
  "/village-admin/:id",
  adminMiddleware,
  updateVillageAdmin
);

// Delete village admin
router.delete(
  "/village-admin/:id",
  adminMiddleware,
  deleteVillageAdmin
);


export default router;
