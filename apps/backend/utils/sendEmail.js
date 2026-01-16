import nodemailer from "nodemailer";
import fs from "fs";
import generateTicketPDF from "./generateTicketPDF.js";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (to, event, ticket) => {
  try {
    const pdfPath = await generateTicketPDF(ticket, event);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS
      }
    });
    await transporter.sendMail({
      from: `"Village Digital Platform" <${process.env.SMTP_EMAIL}>`,
      to,
      subject: "🎟 Event Registration Successful",
      html: `
      <div style="font-family: Arial, sans-serif; background:#f3f4f6; padding:30px">
        <div style="max-width:600px; margin:auto; background:#fff; border-radius:10px; overflow:hidden">
          
          <div style="background:#4f46e5; padding:20px; color:white; text-align:center">
            <h2>Village Digital Platform</h2>
          </div>

          <div style="padding:30px">
            <h3>Hello ${ticket.userName},</h3>
            <p>Your registration has been <b>successfully confirmed</b>.</p>

            <div style="background:#f9fafb; padding:15px; border-radius:8px">
              <p><b>Event:</b> ${event.eventName}</p>
              <p><b>Date:</b> ${new Date(event.startDate).toDateString()}</p>
              <p><b>Venue:</b> ${event.venue}</p>
              <p><b>Ticket ID:</b> ${ticket.ticketId}</p>
            </div>

            <p style="margin-top:20px">
              Your ticket is attached as a PDF.  
              Please bring it with you on the event day.
            </p>

            <div style="text-align:center; margin-top:30px">
              <span style="background:#4f46e5; color:white; padding:12px 20px; border-radius:6px">
                🎫 Ticket Attached
              </span>
            </div>
          </div>

          <div style="background:#f3f4f6; padding:15px; text-align:center; font-size:12px; color:#555">
            © 2026 Village Digital Platform. All rights reserved.
          </div>
        </div>
      </div>
      `,
      attachments: [
        {
          filename: `ticket-${ticket.ticketId}.pdf`,
          path: pdfPath
        }
      ]
    });

    fs.unlinkSync(pdfPath);

  } catch (error) {
    console.error("EMAIL ERROR:", error);
    throw new Error("Email sending failed");
  }
};

export default sendEmail;
