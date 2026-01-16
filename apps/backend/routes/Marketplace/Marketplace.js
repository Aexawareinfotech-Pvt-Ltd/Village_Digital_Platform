import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import marketplaceUpload from "../../middlewares/marketPlaceUpload.js";
import adminMiddleware from "../../middlewares/adminMiddleware.js";

import {
  createItem,
  getItems,
  getMyItems,
  getTrackedItems,
  buyOrRentItem,
  deleteItem,
  updateStatus,
  updateItem,
  getPendingProducts,
  approveProduct,
  rejectProduct,
  adminListProducts,
  getProductCounts,
  updateDeliveryAddress, // ✅ IMPORT THIS
} from "../../controllers/marketplace/marketplaceController.js";

const router = express.Router();

/* ---------------- PUBLIC ---------------- */
router.get("/list", getItems);

/* ---------------- USER ---------------- */
router.post(
  "/create",
  authMiddleware,
  marketplaceUpload.array("images", 5),
  createItem
);

router.get("/list/my", authMiddleware, getMyItems);
router.get("/track", authMiddleware, getTrackedItems);

router.post("/buy/:id", authMiddleware, buyOrRentItem);

router.patch("/status/:id", authMiddleware, updateStatus);

router.put(
  "/update/:id",
  authMiddleware,
  marketplaceUpload.array("images", 5),
  updateItem
);

router.delete("/delete/:id", authMiddleware, deleteItem);

/* ✅ DELIVERY ADDRESS (THIS WAS MISSING) */
router.patch(
  "/delivery-address/:id",
  authMiddleware,
  updateDeliveryAddress
);

/* ---------------- ADMIN ---------------- */
router.get(
  "/admin/list",
  authMiddleware,
  adminMiddleware,
  adminListProducts
);

router.get(
  "/pending-products",
  authMiddleware,
  adminMiddleware,
  getPendingProducts
);

router.patch(
  "/approve/:id",
  authMiddleware,
  adminMiddleware,
  approveProduct
);

router.patch(
  "/reject/:id",
  authMiddleware,
  adminMiddleware,
  rejectProduct
);

router.get("/count", authMiddleware, adminMiddleware, getProductCounts);

export default router;
