import nodemailer from "nodemailer";

// Connection pool — reuses SMTP connections across requests
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password (not account password)
  },
  pool: true,        // keep connections alive
  maxConnections: 5, // handle concurrent sends
  maxMessages: 100,
  rateLimit: 10,     // max 10 msgs/sec per connection
});

// Verify connection on startup
transporter.verify((err) => {
  if (err) console.error("[Mailer] SMTP connection failed:", err.message);
  else console.log("[Mailer] SMTP ready");
});

/**
 * Send OTP verification email
 * @param {string} to  - recipient email
 * @param {string} otp - 6-digit OTP
 */
export const sendOtpEmail = async (to, otp) => {
  await transporter.sendMail({
    from: `"FindingJob" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Verification Code – FindingJob",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:32px;border:1px solid #e5e7eb;border-radius:12px">
        <h2 style="color:#1d4ed8;margin-bottom:8px">Email Verification</h2>
        <p style="color:#374151;margin-bottom:24px">Use the code below to verify your email address. It expires in <strong>5 minutes</strong>.</p>
        <div style="background:#f3f4f6;border-radius:8px;padding:20px;text-align:center;letter-spacing:10px;font-size:32px;font-weight:700;color:#111827">
          ${otp}
        </div>
        <p style="color:#6b7280;font-size:13px;margin-top:24px">If you did not request this, please ignore this email.</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0"/>
        <p style="color:#9ca3af;font-size:12px">FindingJob — Connecting talent with opportunity</p>
      </div>
    `,
  });
};

export default transporter;