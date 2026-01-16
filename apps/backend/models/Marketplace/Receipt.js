// models/Receipt.js
import mongoose from "mongoose";
const receiptSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Marketplace",
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: Number,
    paymentId: String,
    orderId: String,

    // ✅ DELIVERY ADDRESS HERE
    deliveryAddress: {
      fullName: String,
      phone: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      pincode: String,
    },

    deliveryStatus: {
      type: String,
      enum: ["pending", "packed", "shipped", "out_for_delivery", "delivered"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      default: "Razorpay",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Receipt", receiptSchema);
