
import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./models/Course.js";

dotenv.config();

const courses = [
    {

    title: "Tehfeez-ul-Quran Course",
    slug: "tehfeez-ul-quran",
    description: "Memorise, Reflect, Transform",
    introduction: `Ready to Begin Your Journey of Quran Memorization?

Have you always dreamed of memorizing the Holy Quran but didn't know where to start? Imagine the sense of accomplishment when you complete the memorization of the entire Quran! At AlMaahir Academy, we bring you an exclusive opportunity to embark on this life-changing journey, from the comfort of your home.`,
    contents: [
      "Memorize the entire Quran with proper Tajweed",
      "Receive one-on-one support for memorization",
      "Make Hifz achievable for women of all ages"

    ],
    objectives: [
      "Flexible Timings: Morning & Evening sessions (9 AM or 5 PM PKT)",
      "Personalized Guidance with expert teachers and self-paced curriculum",
      "All Ladies, All Ages Welcome",
      "Study from anywhere via Zoom"
    ],
    whoCanJoin: "All ladies who want to memorize Quran.",
    duration: "Flexible (based on student’s pace)",
    days: "Mon–Thu",
    time: "10 AM or 5 PM PKT",
    startingDate: "Open Enrollment",
    feeStructure: [
      "3000 PKR",
      "$30 (US, UK, Australia)",
      "100 AED (UAE, Qatar)",
      "100 Riyal (Saudia)"
    ],
    medium: "Live on Zoom",
    
  },

  {
    title: "Short Hifz Course",
    slug: "short-hifz",
    description: "A Heart Engraved with Qur’an",
    introduction: `Begin Your Journey of Hifz with Al-Maahir`,
    duration: "July – October (4 months)",
    days: "Mon–Thu",
    time: "6:00 – 6:30 PM",
    startingDate: "24th June (Interview 6–7 PM)",
    contents: [
      "Focused memorization of first half of Juzz 30",
      "Proper Tajweed & consistency"
    ],
    objectives: [
      "Develop fluency & consistency",
      "Build foundation for further Hifz journey"
    ],
    whoCanJoin: "Students with fluent recitation",
    feeStructure: [
      "1000 PKR",
      "$15",
      "50 AED",
      "50 Riyal"
    ],
    medium: "Live on Zoom",
    note: "Interview required.",
    
  },

  {
    title: "Personalised Quran Classes",
    slug: "personalised-classes",
    description: "Transform your relationship with the Quran today!",
    introduction: `From Beginner to Fluent: Personalised Quran Classes That Work`,
    contents: [
      "Qurani Qaida",
      "Complete Quran recitation",
      "Selected Surahs"
    ],
    objectives: [
      "1-on-1 learning",
      "Custom pace & curriculum",
      "Flexible scheduling"
    ],
    whoCanJoin: "All ages welcome",
    duration: "Ongoing",
    days: "Flexible",
    time: "6 AM – 9 PM PKT",
    startingDate: "Open Enrollment",
    feeStructure: ["5000 PKR", "$50"],
    medium: "Live on Zoom",
    note: "Limited spots.",
    contact: "03335600182"
  },

  {
    title: "Qawaid-al-Tajweed Course",
    slug: "qawaid-al-tajweed",
    description: "Master the Melody of Revelation",
    introduction: `وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا`,
    duration: "July & August",
    days: "Mon–Thu",
    time: "5–6 PM",
    startingDate: "26th June",
    contents: ["Al Qaul us Sadid", "Tarteel of Para 15 & 16"],
    objectives: [
      "Correct pronunciation",
      "Beautify recitation",
      "Follow Sunnah style"
    ],
    whoCanJoin: "Students who know basic Tajweed",
    feeStructure: ["1500 PKR", "$20", "70 AED", "70 Riyal"],
    medium: "Zoom",
    note: "Admissions update soon.",
    
  },

  {
    title: "Tajweed-al-Quran Course",
    slug: "tajweed-al-quran",
    description: "Preserve the sacred tradition of Quranic Recitation",
    introduction: `Learning Tajweed is a means to earn Allah’s pleasure.`,
    duration: "2 years approx",
    days: "Mon–Thu",
    time: "7–8 PM",
    startingDate: "January",
    contents: [
      "Tajweed of full Quran",
      "Basic tajweed rules",
      "Translation of daily ayah",
      "Proper salah recitation"
    ],
    objectives: [
      "Perfect Quranic recitation",
      "Correct pronunciation",
      "Build strong connection with Quran"
    ],
    whoCanJoin: "Beginners & advanced students",
    feeStructure: ["1500 PKR", "$20", "70 AED", "70 Riyal"],
    medium: "Live on Zoom",
    note: "Admissions update soon.",

  },

  {
    title: "Tarjuma-tul-Quran Course",
    slug: "tarjuma-tul-quran",
    description: "Translation & brief explanation",
    introduction: `Understanding Quran is essential for every Muslim.`,
    duration: "6 months",
    days: "Mon–Thu",
    time: "4–5 PM",
    startingDate: "January & July",
    contents: ["Translation & brief explanation (5 ayahs daily)"],
    objectives: ["Understand Quran deeply", "Strengthen faith"],
    whoCanJoin: "Everyone welcome",
    feeStructure: ["1500 PKR", "$20", "70 AED", "70 Riyal"],
    medium: "Zoom",
    note: "Admissions update soon.",
    
  },

  {
    title: "Sahih Al-Bukhari Course",
    slug: "sahih-bukhari",
    description: "Prophetic Guidance for Life",
    introduction: `Immerse in Sahih Bukhari`,
    duration: "6 months",
    contents: ["Recorded lectures of Sahih Bukhari"],
    objectives: [
      "Bring teachings of Islam to life",
      "Learn beliefs & practices",
      "Explore lives of Sahabah"
    ],
    whoCanJoin: "Sisters of all ages",
    feeStructure: ["500 PKR", "$15", "50 AED", "50 Riyal"],
    medium: "Zoom",
    note: "Admissions update soon.",
    
  },

  {
    title: "Husn-e-Sawt Course",
    slug: "husn-e-sawt",
    description: "Recite Qur’an with beauty & grace",
    introduction: `Learn the art of melodious Quran recitation.`,
    contents: [
      "Voice refinement techniques",
      "Proper articulation of letters",
      "Heartfelt recitation"
    ],
    objectives: [
      "Techniques to refine and beautify your voice",

"Proper articulation of letters",

"Ways to make recitation more heartfelt and captivating",
    ],
    whoCanJoin: "This course is perfect for anyone who wishes to elevate their Qur’an recitation and develop a graceful and melodious style. Excellent Tajweed is mandatory to enroll in this course.",
    duration: "Same as Tajweed course schedule",
    days: "Mon–Thu",
    time: "7–8 PM",
    startingDate: "January",
    feeStructure: ["1500 PKR", "$20", "70 AED", "70 Riyal"],
    medium: "Live on Zoom",
    note: "Tajweed required.",
    
  },
];

// SEED FUNCTION
async function seed() {
  try {

    console.log("MONGO_URI:", process.env.MONGO_URI);

    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Clearing existing courses...");
    await Course.deleteMany();

    console.log("Inserting new courses...");
    await Course.insertMany(courses);

    console.log("🎉 Courses successfully seeded!");
    process.exit();
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
}

seed();
