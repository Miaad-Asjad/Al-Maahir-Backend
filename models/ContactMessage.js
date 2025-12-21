import { Schema, model } from "mongoose";

const ContactMessageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },

    read: { type: Boolean, default: false }, // unread by default
  },
  { timestamps: true }
);

export default model("ContactMessage", ContactMessageSchema);
