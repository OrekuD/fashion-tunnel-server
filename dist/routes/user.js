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
router.put("/profile-image", validateUser_1.validateUser, user_1.default.updateProfileImage);
router.get("/sign-out", validateUser_1.validateUser, user_1.default.signout);
router.get("/", validateUser_1.validateUser, user_1.default.user);
router.put("/", validateUser_1.validateUser, user_1.default.updateUser);
router.put("/change-password", validateUser_1.validateUser, user_1.default.changePassword);
router.post("/validate/email", user_1.default.validateUserEmail);
exports.default = router;
//# sourceMappingURL=user.js.map