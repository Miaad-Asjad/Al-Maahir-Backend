import { Schema, model } from "mongoose";

const calendarSchema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },    
    details: { type: String },
  },
  { timestamps: true }
);

export default model("CalendarEvent", calendarSchema);
