import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    template: { type: String, default: "modern" },
    personalInfo: { type: Object, default: {} },
    summary: { type: String, default: "" },
    education: { type: Array, default: [] },
    experience: { type: Array, default: [] },
    projects: { type: Array, default: [] },
    skills: { type: Array, default: [] },
    certifications: { type: Array, default: [] },
  },
  { timestamps: true },
);

export default mongoose.model("Resume", resumeSchema);
