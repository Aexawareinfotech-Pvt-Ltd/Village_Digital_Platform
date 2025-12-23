// apps/backend/utils/sendEmail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async ({ to, subject, text, html }) => {
  // Dev fallback: if NODE_ENV=development and no SMTP configured, or FORCE_DEV_EMAIL=true,
  // log & return a dev marker so tests can read the reset link without sending mail.
  const forceDev = process.env.FORCE_DEV_EMAIL === "true";
  if ((process.env.NODE_ENV === "development" && !process.env.SMTP_HOST) || forceDev) {
    console.log("DEV email:", { to, subject, text, html });
    return { dev: true, to, subject, text, html };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465, // true for 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      text,
      html
    });

    return info;
  } catch (err) {
    // Log helpful debug info before rethrowing so caller can return a useful error.
    console.error("Email send error:", {
      message: err && err.message,
      code: err && err.code,
      response: err && err.response,
    });
    throw err;
  }
};

export default sendEmail;
