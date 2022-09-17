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
const fs_1 = __importDefault(require("fs"));
const uploadFile_1 = require("../utils/uploadFile");
const path_1 = __importDefault(require("path"));
const uploadImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files) {
        return res.status(400).send({ message: "No file provided" });
    }
    const images = [];
    try {
        const files = req.files.images;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            yield new Promise((resolve) => {
                file.mv(`${__dirname}/${file.name}`, (error) => __awaiter(void 0, void 0, void 0, function* () {
                    if (error) {
                    }
                    const { url } = yield (0, uploadFile_1.uploadFile)(path_1.default.join(__dirname, file.name), {
                        access_mode: "public",
                        folder: "/images",
                    });
                    images.push(url);
                    fs_1.default.unlinkSync(`${__dirname}/${file.name}`);
                    resolve(url);
                }));
            });
        }
    }
    catch (error) {
        return res.status(500).send({ message: "File upload unsuccessful" });
    }
    return res.status(200).send({ images });
});
const ImagesController = {
    uploadImages,
};
exports.default = ImagesController;
//# sourceMappingURL=images.js.map