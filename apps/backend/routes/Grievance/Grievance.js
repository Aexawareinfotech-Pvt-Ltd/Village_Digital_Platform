import express from "express";
import {
  createGrievance,
  trackGrievance,
  getRecentGrievances,
  getAllGrievances,
  updateGrievanceStatus,
  deleteGrievance,
  rejectGrievance,
  getGrievanceCounts,
  getCategoryAnalytics
 
} from "../../controllers/grievance/grievanceController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import adminMiddleware from "../../middlewares/adminMiddleware.js";
import grievanceUpload from "../../middlewares/grievanceUpload.js";

const router = express.Router();

router.post("/create",authMiddleware, grievanceUpload.array("attachments", 5), createGrievance);

router.get("/track/:grievanceId",authMiddleware, trackGrievance);

router.get("/myrecent",authMiddleware, getRecentGrievances);

router.get("/list", adminMiddleware, getAllGrievances);

router.put("/update/:id",authMiddleware, adminMiddleware, updateGrievanceStatus);

router.delete("/delete/:id", adminMiddleware, deleteGrievance);

router.put("/reject/:id", authMiddleware, adminMiddleware, rejectGrievance);

router.get("/count", adminMiddleware, getGrievanceCounts);

router.get("/analytics/category", adminMiddleware, getCategoryAnalytics);




export default router;
