import express from "express";
import {
    createGovernmentScheme,
    getAllGovernmentSchemes,
    updateGovernmentScheme,
    deleteGovernmentScheme
} from "../../controllers/agriculture/GovernmentSchemes.js";

import adminMiddleware from "../../middlewares/adminMiddleware.js";

const router = express.Router();        

// CREATE GOVERNMENT SCHEME
router.post("/create", adminMiddleware, createGovernmentScheme);

// GET ALL GOVERNMENT SCHEMES
router.get("/list", getAllGovernmentSchemes);

// UPDATE GOVERNMENT SCHEME
router.put("/update/:id", adminMiddleware, updateGovernmentScheme);

// DELETE GOVERNMENT SCHEME
router.delete("/delete/:id", adminMiddleware, deleteGovernmentScheme);

export default router;
