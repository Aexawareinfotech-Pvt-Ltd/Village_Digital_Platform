import crypto from "crypto";
import razorpay from "../../config/razorpay.js";
import MarketPlace from "../../models/Marketplace/MarketPlace.js";
import Receipt from "../../models/Marketplace/Receipt.js";



/* ---------------- CREATE ORDER ---------------- */
export const createOrder = async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `order_${Date.now()}`,
    });

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order creation failed" });
  }
};

/* ---------------- VERIFY PAYMENT ---------------- */
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      productId,
      amount,
      deliveryAddress,
    } = req.body;

    // ✅ VALIDATE ADDRESS (THIS FIXES YOUR 400 ERROR)
    if (!deliveryAddress || !deliveryAddress.addressLine1) {
      return res.status(400).json({ message: "Delivery address required" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const product = await MarketPlace.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ UPDATE PRODUCT
    product.status = product.type === "rent" ? "rented" : "sold";
    product.buyer = req.user.userId;
    await product.save();

    // ✅ CREATE RECEIPT WITH ADDRESS
    const receipt = await Receipt.create({
      product: product._id,
      seller: product.owner,
      buyer: req.user.userId,
      amount,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      deliveryAddress,
    });

    res.status(200).json({
      success: true,
      receiptId: receipt._id,
    });
  } catch (err) {
    console.error("Verify error:", err);
    res.status(500).json({ message: "Payment verification failed" });
  }
};

/* ---------------- GET RECEIPTS ---------------- */
export const getReceipts = async (req, res) => {
  const receipts = await Receipt.find({
    $or: [
      { buyer: req.user.userId },
      { seller: req.user.userId },
    ],
  })
    .populate("product", "title")
    .populate("buyer", "name")
    .populate("seller", "name");

  res.json(receipts);
};


export const updateDeliveryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const receipt = await Receipt.findById(req.params.id);
    if (!receipt) {
      return res.status(404).json({ message: "Receipt not found" });
    }

    if (receipt.seller.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not allowed to update delivery status",
      });
    }

    // ✅ VALIDATE ENUM MANUALLY
    const allowed = [
      "pending",
      "packed",
      "shipped",
      "out_for_delivery",
      "delivered",
    ];

    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid delivery status" });
    }

    receipt.deliveryStatus = status;
    await receipt.save();

    const io = req.app.get("io");

    io.to(receipt._id.toString()).emit("delivery-status-updated", {
      receiptId: receipt._id,
      deliveryStatus: status,
    });


    res.json({
      success: true,
      deliveryStatus: receipt.deliveryStatus,
    });
  } catch (err) {
    console.error("Delivery status update error:", err);
    res.status(500).json({ message: "Failed to update delivery status" });
  }
};


// 🔍 ADMIN: GET DELIVERY STATUS BY PRODUCT ID
export const getDeliveryStatusByProduct = async (req, res) => {
  try {
    const receipt = await Receipt.findOne({
      product: req.params.productId,
    });

    if (!receipt) {
      return res.json({ deliveryStatus: null });
    }

    res.json({
      deliveryStatus: receipt.deliveryStatus,
    });
  } catch (err) {
    console.error("Admin delivery status fetch error", err);
    res.status(500).json({ message: "Failed to fetch delivery status" });
  }
};
