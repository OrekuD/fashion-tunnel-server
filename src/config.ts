import * as dotenv from "dotenv";

dotenv.config();

const config = {
  CLIENT_HOST: process.env.CLIENT_HOST,
  ADMIN_HOST: process.env.ADMIN_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_FOLDER: process.env.CLOUDINARY_FOLDER,
  NODE_ENV: process.env.NODE_ENV,
};

export default config;
