import mongoose from "mongoose";
import dotenv from "dotenv";
import CalendarEvent from "./models/CalendarEvent.js";

dotenv.config();

const events = [
  { date: "16th & 17th Dec", day: "Mon & Tue", activity: "Qiraat Interviews" },
  { date: "18th & 19th Dec", day: "Wed & Thu", activity: "Tajweed Interviews" },
  { date: "22nd Dec", day: "Mon", activity: "Tehfeez Admissions" },
  { date: "29th Dec", day: "Mon", activity: "Qiraat Interviews" },
  { date: "30th Dec", day: "Tue", activity: "Tajweed Interviews" },
  { date: "1st Jan", day: "Thu", activity: "All Courses Begin" },
  { date: "17th Feb – 22nd Mar", day: "-", activity: "Ramadan & Eid Break" },
  { date: "25th May – 31st May", day: "-", activity: "Youm Arfa & Eid ul Adha" },
  { date: "20th June", day: "Fri", activity: "Tehfeez Interviews" },
  { date: "18th & 19th June", day: "Wed & Thu", activity: "Tajweed Interviews" },
  { date: "25th June", day: "Thu", activity: "Semester End / Takmeel" },
  { date: "1st July", day: "Wed", activity: "Courses Begin" },
  { date: "14th August", day: "Thu", activity: "Independence Day" },
  { date: "24th Dec", day: "Thu", activity: "Semester End / Takmeel" },
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Clearing old calendar events...");
    await CalendarEvent.deleteMany();

    console.log("Inserting Academic Calendar events...");
    await CalendarEvent.insertMany(
      events.map((ev) => ({
        title: ev.activity,
        date: ev.date,
        details: ev.day,
      }))
    );

    console.log("🎉 Academic Calendar Seeded Successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding Failed:", err);
    process.exit(1);
  }
}

seed();
