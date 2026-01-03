

import { model, Schema } from "mongoose";


const formFieldSchema = new Schema(
  {
    name: { type: String, required: true },       
    label: { type: String, required: true },      
    type: {
      type: String,
      required: true,
      enum: ["text", "email", "number", "tel", "textarea", "radio", "file"],
    },
    required: { type: Boolean, default: false },
    options: [{ type: String }],                  
    accept: { type: String },                    
  },
  { _id: false }
);


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

    
    formFields: [formFieldSchema],
  },
  { timestamps: true }
);

export default model("Course", courseSchema);
