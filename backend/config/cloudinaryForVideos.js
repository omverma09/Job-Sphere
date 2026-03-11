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

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {

        let folder = "Edtech/others";
        let resource_type = "auto";

        // lecture video upload
        if (file.fieldname === "video") {
            folder = "Edtech/lectures";
            resource_type = "video";
        }

        // course thumbnail
        if (file.fieldname === "thumbnail") {
            folder = "Edtech/thumbnails";
            resource_type = "image";
        }

        return {
            folder,
            resource_type,
            allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov", "mkv"],
        };
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 500 * 1024 * 1024 }, // 500MB for videos
});

export { upload, cloudinary };