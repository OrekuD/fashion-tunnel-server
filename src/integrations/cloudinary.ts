import cloudinary from "cloudinary";
import config from "../config";

const cloudinaryV2 = cloudinary.v2;

export const configureCloudinary = () => {
  cloudinary.v2.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_SECRET,
  });
};

export default cloudinaryV2;
