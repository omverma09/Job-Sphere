import express from "express";

import {
  createModule,
  getModulesByCourse,
  updateModule,
  deleteModule
} from "../controller/module.controller.js"

import { protect } from "../middleware/auth.middleware.js";
import { isInstructor } from "../middleware/role.middleware.js";
import { checkModuleOwnership } from "../middleware/coursesOwner.middleware.js";


const router = express.Router();

router.post("/", protect, isInstructor, createModule);  // CREATE MODULE
router.get("/course/:courseId", protect, getModulesByCourse);  // GET MODULES OF COURSE
router.put("/:id", protect, isInstructor, checkModuleOwnership, updateModule);  // UPDATE MODULE
router.delete("/:id", protect, isInstructor, checkModuleOwnership, deleteModule);  // DELETE MODULE

export default router;