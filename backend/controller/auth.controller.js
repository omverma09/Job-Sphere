import dotenv from "dotenv";
dotenv.config();

import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { otpStore, generateTempId } from "../config/otpStore.js";

/* mail transporter */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* REGISTER (SEND OTP) */
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const exist = await User.findOne({ email });
    if (exist)
      return res.status(400).json({ message: "Email already exists" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    const tempId = generateTempId();

    otpStore.set(tempId, {
      otp,
      name,
      email,
      password,
      role: role || "user",
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "JobPortal - OTP Verification",
      html: `<h2>Your OTP: ${otp}</h2><p>Valid for 5 minutes</p>`,
    });

    res.status(200).json({
      success: true,
      tempId,
      message: "OTP sent to email",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

/* VERIFY OTP */
export const verifyOtp = async (req, res) => {
  try {
    const { tempId, otp } = req.body;

    const tempUser = otpStore.get(tempId);
    if (!tempUser)
      return res.status(400).json({ message: "OTP expired" });

    if (tempUser.expiresAt < Date.now()) {
      otpStore.delete(tempId);
      return res.status(400).json({ message: "OTP expired" });
    }

    if (tempUser.otp !== Number(otp))
      return res.status(400).json({ message: "Invalid OTP" });

    const hashedPassword = await bcrypt.hash(tempUser.password, 10);

    const user = await User.create({
      name: tempUser.name,
      email: tempUser.email,
      password: hashedPassword,
      role: tempUser.role,
    });

    otpStore.delete(tempId);

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    user.password = undefined;

    res.status(201).json({
      success: true,
      token,
      user,
      message: "Email verified & user registered",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "OTP verification failed" });
  }
};

/* LOGIN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    user.password = undefined;

    res.json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};