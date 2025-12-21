import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin' },
}, { timestamps: true });

export default model('User', userSchema);
