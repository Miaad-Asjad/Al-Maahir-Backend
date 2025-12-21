import { Schema, model } from 'mongoose';

const resourceSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['pdf','audio','video','note'], default: 'pdf' },
  url: { type: String, required: true }, // file path or external url
  filename: { type: String },
  size: { type: Number },
  course: { type: Schema.Types.ObjectId, ref: 'Course' }, // optional
}, { timestamps: true });

export default model('Resource', resourceSchema);
