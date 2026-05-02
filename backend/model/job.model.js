import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract"],
      required: true,
    },
    workMode: {
      type: String,
      enum: ["remote", "work-from-home", "on-site"],
      required: true,
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// ── Indexes for fast filtering & pagination ────────────────────────────────────
jobSchema.index({ _id: -1 });                          // cursor pagination
jobSchema.index({ title: "text", description: "text" }); // full-text keyword search
jobSchema.index({ jobType: 1, workMode: 1, location: 1 }); // compound filter
jobSchema.index({ recruiter: 1 });                     // recruiter's jobs
jobSchema.index({ salary: 1 });                        // salary range filter

export default mongoose.model("Job", jobSchema);
