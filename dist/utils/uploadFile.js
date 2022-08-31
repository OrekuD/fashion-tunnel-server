"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const fs_1 = require("fs");
const config_1 = __importDefault(require("../config"));
const cloudinary_1 = __importDefault(require("../integrations/cloudinary"));
const uploadFile = (path, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((0, fs_1.existsSync)(path)) {
            const result = yield cloudinary_1.default.uploader.upload(path, Object.assign(Object.assign({}, options), { folder: (config_1.default.CLOUDINARY_FOLDER || "") + (options.folder || "") }));
            return { url: result.secure_url, publicId: result.public_id };
        }
        throw new Error("File does not exist");
    }
    catch (err) {
        console.log({ err });
        throw err;
    }
});
exports.uploadFile = uploadFile;
//# sourceMappingURL=uploadFile.js.map