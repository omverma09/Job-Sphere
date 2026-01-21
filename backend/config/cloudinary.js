import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let folder = "JobPortal/others";
    let resource_type = "image";

    if (file.fieldname === "profilePic") {
      folder = "JobPortal/profilePics";
      resource_type = "image";
    }

    if (file.fieldname === "resume") {
      folder = "JobPortal/resumes";
      resource_type = "raw"; // IMPORTANT for pdf
    }

    return {
      folder,
      resource_type,
      allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf"],
    };
  },
});

// multer middleware
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export { upload, cloudinary };