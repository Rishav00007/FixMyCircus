import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCLoudinary = async (filePath) => {
  try {
    if (!filePath) {
      console.log("❌ No file path received");
      return null;
    }
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    console.log("file is uploaded successfull", result.url);
    return result;
  } catch (error) {
    console.log("❌ Cloudinary upload failed:", error);
    fs.unlinkSync(filePath);

    console.log(error.message);
    return null;
  }
};

export { uploadOnCLoudinary };
