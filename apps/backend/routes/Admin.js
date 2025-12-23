import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/adminController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.post("/register", authMiddleware, adminMiddleware, registerAdmin);

export default router;
