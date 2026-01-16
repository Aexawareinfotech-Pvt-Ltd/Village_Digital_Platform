import express from "express";
import {
    createCropAdvisory, 
    getAllCropAdvisories,
    getCropAdvisoryById,
    updateCropAdvisory,
    deleteCropAdvisory
} from "../../controllers/agriculture/cropAdvisory.js";

import adminMiddleware from "../../middlewares/adminMiddleware.js";     

const router = express.Router();

// CREATE CROP ADVISORY
router.post("/create", adminMiddleware, createCropAdvisory);    

// GET ALL CROP ADVISORIES
router.get("/list", getAllCropAdvisories);

// GET SINGLE CROP ADVISORY
router.get("/:id", getCropAdvisoryById);

// UPDATE CROP ADVISORY
router.put("/update/:id", adminMiddleware, updateCropAdvisory);

// DELETE CROP ADVISORY
router.delete("/delete/:id", adminMiddleware, deleteCropAdvisory);

export default router;
