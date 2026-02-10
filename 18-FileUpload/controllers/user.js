import fs from "fs";
import User from "../models/user.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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
    // console.log(`localPath: ${localPath}`);

    if (!localPath) {
      return res
        .status(400)
        .json({ message: "Pic file path not found. Check multer middleware." });
    }

    const picCloud = await uploadOnCloudinary(localPath);
    // console.log(`Pic cloud response:`, picCloud);

    if (!picCloud) {
      return res.status(400).json({ message: "Cloudinary upload failed." });
    }
    const user = await User.create({
      username,
      email,
      password,
      pic: picCloud.url,
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
