import express from "express";
import {
  createJob,
  getApprovedJobs,
  getPendingJobs,
  approveJob,
  updateJob,
  deleteJob
} from "../controllers/Jobcontroller.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createJob);
router.get("/approved", getApprovedJobs);

router.get("/pending", authMiddleware, adminMiddleware, getPendingJobs);
router.put("/approve/:id", authMiddleware, adminMiddleware, approveJob);

router.put("/update/:id", authMiddleware, updateJob);
router.delete("/delete/:id", authMiddleware, deleteJob);

export default router;
