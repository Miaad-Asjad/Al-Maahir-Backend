// import { Schema, model } from 'mongoose';

// const resourceSchema = new Schema({
//   title: { type: String, required: true },
//   type: { type: String, enum: ['pdf','audio','video','note'], default: 'pdf' },
//   url: { type: String, required: true }, 
//   filename: { type: String },
//   size: { type: Number },
//   course: { type: Schema.Types.ObjectId, ref: 'Course' }, 
// }, { timestamps: true });

// export default model('Resource', resourceSchema);



import { Schema, model } from "mongoose";

const resourceSchema = new Schema(
  {
    title: { type: String, required: true },

    type: {
      type: String,
      enum: ["pdf", "audio", "video", "note"],
      default: "pdf",
    },

    // ✅ Cloudinary URL
    url: { type: String, required: true },

    // ✅ Cloudinary public_id (IMPORTANT)
    public_id: { type: String },

    // optional metadata
    filename: { type: String },
    size: { type: Number },

    course: { type: Schema.Types.ObjectId, ref: "Course" },
  },
  { timestamps: true }
);

export default model("Resource", resourceSchema);