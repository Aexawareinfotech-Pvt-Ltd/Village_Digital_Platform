import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/Users.js";

dotenv.config();

const MONGODB_URI = process.env.MONGO_URI; // ✅ FIXED

if (!MONGODB_URI) {
  console.error("Missing MONGO_URI in .env");
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

    const existing = await User.findOne({ $or: [{ email }, { phone }] });

    if (existing) {
      console.log("Admin already exists:", existing.email);
      process.exit(0);
    }

    const hashed = await bcrypt.hash(password, 10);

    const admin = new User({
      name,
      email,
      phone,
      passwordHash: hashed,
      role: "Admin",
      isVerified: true,
    });

    await admin.save();
    console.log("Admin created:", admin.email);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
}

run();
