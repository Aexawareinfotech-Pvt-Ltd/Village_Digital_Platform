import express from "express";
import { createNews, getAllNews, getNewsById, updateNews, deleteNews } from "../../controllers/news/Newscontroller.js";

import upload from "../../middlewares/upload.js";
import adminMiddleware from "../../middlewares/adminMiddleware.js";

const router = express.Router();

// CREATE NEWS
router.post("/create",adminMiddleware, upload.array("attachments", 5), createNews);

// GET ALL NEWS
router.get("/list", getAllNews);

// GET SINGLE NEWS
router.get("/:id", getNewsById);

// UPDATE NEWS
router.put("/update/:id", adminMiddleware, upload.array("attachments", 5), updateNews);

// DELETE NEWS
router.delete("/delete/:id", adminMiddleware, deleteNews);

export default router;
