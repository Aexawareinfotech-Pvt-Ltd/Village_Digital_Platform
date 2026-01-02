import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../models/User/Users.js";

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


    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
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

export { registerAdmin, loginAdmin };