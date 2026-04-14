import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { otpStore, generateTempId, generateOtp } from "../config/otpStore.js";
import { sendOtpEmail } from "../config/mailer.js";

const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
const MAX_OTP_ATTEMPTS = 5;        // brute-force guard

/** Utility: sign JWT */
const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

/** Utility: strip password before sending user object */
const sanitizeUser = (user) => {
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.password;
  return obj;
};

/* ─── REGISTER */
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Basic validation
    if (!name?.trim() || !email?.trim() || !password)
      return res.status(400).json({ success: false, message: "All fields are required." });

    if (password.length < 8)
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters." });

    const allowedRoles = ["user", "recruiter", "instructor"];
    const assignedRole = allowedRoles.includes(role) ? role : "user";

    // Check existing verified user
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing)
      return res.status(409).json({ success: false, message: "An account with this email already exists." });

    // Prevent OTP spam: if a pending entry exists and hasn't expired, reject
    // (tempId is per-session; real anti-spam → rate-limit middleware)
    const otp = generateOtp();
    const tempId = generateTempId();

    otpStore.set(tempId, {
      otp,
      attempts: 0,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: assignedRole,
      expiresAt: Date.now() + OTP_TTL_MS,
    });

    await sendOtpEmail(email.toLowerCase().trim(), otp);

    return res.status(200).json({
      success: true,
      tempId,
      message: "A 6-digit OTP has been sent to your email.",
    });
  } catch (err) {
    console.error("[Auth] register error:", err);
    return res.status(500).json({ success: false, message: "Registration failed. Please try again." });
  }
};

/* RESEND OTP */
export const resendOtp = async (req, res) => {
  try {
    const { tempId } = req.body;

    if (!tempId)
      return res.status(400).json({ success: false, message: "Session ID is required." });

    const tempUser = otpStore.get(tempId);
    if (!tempUser)
      return res.status(400).json({ success: false, message: "Session expired. Please register again." });

    // Issue a fresh OTP and reset TTL
    const otp = generateOtp();
    otpStore.set(tempId, {
      ...tempUser,
      otp,
      attempts: 0,
      expiresAt: Date.now() + OTP_TTL_MS,
    });

    await sendOtpEmail(tempUser.email, otp);

    return res.status(200).json({ success: true, message: "A new OTP has been sent to your email." });
  } catch (err) {
    console.error("[Auth] resendOtp error:", err);
    return res.status(500).json({ success: false, message: "Failed to resend OTP. Please try again." });
  }
};

/* VERIFY OTP */
export const verifyOtp = async (req, res) => {
  try {
    const { tempId, otp } = req.body;

    if (!tempId || !otp)
      return res.status(400).json({ success: false, message: "OTP and session ID are required." });

    const tempUser = otpStore.get(tempId);
    if (!tempUser)
      return res.status(400).json({ success: false, message: "Session expired. Please register again." });

    if (tempUser.expiresAt < Date.now()) {
      otpStore.delete(tempId);
      return res.status(400).json({ success: false, message: "OTP has expired. Please request a new one." });
    }

    // Brute-force guard
    if (tempUser.attempts >= MAX_OTP_ATTEMPTS) {
      otpStore.delete(tempId);
      return res.status(429).json({ success: false, message: "Too many incorrect attempts. Please register again." });
    }

    if (tempUser.otp !== otp.toString().trim()) {
      // Increment attempt counter
      otpStore.set(tempId, { ...tempUser, attempts: tempUser.attempts + 1 });
      const remaining = MAX_OTP_ATTEMPTS - (tempUser.attempts + 1);
      return res.status(400).json({
        success: false,
        message: `Incorrect OTP. ${remaining} attempt${remaining !== 1 ? "s" : ""} remaining.`,
      });
    }

    // OTP valid — create user
    const hashedPassword = await bcrypt.hash(tempUser.password, 12);

    const user = await User.create({
      name: tempUser.name,
      email: tempUser.email,
      password: hashedPassword,
      role: tempUser.role,
    });

    otpStore.delete(tempId);

    const token = signToken(user);

    return res.status(201).json({
      success: true,
      token,
      user: sanitizeUser(user),
      message: "Email verified. Account created successfully.",
    });
  } catch (err) {
    console.error("[Auth] verifyOtp error:", err);
    return res.status(500).json({ success: false, message: "Verification failed. Please try again." });
  }
};

/* LOGIN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password)
      return res.status(400).json({ success: false, message: "Email and password are required." });

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");

    // Unified message prevents email enumeration
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ success: false, message: "Invalid email or password." });

    const token = signToken(user);

    return res.status(200).json({
      success: true,
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    console.error("[Auth] login error:", err);
    return res.status(500).json({ success: false, message: "Login failed. Please try again." });
  }
};