import express from "express";
import {
  createGovernmentJob,
  getAllGovernmentJobs,
  getGovernmentJobById,
  updateGovernmentJob,
  deleteGovernmentJob,
} from "../../controllers/job/governmentJobController.js";


import adminMiddleware from "../../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/create", adminMiddleware, createGovernmentJob);
router.get("/list", getAllGovernmentJobs);
router.get("/:id", getGovernmentJobById);
router.put("/update/:id", adminMiddleware, updateGovernmentJob);
router.delete("/delete/:id", adminMiddleware, deleteGovernmentJob);
export default router;
