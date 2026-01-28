import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendResetEmail = async ({ to, resetUrl }) => {
  try {
    const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,          // ✅ CHANGE FROM 465 → 587
    secure: false,      // ✅ MUST be false for 587
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
    },
    });


    await transporter.sendMail({
      from: `"Village Digital Platform" <${process.env.SMTP_EMAIL}>`,
      to,
      subject: "🔐 Reset Your Password",
      html: `
        <div style="font-family: Arial; padding:20px">
          <h2>Password Reset Request</h2>
          <p>You requested to reset your password.</p>
          <p>Click the button below:</p>
          <a href="${resetUrl}"
             style="display:inline-block;padding:12px 20px;
                    background:#f97316;color:white;
                     text-decoration:none;border-radius:6px">
             Reset Password
          </a>
          <p style="margin-top:15px;color:#555">
            This link is valid for 15 minutes.
          </p>
        </div>
      `,
    });

    return true;
  } catch (err) {
    console.error("RESET EMAIL ERROR:", err);
    throw new Error("Reset email failed");
  }
};

export default sendResetEmail;
