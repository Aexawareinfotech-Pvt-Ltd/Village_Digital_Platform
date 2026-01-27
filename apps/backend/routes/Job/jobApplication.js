import express from "express";
import {
  applyForJob,
  getMyJobApplications,
  getApplicationsByJob
} from "../../controllers/job/jobApplicationController.js";


import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

// USER
router.post("/apply/:jobId", authMiddleware, applyForJob);
router.get("/my-applications", authMiddleware, getMyJobApplications);

// ADMIN
router.get("/job/:jobId", getApplicationsByJob);

export default router;
