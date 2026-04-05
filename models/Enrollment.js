import { Schema, model } from "mongoose";

const enrollmentSchema = new Schema(
  {
    
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    courseName: { type: String, required: true },
    courseSlug: { type: String, required: true }, 

    // Student info
    name: { type: String, required: true },
    
    phone: { type: String },

    email: { type: String, required: true },
    
    customFields: { type: Schema.Types.Mixed },

    // Files (audio, receipts, etc)

files: { type: Schema.Types.Mixed },

    // Admin can update application status
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
