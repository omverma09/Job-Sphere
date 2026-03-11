import Course from "../model/course.model.js";
import Module from "../model/module.model.js";
import Lecture from "../model/lecture.model.js";
import { cloudinary } from "../config/cloudinaryForVideos.js";
import Enrollment from "../model/enrollment.model.js";

// CREATE COURSE
export const createCourse = async (req, res) => {
    try {

        const { title, description, price, category } = req.body;

        if (!title || !description || !price) {
            return res.status(400).json({
                success: false,
                message: "Title, description and price are required"
            });
        }

        const courseData = {
            title,
            description,
            price,
            category,
            instructor: req.user.id
        };

        // agar thumbnail upload hua hai
        if (req.file) {
            courseData.thumbnail = req.file.path;
            courseData.thumbnail_public_id = req.file.filename;
        }

        const course = await Course.create(courseData);

        res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: course
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Instructor khud ke courses dekh skta h.
export const getInstructorCourses = async (req, res) => {
    try {
        const courses = await Course.find({
            instructor: req.user.id
        });

        res.status(200).json({
            success: true,
            courses,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE COURSE
export const updateCourse = async (req, res) => {
    try {

        const course = req.course;

        const { title, description, price, category } = req.body;

        if (title) course.title = title;
        if (description) course.description = description;
        if (price !== undefined) course.price = price;
        if (category) course.category = category;

        // agar new thumbnail upload hua
        if (req.file) {

            // old thumbnail delete
            if (course.thumbnail_public_id) {
                await cloudinary.uploader.destroy(course.thumbnail_public_id);
            }

            // new thumbnail save
            course.thumbnail = req.file.path;
            course.thumbnail_public_id = req.file.filename;
        }

        await course.save();

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: course
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE COURSE
export const deleteCourse = async (req, res) => {
    try {

        const course = req.course;

        // thumbnail delete from cloudinary
        if (course.thumbnail_public_id) {
            await cloudinary.uploader.destroy(course.thumbnail_public_id);
        }

        await course.deleteOne();

        res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET ALL COURSES (all users)
export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("instructor", "name email");

        res.status(200).json({
            success: true,
            courses,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET SINGLE COURSE TO SEE (all users)
export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate(
            "instructor",
            "name email"
        );

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        res.status(200).json({
            success: true,
            course,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Can get My batch
export const getMyBatch = async (req, res) => {
    try {

        const userId = req.user.id;

        const enrollments = await Enrollment.find({ user: userId })
            .populate("course");

        const courses = enrollments.map(e => e.course);

        res.json(courses);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const watchCourse = async (req, res) => {
    try {

        const courseId = req.params.id;
        
        const course = await Course.findById(courseId).select("title");

        const modules = await Module.find({ course: courseId });

        const modulesWithLectures = await Promise.all(
            modules.map(async (module) => {

                const lectures = await Lecture.find({ module: module._id });

                return {
                    ...module._doc,
                    lectures
                };

            })
        );

        res.json({
            success: true,
            course,
            modules: modulesWithLectures
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching course content"
        });
    }
};