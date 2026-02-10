import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log(`File Uploaded on Cloudinary : ${response.url}`);
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);
    try {
      fs.unlinkSync(localFilePath);
    } catch (e) {
      console.error("Error deleting file:", e.message);
    }
    return null;
  }
};

const deleteFromCloudinary = async (cloudinaryUrl) => {
  try {
    if (!cloudinaryUrl) return null;
    
    const urlParts = cloudinaryUrl.split("/");
    const fileWithExtension = urlParts[urlParts.length - 1];
    const publicId = fileWithExtension.split(".")[0];
    
    if (!publicId) {
      console.error("Could not extract public_id from URL:", cloudinaryUrl);
      return null;
    }

    const response = await cloudinary.uploader.destroy(publicId);
    console.log(`File deleted from Cloudinary : ${publicId}`);
    return response;
  } catch (error) {
    console.error("Cloudinary delete error:", error.message);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
