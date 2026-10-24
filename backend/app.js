import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

import userRoutes from "./router/user.route.js";
import authRoutes from "./router/auth.route.js";
import jobRoutes from "./router/job.route.js";
import applicationRoutes from "./router/application.route.js";

// Trust proxy (important for rate limiting behind Render/Railway/Heroku)
app.set("trust proxy", 1);

app.use(compression());

// CORS - only allow your frontend domain
// const allowedOrigins = process.env.FRONTEND_URL
//   ? [process.env.FRONTEND_URL]
//   : ["http://localhost:5173"];

// app.use(
//   cors({
//     origin: (origin, cb) => {
//       if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
//       cb(new Error("Not allowed by CORS"));
//     },
//     credentials: true,
//   })
// );

// CORS - allow local and deployed frontend
const allowedOrigins = [
  "http://localhost:5173",
  "https://job-sphere-znv9.onrender.com",
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return cb(null, true);
      }
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);



app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// DB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // These options keep the connection alive on Render / Railway free tier
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log(" MongoDB Connected");
  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

// Reconnect on drop (handles Render cold starts)
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️  MongoDB disconnected – reconnecting…");
  setTimeout(connectDB, 3000);
});

connectDB();

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Job Portal API Running" });
});

// ── Global error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});