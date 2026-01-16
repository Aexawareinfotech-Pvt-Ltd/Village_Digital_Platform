import mongoose from "mongoose";

const marketplaceSchema = new mongoose.Schema(
  {
    title: String,
    price: String,
    location: String,
    phone: String,
    description: String,

    type: {
      type: String,
      enum: ["sell", "rent"],
    },

    category: String,

    images: [
      {
        url: String,
        publicId: String,
      },
    ],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    status: {
      type: String,
      enum: ["active", "sold", "rented"],
      default: "active",
    },

    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    rejectionReason: {
      type: String,
      default: "",
    },




    // 🔥 NEW FLAGS
    hiddenBySeller: {
      type: Boolean,
      default: false,
    },

    hiddenByBuyer: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Marketplace", marketplaceSchema);
