import Module from "../model/module.model.js";
import Course from "../model/course.model.js"

// CREATE MODULE
export const createModule = async (req, res) => {
    try {

        const { title, course, order } = req.body;

        const courseData = await Course.findById(course);

        if (!courseData) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        const module = await Module.create({
            title,
            course,
            order
        });

        res.status(201).json({
            success: true,
            message: "Module created successfully",
            data: module
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET MODULES BY COURSE
export const getModulesByCourse = async (req, res) => {
    try {

        const modules = await Module.find({
            course: req.params.courseId
        }).sort({ order: 1 });

        res.status(200).json({
            success: true,
            modules
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE MODULE
export const updateModule = async (req, res) => {
    try {

        const module = req.module;

        const updatedModule = await Module.findByIdAndUpdate(
            module._id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: updatedModule
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE MODULE
export const deleteModule = async (req, res) => {
    try {

        const module = req.module;

        await module.deleteOne();

        res.status(200).json({
            success: true,
            message: "Module deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};