import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,

    /* ===============================
       🔥 RAZORPAY MARKETPLACE FIELDS
       =============================== */

    // Seller's Razorpay sub-account (Route)
    razorpayAccountId: {
      type: String, // acct_xxxxxxxxx
      default: null,
    },

    // Optional (needed only for bank payouts)
    razorpayFundAccountId: {
      type: String, // fa_xxxxxxxxx
      default: null,
    },

    /* =============================== */

    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // createdAt + updatedAt
  }
);

export default mongoose.model("User", userSchema);
