import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import {
  createOrder,
  verifyPayment,
  getReceipts,
  updateDeliveryStatus,
  getDeliveryStatusByProduct,
} from "../../controllers/payment/paymentController.js";
import adminMiddleware from "../../middlewares/adminMiddleware.js";


const router = express.Router();

router.post("/create-order", authMiddleware, createOrder);
router.post("/verify", authMiddleware, verifyPayment);

/* 🧾 GET RECEIPTS (Buyer + Seller) */
router.get("/receipts", authMiddleware, getReceipts);

router.patch(
  "/delivery-status/:id",
  authMiddleware,
  updateDeliveryStatus
);

router.get(
  "/admin/delivery-status/:productId",
  authMiddleware,
  adminMiddleware,
  getDeliveryStatusByProduct
);




export default router;
