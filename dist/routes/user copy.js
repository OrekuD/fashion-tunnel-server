"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../controllers/user"));
const validateUser_1 = require("../middlewares/validateUser");
const router = (0, express_1.Router)();
router.post("/sign-up", user_1.default.signup);
router.post("/sign-in", user_1.default.signin);
router.post("/upload-profile-image", validateUser_1.validateUser, user_1.default.uploadProfileImage);
router.get("/sign-out", validateUser_1.validateUser, user_1.default.signout);
router.get("/user", validateUser_1.validateUser, user_1.default.user);
exports.default = router;
//# sourceMappingURL=user%20copy.js.map