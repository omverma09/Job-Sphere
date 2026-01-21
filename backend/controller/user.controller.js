import User from "../model/user.model.js"
import { cloudinary } from "../config/cloudinary.js"; 

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // JWT middleware se
    const { name, bio, location, skills } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // text fields
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (location) user.location = location;
    if (skills) user.skills = skills.split(",");

    // profile pic
    if (req.files?.profilePic) {
      // old image delete
      if (user.profilePic?.public_id) {
        await cloudinary.uploader.destroy(user.profilePic.public_id);
      }

      user.profilePic = {
        url: req.files.profilePic[0].path,
        public_id: req.files.profilePic[0].filename,
      };
    }

    // resume
    if (req.files?.resume) {
      // old resume delete
      if (user.resume?.public_id) {
        await cloudinary.uploader.destroy(user.resume.public_id, {
          resource_type: "raw",
        });
      }

      user.resume = {
        url: req.files.resume[0].path,
        public_id: req.files.resume[0].filename,
      };
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Profile update failed" });
  }
};