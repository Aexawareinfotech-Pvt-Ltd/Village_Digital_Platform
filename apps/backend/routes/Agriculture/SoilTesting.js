import express from "express";
import {
    createSoilTestingCenter,    
    getAllSoilTestingCenters,
    updateSoilTestingCenter,
    deleteSoilTestingCenter,
    getSoilTestingCenterById    
} from "../../controllers/agriculture/soilTesting.js";

import adminMiddleware from "../../middlewares/adminMiddleware.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();        

// CREATE SOIL TESTING CENTER
router.post("/create", adminMiddleware, createSoilTestingCenter);

// GET ALL SOIL TESTING CENTERS
router.get("/list",  authMiddleware, getAllSoilTestingCenters);  

// UPDATE SOIL TESTING CENTER
router.put("/update/:id", adminMiddleware, updateSoilTestingCenter);    

// DELETE SOIL TESTING CENTER
router.delete("/delete/:id", adminMiddleware, deleteSoilTestingCenter);

// GET SINGLE SOIL TESTING CENTER
router.get("/:id", getSoilTestingCenterById);

export default router;

