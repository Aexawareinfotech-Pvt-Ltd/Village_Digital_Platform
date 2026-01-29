import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User/Users.js";
import crypto from "crypto";
import sendResetEmail from "../../utils/sendResetEmail.js";
import { registerSchema,loginSchema, resetPasswordSchema, } from "../../utils/authValidator.js";

dotenv.config();

const TOKEN_BYTES = 32;
const TOKEN_EXPIRES_MIN = Number(process.env.PASSWORD_RESET_EXPIRE_MINUTES) || 60;

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";


async function registerUser(req, res) {
  try {
    const { error } = registerSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map(err => err.message)
      });
    }

    const { name, phone, email, address, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email or phone already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      address: address || "",
      passwordHash: hashedPassword,
      role: "User",
      lastActive: new Date()
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function loginUser(req, res) {
  try {
    // ✅ Joi validation
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

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
    res.status(500).json({
      message: "Login failed",
      error: err.message,
    });
  }
}


async function logoutUser(req, res) { 
    return res.json({ message: "Logged out successfully" });
};




export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendResetEmail({
      to: user.email,
      resetUrl,
    });

    res.json({ message: "Reset link sent to email" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { error } = resetPasswordSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        message: "Password validation failed",
        errors: error.details.map(err => err.message)
      });
    }

    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.passwordHash = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export { registerUser, loginUser, logoutUser};
