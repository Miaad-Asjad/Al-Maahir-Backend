import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail({ to, subject, html }) {
  try {
    const response = await resend.emails.send({
      from: "Al-Maahir Academy <onboarding@resend.dev>", // ✅ abhi ye hi use karo
      to,
      subject,
      html,
    });

    console.log("📧 Email sent:", response);
    return response;

  } catch (err) {
    console.error("❌ EMAIL FAILED:", err.message);
    throw err;
  }
}