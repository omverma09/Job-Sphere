import Course from "../model/course.model.js";
import Module from "../model/module.model.js";
import Lecture from "../model/lecture.model.js";

export const checkCourseOwnership = async (req, res, next) => {
    try {

        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not allowed to access this course"
            });
        }

        req.course = course;

        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const checkModuleOwnership = async (req, res, next) => {
    try {

        const module = await Module.findById(req.params.id);

        if (!module) {
            return res.status(404).json({
                success: false,
                message: "Module not found"
            });
        }

        const course = await Course.findById(module.course);

        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not allowed to access this module"
            });
        }

        req.module = module;

        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const checkLectureOwnership = async (req, res, next) => {
    try {

        const lecture = await Lecture.findById(req.params.id);

        if (!lecture) {
            return res.status(404).json({
                success: false,
                message: "Lecture not found"
            });
        }

        const module = await Module.findById(lecture.module);
        const course = await Course.findById(module.course);

        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not allowed to access this lecture"
            });
        }

        req.lecture = lecture;

        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};