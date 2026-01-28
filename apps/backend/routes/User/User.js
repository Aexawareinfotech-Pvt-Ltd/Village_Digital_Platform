import express from "express";
import { registerUser, loginUser,logoutUser, forgotPassword, resetPassword , getMe} from "../../controllers/auth/authController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
router.post("/logout", authMiddleware,logoutUser);

// Password reset endpoints
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.post("/me", authMiddleware, getMe);
export default router;


