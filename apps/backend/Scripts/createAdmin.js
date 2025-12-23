require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/Users"); 

const MONGODB_URI = process.env.MONGO_URI;
if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in .env");
  process.exit(1);
}

async function run() {
  try {
   await mongoose.connect(MONGODB_URI);

    console.log("Connected to MongoDB");

    const name = process.env.ADMIN_NAME || "Super Admin";
    const email = process.env.ADMIN_EMAIL;
    const phone = process.env.ADMIN_PHONE || "";
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.error("Please set ADMIN_EMAIL and ADMIN_PASSWORD in .env");
      process.exit(1);
    }

    // Check existing by email or phone
    const existing = await User.findOne({ $or: [{ email }, { phone }] });
    if (existing) {
      console.log("An account with that email/phone already exists:");
      console.log({
        id: existing._id.toString(),
        email: existing.email,
        phone: existing.phone,
        role: existing.role
      });
      // If it's already admin, exit gracefully
      if (existing.role === "Admin" || existing.role === "SuperAdmin") {
        console.log("Admin already exists — nothing to do.");
        process.exit(0);
      }
      // Otherwise we can upgrade the existing user (optional)
      console.log("Upgrading existing user to Admin...");
      existing.role = "Admin";
      existing.isVerified = true;
      // set password if you'd like to reset it:
      existing.passwordHash = await bcrypt.hash(password, 10);
      await existing.save();
      console.log("User upgraded to Admin:", existing._id.toString());
      process.exit(0);
    }

    // Create new admin
    const hashed = await bcrypt.hash(password, 10);
    const admin = new User({
      name,
      email,
      phone,
      passwordHash: hashed,
      role: "Admin",
      isVerified: true
    });

    await admin.save();
    console.log("Admin created successfully:");
    console.log({ id: admin._id.toString(), email: admin.email });

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
}

run();
