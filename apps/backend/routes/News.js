import express from "express";
import { createNews, getAllNews, getNewsById, updateNews, deleteNews, getCategoryAnalytics, getNewsCount } from "../controllers/Newscontroller.js";

import upload from "../middlewares/upload.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// CREATE NEWS
router.post("/create", adminMiddleware, upload.array("attachments", 5), createNews);

// GET ALL NEWS
router.get("/list", getAllNews);

router.get("/analytics/category", adminMiddleware, getCategoryAnalytics);

router.get("/count", adminMiddleware, getNewsCount);

// GET SINGLE NEWS
router.get("/:id", getNewsById);

// UPDATE NEWS
router.put("/update/:id", adminMiddleware, upload.array("attachments", 5), updateNews);

// DELETE NEWS
router.delete("/delete/:id", adminMiddleware, deleteNews);



export default router;
