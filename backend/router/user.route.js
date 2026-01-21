import express from "express";
import { updateUserProfile } from "../controller/user.controller.js";
import { upload } from "../config/cloudinary.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.put(
  "/update-profile", protect, authorize("user"),
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateUserProfile
);

export default router;