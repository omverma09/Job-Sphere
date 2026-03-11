import Lecture from "../model/lecture.model.js";
import { cloudinary } from "../config/cloudinaryForVideos.js";

// CREATE LECTURE
export const createLecture = async (req, res) => {
    try {

        const { title, module } = req.body;

        if (!title || !module) {
            return res.status(400).json({ message: "All fields Required" });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Video is required"
            });
        }

        const lecture = await Lecture.create({
            title,
            module,
            videoUrl: req.file.path,
            public_id: req.file.filename,
            duration: req.file.duration
        });

        res.status(201).json({
            success: true,
            message: "Lecture uploaded successfully",
            data: lecture
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// GET LECTURES BY MODULE
export const getLecturesByModule = async (req, res) => {
    try {

        const lectures = await Lecture.find({
            module: req.params.moduleId
        }).sort({ order: 1 });

        res.status(200).json({
            success: true,
            lectures
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE LECTURE
export const updateLecture = async (req, res) => {
    try {

        const lecture = req.lecture; // ownership middleware se aaya hai

        const { title } = req.body;

        if (title) {
            lecture.title = title;
        }

        // agar new video upload hua
        if (req.file) {

            // purana video delete
            if (lecture.public_id) {
                await cloudinary.uploader.destroy(lecture.public_id, {
                    resource_type: "video",
                });
            }

            // new video save
            lecture.videoUrl = req.file.path;
            lecture.public_id = req.file.filename;
        }

        await lecture.save();

        res.status(200).json({
            success: true,
            message: "Lecture updated successfully",
            data: lecture,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE LECTURE
export const deleteLecture = async (req, res) => {
    try {

        const lecture = req.lecture;

        // delete video from cloudinary
        if (lecture.public_id) {
            await cloudinary.uploader.destroy(lecture.public_id, {
                resource_type: "video"
            });
        }

        await lecture.deleteOne();

        res.status(200).json({
            success: true,
            message: "Lecture deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};