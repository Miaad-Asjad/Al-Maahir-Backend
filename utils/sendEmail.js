// import { createTransport } from "nodemailer";

// const transporter = createTransport({
//   host: process.env.EMAIL_HOST,
//   port: Number(process.env.EMAIL_PORT) || 587,
//   secure: false, 
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   tls: {
//     rejectUnauthorized: false, 
//   },
// });

// export default async function sendEmail({ to, subject, html }) {
//   try {
//     const info = await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       html,
//     });

//     console.log("📧 Email sent:", info.messageId);
//     return info;
//   } catch (err) {
//     console.error("EMAIL ERROR:", err.message);
//     throw err;
//   }
// }


// import { createTransport } from "nodemailer";

// /* 🔍 DEBUG — yahan console lagao */
// console.log("EMAIL CONFIG →", {
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   user: process.env.EMAIL_USER,
//   passExists: !!process.env.EMAIL_PASS, // password print nahi hoga (safe)
// });

// const transporter = createTransport({
//   host: process.env.EMAIL_HOST || "smtp.gmail.com",
//   port: Number(process.env.EMAIL_PORT) || 587,
//   secure: false, // TLS (Gmail ke liye correct)
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export default async function sendEmail({ to, subject, html }) {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Al-Maahir Academy" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     });

//     console.log("📧 Email sent successfully:", info.messageId);
//     return info;
//   } catch (err) {
//     console.error("❌ EMAIL SEND FAILED:", err.message);
//     throw err;
//   }
// }


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
