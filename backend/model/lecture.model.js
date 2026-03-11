import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        module: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Module",
            required: true
        },
        videoUrl: {
            type: String,
            required: true
        },
        public_id: {
            type: String
        },
        duration: {
            type: Number
        },
    },
    { timestamps: true }
);

export default mongoose.model("Lecture", lectureSchema);