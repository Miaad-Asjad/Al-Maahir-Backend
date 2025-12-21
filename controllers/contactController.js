import ContactMessage from "../models/ContactMessage.js";
import sendEmail from "../utils/sendEmail.js";
import { io } from "../server.js";

/* ======================================================
   CREATE MESSAGE (USER)
====================================================== */
export async function createMessage(req, res) {
  try {
    const { name, email, subject, message } = req.body;

    const msg = new ContactMessage({
      name,
      email,
      subject,
      message,
      read: false,
      replied: false,
    });

    await msg.save();

    // 🔔 REAL-TIME NOTIFICATION (ADMIN)
    io.emit("new-message", {
      id: msg._id,
      name,
      subject,
    });

    // 📧 EMAIL TO ADMIN (silent fail allowed)
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: "📩 New Contact Message",
        html: `
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Subject:</b> ${subject}</p>
          <p>${message}</p>
        `,
      });
    } catch {}

    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Failed to send message." });
  }
}

/* ======================================================
   GET ALL MESSAGES (ADMIN)
====================================================== */
export async function getMessages(_req, res) {
  try {
    const list = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(list);
  } catch {
    res.status(500).json({ message: "Failed to load messages." });
  }
}

/* ======================================================
   MARK AS READ (ADMIN)
====================================================== */
export async function markAsRead(req, res) {
  try {
    const updated = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    // 🔔 REAL-TIME UPDATE
    io.emit("message-read", { id: updated._id });

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Failed to update message." });
  }
}

/* ======================================================
   DELETE MESSAGE (ADMIN)
====================================================== */
export async function deleteMessage(req, res) {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);

    // 🔔 REAL-TIME UPDATE
    io.emit("message-deleted");

    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Failed to delete message." });
  }
}

/* ======================================================
   REPLY TO MESSAGE (ADMIN)
====================================================== */
export async function replyToMessage(req, res) {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    const msg = await ContactMessage.findById(id);
    if (!msg) {
      return res.status(404).json({ message: "Message not found." });
    }

    // 📧 SEND EMAIL TO USER
    await sendEmail({
      to: msg.email,
      subject: `Re: ${msg.subject}`,
      html: `
        <p>Dear ${msg.name},</p>
        <p>${reply}</p>
        <br/>
        <p>Regards,<br/><b>Al-Maahir Academy</b></p>
      `,
    });

    // ✅ UPDATE MESSAGE STATE
    msg.replied = true;
    msg.read = true;
    await msg.save();

    // 🔔 REAL-TIME UPDATE
    io.emit("message-replied", { id: msg._id });

    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Failed to send reply." });
  }
}
