import express from "express";
import {applyJob, getMyApplications, getJobApplicants, getAllRecruiterApplications} from "../controller/application.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

/* User */
router.post("/apply/:jobId", protect, authorize("user"), applyJob); //ok
router.get("/my-applications", protect, authorize("user"), getMyApplications);

/* Recruiter */
router.get("/job/:jobId", protect, authorize("recruiter"), getJobApplicants);
router.get("/recruiter/applications", protect, authorize("recruiter"), getAllRecruiterApplications);

export default router;