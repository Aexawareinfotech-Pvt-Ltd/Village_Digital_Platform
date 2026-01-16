import express from "express";
import { registerAdmin, loginAdmin, getUserCount } from "../controllers/adminController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.post("/register", authMiddleware, adminMiddleware, registerAdmin);

//router.get("/user-stats", authMiddleware, adminMiddleware, userStats);

router.get("/stats/users", adminMiddleware, getUserCount);




export default router;
