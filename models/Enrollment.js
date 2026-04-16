// import { Schema, model } from "mongoose";

// const enrollmentSchema = new Schema(
//   {
    
//     course: { type: Schema.Types.ObjectId, ref: "Course" },
//     courseName: { type: String, required: true },
//     courseSlug: { type: String, required: true }, 

//     // Student info
//     name: { type: String, required: true },
    
//     phone: { type: String },

//     email: { type: String, required: true },
    
//     customFields: { type: Schema.Types.Mixed },

//     // Files (audio, receipts, etc)

// files: { type: Schema.Types.Mixed },

//     // Admin can update application status
//     status: {
//       type: String,
//       enum: ["pending", "contacted", "accepted", "rejected"],
//       default: "pending",
//     },

//     emailSent: {
//   type: Boolean,
//   default: false,
// },

//   },
//   { timestamps: true }
// );

// export default model("Enrollment", enrollmentSchema);



import { Schema, model } from "mongoose";

const fileSchema = new Schema(
  {
    url: { type: String, required: true },        // ✅ Cloudinary URL
    public_id: { type: String, required: true },  // ✅ Cloudinary delete ke liye
  },
  { _id: false }
);

const enrollmentSchema = new Schema(
  {
    // Course
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    courseName: { type: String, required: true },
    courseSlug: { type: String, required: true },

    // Student info
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true },

    // Dynamic fields
    customFields: { type: Schema.Types.Mixed },

    /* ============================================================
       🔥 FILES (STRUCTURED)
    ============================================================ */
    files: {
      type: Map,
      of: fileSchema, // 🔥 har file = { url, public_id }
      default: {},
    },

    // Status
    status: {
      type: String,
      enum: ["pending", "contacted", "accepted", "rejected"],
      default: "pending",
    },

    emailSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model("Enrollment", enrollmentSchema);