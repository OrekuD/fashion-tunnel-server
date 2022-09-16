"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const images_1 = __importDefault(require("../controllers/images"));
const router = (0, express_1.Router)();
router.post("/", images_1.default.uploadImages);
exports.default = router;
//# sourceMappingURL=images.js.map