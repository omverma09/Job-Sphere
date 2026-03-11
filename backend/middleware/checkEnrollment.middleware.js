import User from "../model/user.model.js";
import Enrollment from "../model/enrollment.model.js";

export const checkEnrollment = async (req, res, next) => {
    try {

        const courseId = req.params.id;
        const userId = req.user._id || req.user.id;

        const enrollment = await Enrollment.findOne({
            user: userId,
            course: courseId
        });

        if (!enrollment) {
            return res.status(403).json({
                success: false,
                message: "You are not enrolled in this course"
            });
        }

        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error from enrollment middleware"
        });
    }
};