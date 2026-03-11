import express from "express";
import {
  createLecture,
  getLecturesByModule,
  updateLecture,
  deleteLecture
} from "../controller/lecture.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { isInstructor } from "../middleware/role.middleware.js";
import { checkLectureOwnership } from "../middleware/coursesOwner.middleware.js";
import { upload } from "../config/cloudinaryForVideos.js";


const router = express.Router();

router.post("/", protect, isInstructor, upload.single("video"), createLecture);  // CREATE LECTURE
router.get("/module/:moduleId", protect, getLecturesByModule);  // GET LECTURES OF MODULE
router.put("/:id", protect, isInstructor, checkLectureOwnership, upload.single("video"), updateLecture);  // UPDATE LECTURE
router.delete("/:id", protect, isInstructor, checkLectureOwnership, deleteLecture);  // DELETE LECTURE

export default router;