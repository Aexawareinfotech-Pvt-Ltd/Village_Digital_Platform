// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import User from "../models/Users.js";

// dotenv.config();

// const MONGODB_URI = process.env.MONGO_URI; // ✅ FIXED

// if (!MONGODB_URI) {
//   console.error("Missing MONGO_URI in .env");
//   process.exit(1);
// }

// async function run() {
//   try {
//     await mongoose.connect(MONGODB_URI);
//     console.log("Connected to MongoDB");

//     const name = process.env.ADMIN_NAME || "Super Admin";
//     const email = process.env.ADMIN_EMAIL;
//     const phone = process.env.ADMIN_PHONE || "";
//     const password = process.env.ADMIN_PASSWORD;

//     if (!email || !password) {
//       console.error("Please set ADMIN_EMAIL and ADMIN_PASSWORD in .env");
//       process.exit(1);
//     }

//     const existing = await User.findOne({ $or: [{ email }, { phone }] });

//     if (existing) {
//       console.log("Admin already exists:", existing.email);
//       process.exit(0);
//     }

//     const hashed = await bcrypt.hash(password, 10);

//     const admin = new User({
//       name,
//       email,
//       phone,
//       passwordHash: hashed,
//       role: "Admin",
//       isVerified: true,
//     });

//     await admin.save();
//     console.log("Admin created:", admin.email);

//     await mongoose.disconnect();
//     process.exit(0);
//   } catch (err) {
//     console.error("Error creating admin:", err);
//     process.exit(1);
//   }
// }

// run();


import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User/Users.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function run() {

  await mongoose.connect(MONGO_URI);
  console.log("MongoDB Connected");

  const name = process.env.ADMIN_NAME || "Master Admin";
  const email = process.env.ADMIN_EMAIL;
  const phone = process.env.ADMIN_PHONE || "";
  const password = process.env.ADMIN_PASSWORD;

  const existing = await User.findOne({ email });

  if (existing) {
    console.log("Master Admin already exists");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new User({
    name,
    email,
    phone,
    passwordHash: hashedPassword,
    role: "MasterAdmin",

    // location not required for master admin
    district: null,
    subDistrict: null,
    village: null,

    isVerified: true
  });

  await admin.save();

  console.log("Master Admin created:", email);

  process.exit();
}

run();