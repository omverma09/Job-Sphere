import express from "express";
import rateLimit from "express-rate-limit";
import { register, verifyOtp, resendOtp, login } from "../controller/auth.controller.js";

const router = express.Router();

/** Rate limiter for auth endpoints — prevents brute-force & spam */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests. Please try again after 15 minutes." },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // slightly more generous for login
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many login attempts. Please try again after 15 minutes." },
});

router.post("/register",    authLimiter,  register);
router.post("/verify-otp",  authLimiter,  verifyOtp);
router.post("/resend-otp",  authLimiter,  resendOtp);
router.post("/login",       loginLimiter, login);

export default router;