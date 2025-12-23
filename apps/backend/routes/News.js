import express from "express";
import { createNews, getAllNews, getNewsById, updateNews, deleteNews } from "../controllers/Newscontroller.js";

import { upload } from "../middlewares/upload.js";

const router = express.Router();

// CREATE NEWS
router.post("/create", upload.array("attachments", 5), createNews);

// GET ALL NEWS
router.get("/list", getAllNews);

// GET SINGLE NEWS
router.get("/:id", getNewsById);

// UPDATE NEWS
router.put("/update/:id", upload.array("attachments", 5), updateNews);

// DELETE NEWS
router.delete("/delete/:id", deleteNews);

export default router;
