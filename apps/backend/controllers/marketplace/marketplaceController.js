
import MarketPlace from "../../models/Marketplace/MarketPlace.js"


/* ---------------- CREATE ---------------- */

export const createItem = async (req, res) => {
  try {
    const images = (req.files || []).map((file) => ({
      url: file.path,
      publicId: file.filename,
    }));

    const item = await MarketPlace.create({
      title: req.body.title,
      price: req.body.price,
      location: req.body.location,
      phone: req.body.phone,
      description: req.body.description,
      type: req.body.type,
      category: req.body.category,
      images,
      owner: req.user.id,
      approvalStatus: "pending",
    });
    const io = req.app.get("io");

    res.status(201).json({ success: true, data: item });
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};



/* ---------------- LIST ---------------- */
export const getItems = async (req, res) => {
  const items = await MarketPlace.find({
    approvalStatus: "approved",
    status: "active",
  })
    .populate("owner", "name phone")
    .sort({ createdAt: -1 });

  res.json(items);
};



export const adminListProducts = async (req, res) => {
  try {
    const items = await MarketPlace.find()
      .populate("owner", "name email phone")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Admin product fetch failed" });
  }
};




/* ---------------- MY PRODUCTS ---------------- */
export const getMyItems = async (req, res) => {
  const items = await MarketPlace.find({
    owner: req.user.id,
    hiddenBySeller: false, // 🔥 KEY LINE
  })
    .populate("buyer", "name email phone")
    .populate("owner", "name phone")
    .sort({ createdAt: -1 });

  res.json(items);
};



/* ---------------- UPDATE STATUS ---------------- */
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const item = await MarketPlace.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    item.status = status;
    await item.save();

    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
};



/* ---------------- TRACK PRODUCTS ---------------- */
export const getTrackedItems = async (req, res) => {
  const items = await MarketPlace.find({
    buyer: req.user.id,
    hiddenByBuyer: false, // 🔥 KEY LINE
  })
    .populate("owner", "name email phone")
    .sort({ updatedAt: -1 });

  res.json(items);
};

/* ---------------- BUY / RENT ---------------- */
export const buyOrRentItem = async (req, res) => {
  const item = await MarketPlace.findById(req.params.id);

  if (!item || item.status !== "active") {
    return res.status(400).json({ message: "Item not available" });
  }

  item.buyer = req.user.id;
  item.status = item.type === "rent" ? "rented" : "sold";

  await item.save();
  res.json({ success: true });
};

/* ---------------- DELETE ---------------- */
export const deleteItem = async (req, res) => {
  const item = await MarketPlace.findById(req.params.id);

  if (!item) {
    return res.status(404).json({ message: "Product not found" });
  }

  const userId = req.user.id;

  // 🟢 NOT SOLD → REAL DELETE
  if (item.status === "active") {
    if (item.owner.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    item.hiddenBySeller = true;
    await item.save();
    return res.json({ success: true, message: "Product hidden from your view" });
  }


  // 🔵 SOLD PRODUCT → SOFT DELETE
  if (item.status === "sold" || item.status === "rented") {
    if (item.owner.toString() === userId) {
      item.hiddenBySeller = true;
    }

    if (item.buyer?.toString() === userId) {
      item.hiddenByBuyer = true;
    }

    await item.save();

    return res.json({
      success: true,
      message: "Product hidden from your view",
    });
  }
};





export const updateItem = async (req, res) => {
  try {
    const item = await MarketPlace.findById(req.params.id);

    if (!item) return res.status(404).json({ message: "Not found" });
    if (item.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    Object.assign(item, req.body);

    if (req.files?.length) {
      item.images = req.files.map((f) => ({
        url: f.path,
        publicId: f.filename,
      }));
    }

    await item.save();
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};



/* ---------------- GET PENDING ---------------- */
export const getPendingProducts = async (req, res) => {
  try {
    const items = await MarketPlace.find({
      approvalStatus: "pending",
    }).populate("owner", "name phone");

    const io = req.app.get("io");
    io.emit("marketplace:count:update");

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pending products" });
  }
};

/* ---------------- APPROVE ---------------- */
export const approveProduct = async (req, res) => {
  const item = await MarketPlace.findById(req.params.id);

  if (!item) return res.status(404).json({ message: "Product not found" });

  item.approvalStatus = "approved";
  await item.save();

  const io = req.app.get("io");
  io.emit("marketplace:count:update");

  res.json({ success: true, message: "Product approved" });
};

/* ---------------- REJECT ---------------- */
export const rejectProduct = async (req, res) => {
  const { reason } = req.body;

  if (!reason || reason.trim().length < 5) {
    return res.status(400).json({
      message: "Rejection reason is required (min 5 characters)",
    });
  }

  const item = await MarketPlace.findById(req.params.id);

  if (!item) {
    return res.status(404).json({ message: "Product not found" });
  }

  // 🚫 BLOCK REJECTION AFTER SALE
  if (item.status === "sold" || item.status === "rented") {
    return res.status(400).json({
      message: "Cannot reject a product after it is sold or rented",
    });
  }

  // 🚫 BLOCK REJECTION IF ALREADY APPROVED (OPTIONAL BUT RECOMMENDED)
  if (item.approvalStatus === "approved") {
    return res.status(400).json({
      message: "Approved product cannot be rejected",
    });
  }

  item.approvalStatus = "rejected";
  item.rejectionReason = reason;

  await item.save();

  const io = req.app.get("io");
  io.emit("product-rejected", {
    productId: item._id,
    reason,
  });

  res.json({
    success: true,
    message: "Product rejected with reason",
  });
};



export const getProductCounts = async (req, res) => {
  try{  
  const total = await MarketPlace.countDocuments({});
  const seller = await MarketPlace.distinct("owner").then((owners) => owners.length);
  const buyer = await MarketPlace.distinct("buyer", { buyer: { $ne: null } }).then((buyers) => buyers.length);
  const active = await MarketPlace.countDocuments({ status: "active" });
  const sold = await MarketPlace.countDocuments({ status: "sold" });
  const rented = await MarketPlace.countDocuments({ status: "rented" });
  const rejected = await MarketPlace.countDocuments({ approvalStatus: "rejected" });
  const pending = await MarketPlace.countDocuments({ approvalStatus: "pending" });
  const approved = await MarketPlace.countDocuments({ approvalStatus: "approved" });
  res.json({ total, seller, buyer, active, sold ,rented , pending, approved, rejected });
  } catch (error) {
    console.error("Error fetching product count:", error);
    res.status(500).json({ message: "Failed to fetch product count" });
  }
};

/* ---------------- UPDATE DELIVERY ADDRESS ---------------- */
export const updateDeliveryAddress = async (req, res) => {
  try {
    const item = await MarketPlace.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false });
    }

    if (item.status !== "active") {
      return res.status(400).json({ success: false });
    }

    // 🔥 THIS LINE IS CRITICAL
    item.deliveryAddress = {
      fullName: req.body.fullName,
      phone: req.body.phone,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
    };

    await item.save();

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};


