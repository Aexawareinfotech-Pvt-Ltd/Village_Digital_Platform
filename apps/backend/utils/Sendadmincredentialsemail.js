import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

/**
 * Sends Village Admin credentials email.
 *
 * @param {Object} params
 * @param {string} params.to          - Recipient email address
 * @param {string} params.adminName   - Full name of the new admin
 * @param {string} params.email       - Login email
 * @param {string} params.password    - Login password
 * @param {string} params.village     - Assigned village name
 * @param {string} params.district    - District name
 * @param {string} params.subDistrict - Sub-district / taluka name
 * @param {string} params.state       - State name
 */
const sendAdminCredentialsEmail = async ({
  to,
  adminName,
  email,
  password,
  village,
  district,
  subDistrict,
  state,
}) => {
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
      subject: "🏡 Village Digital Platform – Admin Access Credentials",
      html: `
        <div style="font-family: Arial, sans-serif; background: #f3f4f6; padding: 30px; margin: 0;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #f97316, #ea580c); padding: 28px 30px; text-align: center;">
              <h2 style="margin: 0; color: #ffffff; font-size: 22px; letter-spacing: 0.5px;">
                🏡 Village Digital Platform
              </h2>
              <p style="margin: 6px 0 0; color: #ffe8d6; font-size: 13px;">Admin Access Notification</p>
            </div>

            <!-- Body -->
            <div style="padding: 32px 30px;">
              <h3 style="margin: 0 0 6px; color: #1f2937; font-size: 18px;">
                Dear ${adminName},
              </h3>
              <p style="margin: 0 0 20px; color: #4b5563; font-size: 14px; line-height: 1.6;">
                You have been assigned as the official <strong>Administrator</strong> for
                <strong>${village}, ${state}</strong> on the Village Digital Platform.
              </p>

              <!-- Credentials Box -->
              <div style="background: #fff7ed; border: 1px solid #fed7aa; border-radius: 10px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 14px; color: #c2410c; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.8px;">
                  🔐 Your Login Credentials
                </p>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #374151;">
                  <tr>
                    <td style="padding: 7px 0; font-weight: 600; width: 40%;">📧 Email</td>
                    <td style="padding: 7px 0;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 7px 0; font-weight: 600;">🔑 Password</td>
                    <td style="padding: 7px 0;">
                      <code style="background: #f3f4f6; padding: 3px 8px; border-radius: 4px; font-family: monospace; letter-spacing: 0.5px;">${password}</code>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Village Assignment Box -->
              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 14px; color: #15803d; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.8px;">
                  📍 Assigned Village
                </p>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #374151;">
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600; width: 40%;">Village</td>
                    <td style="padding: 6px 0;">${village}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600;">Sub District</td>
                    <td style="padding: 6px 0;">${subDistrict}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600;">District</td>
                    <td style="padding: 6px 0;">${district}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600;">State</td>
                    <td style="padding: 6px 0;">${state}</td>
                  </tr>
                </table>
              </div>

              <!-- Responsibilities -->
              <div style="margin-bottom: 24px;">
                <p style="margin: 0 0 10px; color: #374151; font-size: 14px; font-weight: 600;">
                  As a Village Admin, you can:
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 14px; line-height: 1.9;">
                  <li>Manage your village dashboard</li>
                  <li>Verify user registrations</li>
                  <li>Handle local grievances</li>
                  <li>Oversee the village marketplace</li>
                </ul>
              </div>

              <!-- Warning -->
              <div style="background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 6px; padding: 14px 16px; margin-bottom: 24px;">
                <p style="margin: 0; color: #b91c1c; font-size: 13px; font-weight: 600;">
                  ⚠️ Security Notice
                </p>
                <p style="margin: 6px 0 0; color: #7f1d1d; font-size: 13px; line-height: 1.5;">
                  For security reasons, please do <strong>not</strong> share your password with anyone.
                  Change it immediately after your first login.
                </p>
              </div>

              <!-- CTA Button -->
              <div style="text-align: center;">
                <a
                  href="http://localhost:3000/login"
                  style="display: inline-block; background: linear-gradient(135deg, #f97316, #ea580c); color: #ffffff; text-decoration: none; padding: 13px 32px; border-radius: 8px; font-size: 15px; font-weight: 600; letter-spacing: 0.3px;"
                >
                  🚀 Login to Dashboard
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #f9fafb; border-top: 1px solid #e5e7eb; padding: 18px 30px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                © ${new Date().getFullYear()} Village Digital Platform. All rights reserved.
              </p>
              <p style="margin: 4px 0 0; color: #9ca3af; font-size: 11px;">
                This is an automated message from the Master Administrator Team.
              </p>
            </div>

          </div>
        </div>
      `,
    });

    console.log(`✅ Credentials email sent to ${to}`);
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    throw new Error("Email sending failed");
  }
};

export default sendAdminCredentialsEmail;