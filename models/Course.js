// import { model, Schema } from "mongoose";

// const courseSchema = new Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String },
//     slug: { type: String, unique: true },

//     introduction: { type: String },
//     contents: [{ type: String }],
//     objectives: [{ type: String }],
//     whoCanJoin: { type: String },

//     duration: { type: String },
//     days: { type: String },
//     time: { type: String },
//     startingDate: { type: String },

//     feeStructure: [{ type: String }],
//     medium: { type: String },
//     note: { type: String },
//     contact: { type: String },

//     extraDetails: { type: String },

//     // ✅ NEW
//     whatsappGroupLink: { type: String },
//   },
//   { timestamps: true }
// );


// export default model("Course", courseSchema);


import { model, Schema } from "mongoose";

/* ================= FORM FIELD SCHEMA ================= */
const formFieldSchema = new Schema(
  {
    name: { type: String, required: true },       // unique key e.g. attendance90
    label: { type: String, required: true },      // question text
    type: {
      type: String,
      required: true,
      enum: ["text", "email", "number", "tel", "textarea", "radio", "file"],
    },
    required: { type: Boolean, default: false },
    options: [{ type: String }],                  // for radio
    accept: { type: String },                     // for file
  },
  { _id: false }
);

/* ================= COURSE SCHEMA ================= */
const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },

    slug: { type: String, unique: true },

    introduction: { type: String },
    contents: [{ type: String }],
    objectives: [{ type: String }],
    whoCanJoin: { type: String },

    duration: { type: String },
    days: { type: String },
    time: { type: String },
    startingDate: { type: String },

    feeStructure: [{ type: String }],
    medium: { type: String },
    note: { type: String },
    contact: { type: String },

    extraDetails: { type: String },

    whatsappGroupLink: { type: String },

    /* ⭐ NEW — DYNAMIC ENROLL FORM FIELDS */
    formFields: [formFieldSchema],
  },
  { timestamps: true }
);

export default model("Course", courseSchema);
