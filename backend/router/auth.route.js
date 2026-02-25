import express from "express";
import { register, verifyOtp, login } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register", register);       // send otp
router.post("/verify-otp", verifyOtp);   // verify & create user
router.post("/login", login);

export default router;
