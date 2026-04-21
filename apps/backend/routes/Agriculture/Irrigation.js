import express from "express";
import {
    createIrrigationGuide,  
    getAllIrrigationGuides,
    updateIrrigationGuide,
    deleteIrrigationGuide,
    getIrrigationGuideById
} from "../../controllers/agriculture/irrigation.js";

import adminMiddleware from "../../middlewares/adminMiddleware.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();    

// CREATE IRRIGATION GUIDE
router.post("/create", adminMiddleware, createIrrigationGuide);

// GET ALL IRRIGATION GUIDES
router.get("/list", authMiddleware, getAllIrrigationGuides);

// UPDATE IRRIGATION GUIDE
router.put("/update/:id", adminMiddleware, updateIrrigationGuide);

// DELETE IRRIGATION GUIDE
router.delete("/delete/:id", adminMiddleware, deleteIrrigationGuide);

// GET SINGLE IRRIGATION GUIDE
router.get("/:id", getIrrigationGuideById);

export default router;