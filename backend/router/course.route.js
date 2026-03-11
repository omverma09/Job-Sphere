import express from "express";
import {
  createCourse,
  getInstructorCourses,
  updateCourse,
  deleteCourse,
  getCourses,
  getCourseById,
  getMyBatch,
  watchCourse
} from "../controller/course.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { isInstructor } from "../middleware/role.middleware.js";
import { checkCourseOwnership } from "../middleware/coursesOwner.middleware.js";
import { checkEnrollment } from "../middleware/checkEnrollment.middleware.js";
import { upload } from "../config/cloudinaryForVideos.js";

const router = express.Router();

router.post("/", protect, isInstructor, upload.single("thumbnail"), createCourse);  // CREATE COURSE
router.get("/instructor/my-courses", protect, isInstructor, getInstructorCourses); // instr. can get their courses
router.put("/:id", protect, isInstructor, checkCourseOwnership, upload.single("thumbnail"), updateCourse);  // UPDATE COURSE
router.delete("/:id", protect, isInstructor, checkCourseOwnership, deleteCourse);  // DELETE COURSE

router.get("/", protect, getCourses);  // GET ALL COURSES
router.get("/my-batch", protect, getMyBatch);  // Student can get his enrolled Batch
router.get("/watch/:id", protect, checkEnrollment, watchCourse);  // course play
router.get("/:id", protect, getCourseById);  // GET SINGLE COURSE

export default router;