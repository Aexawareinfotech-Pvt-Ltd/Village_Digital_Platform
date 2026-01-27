import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendJobApplyEmail = async ({ to, name, job }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Village Digital Platform" <${process.env.SMTP_EMAIL}>`,
      to,
      subject: "✅ Job Application Submitted Successfully",
      html: `
        <div style="font-family: Arial, sans-serif; background:#f3f4f6; padding:20px">
          <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; padding:30px">
            
            <h2 style="color:#fe640b;">Hello ${name},</h2>

            <p>You have <b>successfully applied</b> for the job listed below:</p>

            <div style="background:#fff7f0; padding:15px; border-radius:8px; margin:20px 0">
              <p><b>Job Title:</b> ${job.title}</p>
              <p><b>Location:</b> ${job.location}</p>
              <p><b>Salary:</b> ${job.salary}</p>
            </div>

            <p>
              The employer will contact you shortly if your profile is shortlisted.
            </p>

            <p style="margin-top:20px;">
              Best wishes,<br/>
              <b>Village Digital Platform Team</b>
            </p>

            <hr style="margin:30px 0"/>

            <p style="font-size:12px; color:#666; text-align:center;">
              © 2026 Village Digital Platform
            </p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("JOB APPLY EMAIL ERROR:", error);
  }
};

export default sendJobApplyEmail;
