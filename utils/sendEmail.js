import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail({ to, subject, html }) {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY missing");
    }

    if (!to) {
      throw new Error("Recipient email is required");
    }

    const response = await resend.emails.send({
      
      from: "Al-Maahir Academy <noreply@almaahir.online>",

      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    if (response?.error) {
      console.error("❌ RESEND ERROR:", response.error);
      throw new Error(response.error.message);
    }

    console.log("✅ Email sent:", response.data?.id);

    return response;

  } catch (err) {
    console.error("❌ EMAIL FAILED:", err.message);
    throw err;
  }
}