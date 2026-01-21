import express from "express";
import {createJob, getAllJobs, getJobById, getRecruiterJobs} from "../controller/job.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

/* Only Recruiter */
router.post("/", protect, authorize("recruiter"), createJob);
router.get("/recruiter", protect, authorize("recruiter"), getRecruiterJobs);

/* Public (Logged-in users) */
router.get("/", protect, getAllJobs);
router.get("/:id", protect, getJobById);

export default router;
