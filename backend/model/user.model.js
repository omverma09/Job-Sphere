import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: {
      type: String,
      enum: ["admin", "user", "recruiter", "instructor"],
      default: "user",
    },
    bio: { type: String },
    skills: [{ type: String }],
    location: { type: String },
    profilePic: {
      url: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      },
      public_id: String,
    },
    resume: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });

export default mongoose.model("User", userSchema);
