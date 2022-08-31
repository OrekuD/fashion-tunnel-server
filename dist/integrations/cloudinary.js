"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureCloudinary = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const config_1 = __importDefault(require("../config"));
const cloudinaryV2 = cloudinary_1.default.v2;
const configureCloudinary = () => {
    cloudinary_1.default.v2.config({
        cloud_name: config_1.default.CLOUDINARY_CLOUD_NAME,
        api_key: config_1.default.CLOUDINARY_API_KEY,
        api_secret: config_1.default.CLOUDINARY_SECRET,
    });
};
exports.configureCloudinary = configureCloudinary;
exports.default = cloudinaryV2;
//# sourceMappingURL=cloudinary.js.map