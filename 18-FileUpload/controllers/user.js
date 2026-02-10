import fs from "fs";
import User from "../models/user.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ message: "Username, password, and email are required" });
    }

    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }
    const localPath = req.files?.pic[0]?.path;

    if (!localPath) {
      return res
        .status(400)
        .json({ message: "Pic file path not found. Check multer middleware." });
    }

    const picCloud = await uploadOnCloudinary(localPath);

    if (!picCloud) {
      return res.status(400).json({ message: "Cloudinary upload failed." });
    }
    
    const picLocalFilename = localPath.split("\\").pop();
    
    const user = await User.create({
      username,
      email,
      password,
      pic: picCloud.url,
      picLocal: picLocalFilename,
    });

    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
      return res.status(500).json({ message: "Registering user error" });
    }

    return res.status(201).json({ message: "User created", createdUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.pic) {
      await deleteFromCloudinary(user.pic);
    }

    if (user.picLocal) {
      const uploadsDir = "./uploads";
      const filePath = `${uploadsDir}/${user.picLocal}`;
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (e) {
        console.error("Error deleting local file:", e.message);
      }
    }

    const deletedUser = await User.findByIdAndDelete(id);
    return res.status(200).json({ message: "User deleted", deletedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
