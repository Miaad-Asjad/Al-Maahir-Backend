

import { Schema, model } from "mongoose";

const fileSchema = new Schema(
  {
    url: { type: String, required: true },       
    public_id: { type: String, required: true },  
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

    /*  FILES (STRUCTURED) */
    files: {
      type: Map,
      of: fileSchema, 
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