import nodemailer from "nodemailer";
import fs from "fs";
import dotenv from "dotenv";
import generatePaymentReceiptPDF from "./generatePaymentReceiptPDF.js";

dotenv.config();

const sendPaymentReceiptEmail = async (buyer, receipt, product) => {
  try {
    const pdfPath = await generatePaymentReceiptPDF(
      receipt,
      buyer,
      product
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Village Digital Platform" <${process.env.SMTP_EMAIL}>`,
      to: buyer.email,
      subject: "🧾 Payment Successful – Receipt Attached",
      html: `
        <div style="font-family: Arial; background:#f3f4f6; padding:30px">
          <div style="max-width:600px; margin:auto; background:#fff; border-radius:10px">
            <div style="background:#16a34a; padding:20px; color:white; text-align:center">
              <h2>Payment Successful</h2>
            </div>

            <div style="padding:30px">
              <p>Hello <b>${buyer.name}</b>,</p>

              <p>Your payment was completed successfully.</p>

              <div style="background:#f9fafb; padding:15px; border-radius:8px">
                <p><b>Product:</b> ${product.title}</p>
                <p><b>Amount Paid:</b> ₹${receipt.amount}</p>
                <p><b>Transaction ID:</b> ${receipt.paymentId}</p>
              </div>

              <p style="margin-top:20px">
                Your payment receipt is attached as a PDF.
              </p>
            </div>

            <div style="background:#f3f4f6; padding:15px; text-align:center; font-size:12px">
              © 2026 Village Digital Platform
            </div>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `receipt-${receipt._id}.pdf`,
          path: pdfPath,
        },
      ],
    });

    fs.unlinkSync(pdfPath);

  } catch (err) {
    console.error("Receipt email error:", err);
    throw err;
  }
};

export default sendPaymentReceiptEmail;
