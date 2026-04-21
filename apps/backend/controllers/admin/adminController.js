import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../models/User/Users.js";
import sendAdminCredentialsEmail from "../../utils/Sendadmincredentialsemail.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

//REGISTER
async function registerAdmin(req, res) {
  try {
    const { name, phone, email, password} = req.body;

    const existingUser = await User.findOne({ $or: [ { email }, { phone } ] });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email or phone already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, phone, email, passwordHash: hashedPassword,isVerified: true, role: "Admin" });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}   
// LOGIN
async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });


    // const token = jwt.sign(
    //   { userId: user._id, role: user.role },
    //   JWT_SECRET,
    //   { expiresIn: "1d" }
    // );

    const token = jwt.sign(
{
  userId: user._id,
  role: user.role,
  district: user.district,
  subDistrict: user.subDistrict,
  village: user.village
},
process.env.JWT_SECRET,
{ expiresIn: "1d" }
);

    res.json({
    message: "Login successful",
    token,
    role: user.role,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



async function getUserCount(req, res) {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ totalUsers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



async function createVillageAdmin(req, res) {
  try {
    const {
      fullName,
      phone,
      email,
      password,
      district,
      subDistrict,
      village,
      state,
      notificationEmail
    } = req.body;

    // ── Check duplicate ───────────────────────────────────────────────────────
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({
        message: "Admin with this email or phone already exists",
      });
    }

    // ── Hash password & create admin ──────────────────────────────────────────
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
      name: fullName,
      phone,
      email,
      passwordHash: hashedPassword,
      role: "VillageAdmin",
      state,
      district,
      subDistrict,
      village,
      isVerified: true,
    });

    await admin.save();

     const emailRecipient = notificationEmail?.trim() || email;
    // ── Send credentials email (non-blocking) ─────────────────────────────────
    try {
      await sendAdminCredentialsEmail({
        to: emailRecipient,
        adminName: fullName,
        email,
        password,          // plain-text password (before hashing) — sent once
        village,
        district,
        subDistrict,
        state,
      });
    } catch (emailErr) {
      // Admin is already saved — just log the email failure, don't fail the request
      console.error("⚠️ Credentials email failed:", emailErr.message);
    }

    res.status(201).json({
      message: "Village admin created successfully",
      admin,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


/* ===============================
   GET ALL VILLAGE ADMINS
=============================== */

async function getVillageAdmins(req, res) {
  try {

    const admins = await User.find({
      role: "VillageAdmin"
    })
      .select("-passwordHash")
      .sort({ createdAt: -1 });

    res.json(admins);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
}


/* ===============================
   UPDATE VILLAGE ADMIN
=============================== */

async function updateVillageAdmin(req, res) {
  try {

    const { id } = req.params;

    const {
      fullName,
      phone,
      email,
      district,
      subDistrict,
      village
    } = req.body;

    const admin = await User.findById(id);

    if (!admin) {
      return res.status(404).json({
        message: "Village admin not found"
      });
    }

    admin.name = fullName || admin.name;
    admin.phone = phone || admin.phone;
    admin.email = email || admin.email;
    admin.district = district || admin.district;
    admin.subDistrict = subDistrict || admin.subDistrict;
    admin.village = village || admin.village;

    await admin.save();

    res.json({
      message: "Village admin updated successfully",
      admin
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
}


/* ===============================
   DELETE VILLAGE ADMIN
=============================== */

async function deleteVillageAdmin(req, res) {
  try {

    const { id } = req.params;

    const admin = await User.findById(id);

    if (!admin) {
      return res.status(404).json({
        message: "Village admin not found"
      });
    }

    await User.findByIdAndDelete(id);

    res.json({
      message: "Village admin deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
}

export { registerAdmin, loginAdmin, getUserCount, createVillageAdmin,
  getVillageAdmins,
  updateVillageAdmin,
  deleteVillageAdmin};