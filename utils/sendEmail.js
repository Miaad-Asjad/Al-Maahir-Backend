

import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

console.log("EMAIL CONFIG →", {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  user: process.env.EMAIL_USER,
  passExists: !!process.env.EMAIL_PASS,
});

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default async function sendEmail({ to, subject, html }) {
  try {
    const info = await transporter.sendMail({
      from: `"Al-Maahir Academy" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📧 Email sent successfully:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ EMAIL FAILED:", err.message);
    throw err;
  }
}
