import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
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

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    category: {
      type: String,
      enum: [
        "DSA",
        "Web Development",
        "System Design",
        "Computer Networks",
        "Operating Systems",
        "Interview Preparation",
      ],
    },

    thumbnail: {
      type: String,
    },

    thumbnail_public_id: {   // ⭐ add this
      type: String,
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);