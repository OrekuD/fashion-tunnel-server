import { UploadApiOptions } from "cloudinary";
import { existsSync } from "fs";
import config from "../config";
import cloudinary from "../integrations/cloudinary";

export const uploadFile = async (path: string, options: UploadApiOptions) => {
  try {
    if (existsSync(path)) {
      const result = await cloudinary.uploader.upload(path, {
        ...options,
        folder: (config.CLOUDINARY_FOLDER || "") + (options.folder || ""),
      });
      return { url: result.secure_url, publicId: result.public_id };
    }
    throw new Error("File does not exist");
  } catch (err) {
    // console.log({ err });
    throw err;
  }
};
