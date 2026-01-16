import express from "express";
import { registerUser, loginUser, forgotPassword, resetPassword, logoutUser } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import User from "../models/Users.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
router.post("/logout", authMiddleware,logoutUser);

// Password reset endpoints
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;


