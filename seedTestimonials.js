import mongoose from "mongoose";
import dotenv from "dotenv";
import Testimonial from "./models/Testimonial.js";

dotenv.config();

const testimonials = [
  {
    name: "Anonymous",
    course: "Tajweed Course",
    text: `الحمد لله اس كورس کے ذریعے کافی غلطیوں کی اصلاح ہوئی تمام قواعد بهي تفصيل سے revise ہو گئے بہت اچھے طریقے سے قرآت کروائ گئی نرمی اور تحمل سے غلطیوں کی اصلاح کی گئی قرآن کے مشکل الفاظ کی مشق کروائی گئی اور بھی بہت کچھ سیکھنے کو ملا اللہ تعالیٰ اساتذه كرام كي محنت كو قبول فرمائیں اور ان کی دینی خدمات میں برکت عطا فرمائیں آمین ان شا اللہ میں کچھ اور سورتوں کے ساتھ بھی یہ کورس کرنا چاہوں گی تاکہ مزید بہتری اور پختگی حاصل ہو جائے`
  },

  {
    name: "Anonymous",
    course: "Tajweed Course",
    text: `This tajweed course is very effective. I have learned a lot and all teachers are very hard working, supportive, polite. May Allah Ta’ala give them best reward for their efforts and make me sadiqa jarea for them.`
  },

  {
    name: "Anonymous",
    course: "Tajweed Course",
    text: `تجوید کورس لینے کے بعد بہت سکون قلب ملا ہے۔ بہترین اساتذہ اور بہترین انداز تدریس ہے۔ اللہ تعالیٰ میرے اساتذہ کو جزائے خیر عطا فرمائے۔`
  },

  {
    name: "Anonymous",
    course: "Tajweed Course",
    text: `This tajweed course is very effective I have learned a lot and all teachers are very hardworking, supportive, and polite. May Allah reward them immensely.`
  },

  {
    name: "Anonymous",
    text: `May Allah ﷻ keep us all in best state of health and Eman .. Aameen Alhamdulillah.. Summa Alhamdulillah... This was one of the best courses in my life. I started knowing only few rules but Maa Sha Allah the way my Teachers let more of the knowledge of Tajweed put into my heart and soul, May Allahﷻ give them higher ranks in hereafter and let them spread this masterpiece of True Knowledge to every heart.`
  },

  {
    name: "Anonymous",
    text: `This was my first course with Al Mahir Academy, it was great experience and learning with them specially teachers were very polite and humble.. bcz of my frequent traveling and health issues couldnt attend the classes at the end , but learning word of Allah with the efficient teacher do matters..`
  }
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Clearing existing testimonials...");
    await Testimonial.deleteMany();

    console.log("Inserting testimonials...");
    await Testimonial.insertMany(testimonials);

    console.log("🎉 Testimonials successfully seeded!");
    process.exit();
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
}

seed();
