import { Schema, model } from "mongoose";

const testimonialSchema = new Schema({
  name: { type: String, required: true },
  course: { type: String },
  text: { type: String, required: true },
}, { timestamps: true });

export default model("Testimonial", testimonialSchema);
