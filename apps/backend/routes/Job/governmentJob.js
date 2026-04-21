import express from "express";
import {
  createGovernmentJob,
  getAllGovernmentJobs,
  getGovernmentJobById,
  updateGovernmentJob,
  deleteGovernmentJob,
} from "../../controllers/job/governmentJobController.js";


import adminMiddleware from "../../middlewares/adminMiddleware.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", adminMiddleware, createGovernmentJob);
router.get("/list",authMiddleware, getAllGovernmentJobs);
router.get("/:id", getGovernmentJobById);
router.put("/update/:id", adminMiddleware, updateGovernmentJob);
router.delete("/delete/:id", adminMiddleware, deleteGovernmentJob);
export default router;
