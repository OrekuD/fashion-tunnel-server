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
exports.signout = exports.user = void 0;
const types_1 = require("../types");
const argon2_1 = __importDefault(require("argon2"));
const User_1 = __importDefault(require("../models/User"));
const validateEmail_1 = __importDefault(require("../validation/validateEmail"));
const validateName_1 = __importDefault(require("../validation/validateName"));
const AuthResource_1 = __importDefault(require("../resources/AuthResource"));
const UserResource_1 = __importDefault(require("../resources/UserResource"));
const ErrorResource_1 = __importDefault(require("../resources/ErrorResource"));
const OkResource_1 = __importDefault(require("../resources/OkResource"));
const SocketManager_1 = __importDefault(require("../managers/SocketManager"));
const generateRandomCode_1 = __importDefault(require("../utils/generateRandomCode"));
const ResetCode_1 = __importDefault(require("../models/ResetCode"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const getForgotPasswordTemplate_1 = __importDefault(require("../templates/getForgotPasswordTemplate"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email.trim().toLowerCase();
    const firstname = req.body.firstname.trim();
    const lastname = req.body.lastname.trim();
    const password = req.body.password.trim();
    const deviceType = req.body.deviceType;
    if (!(0, validateEmail_1.default)(email)) {
        return res
            .status(400)
            .json(new ErrorResource_1.default("Email is invalid", 400).toJSON());
    }
    if (!(0, validateName_1.default)(firstname)) {
        return res
            .status(400)
            .json(new ErrorResource_1.default("First name is invalid", 400));
    }
    if (!(0, validateName_1.default)(lastname)) {
        return res
            .status(400)
            .json(new ErrorResource_1.default("Last name is invalid", 400).toJSON());
    }
    const isEmailTaken = yield User_1.default.findOne({ email });
    if (isEmailTaken) {
        return res
            .status(409)
            .json(new ErrorResource_1.default("Email is already in use", 409).toJSON());
    }
    try {
        const hashedPassword = yield argon2_1.default.hash(password);
        const user = yield User_1.default.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            deviceType,
            activeAddressId: "",
            profilePicture: "",
            role: types_1.Roles.USER,
        });
        return res.status(200).json(new AuthResource_1.default(user).toJSON());
    }
    catch (err) {
        return res
            .status(500)
            .json(new ErrorResource_1.default("User creation unsuccessfully", 500).toJSON());
    }
});
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password.trim();
    if (!(0, validateEmail_1.default)(email)) {
        return res
            .status(400)
            .json(new ErrorResource_1.default("Email is invalid", 400).toJSON());
    }
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("User not found", 404).toJSON());
    }
    try {
        const isPasswordValid = yield argon2_1.default.verify(user.password, password);
        if (!isPasswordValid) {
            return res
                .status(400)
                .json(new ErrorResource_1.default("Password is invalid", 400));
        }
        return res.status(200).json(new AuthResource_1.default(user).toJSON());
    }
    catch (_a) {
        return res
            .status(500)
            .json(new ErrorResource_1.default("Login unsuccessful", 500).toJSON());
    }
});
const updateProfileImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId);
    if (!user) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("User not found", 404).toJSON());
    }
    user.profilePicture = req.body.profilePicture.trim();
    yield user.save();
    SocketManager_1.default.emitMessage(types_1.Events.USER_PROFILE_UPDATE, user._id.toString(), new UserResource_1.default(user).toJSON());
    return res.status(200).json(new UserResource_1.default(user).toJSON());
});
const user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId);
    if (!user) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("User not found", 404).toJSON());
    }
    return res.status(200).json(new UserResource_1.default(user).toJSON());
});
exports.user = user;
const signout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId);
    if (!user) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("User not found", 404).toJSON());
    }
    return res.status(200).json(new OkResource_1.default().toJSON());
});
exports.signout = signout;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId);
    if (!user) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("User not found", 404).toJSON());
    }
    const checkEmail = yield User_1.default.findOne({
        email: req.body.email.trim().toLowerCase(),
    });
    if (checkEmail &&
        req.body.email.trim().toLowerCase() !== user.email.toLowerCase()) {
        return res
            .status(409)
            .json(new ErrorResource_1.default("Email already taken", 409).toJSON());
    }
    user.email = req.body.email.trim().toLowerCase();
    user.firstname = req.body.firstname.trim();
    user.lastname = req.body.lastname.trim();
    user.activeAddressId = req.body.activeAddressId.trim();
    yield user.save();
    SocketManager_1.default.emitMessage(types_1.Events.USER_PROFILE_UPDATE, user._id.toString(), new UserResource_1.default(user).toJSON());
    return res.status(200).json(new UserResource_1.default(user).toJSON());
});
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId);
    if (!user) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("User not found", 404).toJSON());
    }
    try {
        const isPasswordValid = yield argon2_1.default.verify(user.password, req.body.oldPassword);
        if (!isPasswordValid) {
            return res
                .status(401)
                .json(new ErrorResource_1.default("Password incorrect", 401).toJSON());
        }
        const hashedPassword = yield argon2_1.default.hash(req.body.newPassword);
        yield User_1.default.updateOne({ _id: req.userId }, {
            password: hashedPassword,
        });
        return res.status(200).json(new OkResource_1.default().toJSON());
    }
    catch (e) {
        return res
            .status(500)
            .json(new ErrorResource_1.default("There was an issue with the server", 500));
    }
});
const validateUserEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({
        email: req.body.email.trim().toLowerCase(),
    });
    if (user) {
        return res
            .status(400)
            .json(new ErrorResource_1.default("Email is taken", 400).toJSON());
    }
    return res.status(200).json(new OkResource_1.default().toJSON());
});
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({
        email: req.body.email.trim().toLowerCase(),
    });
    if (!user) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("User not found", 404).toJSON());
    }
    const code = (0, generateRandomCode_1.default)();
    yield ResetCode_1.default.create({
        code,
        userId: user._id.toString(),
        expiresAt: new Date(),
    });
    (0, sendEmail_1.default)(req.body.email.trim(), "Password reset", (0, getForgotPasswordTemplate_1.default)(user.firstname, code));
    return res.status(200).json(new OkResource_1.default().toJSON());
});
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = yield ResetCode_1.default.findOne({
        code: req.body.code.trim(),
    });
    if (!code) {
        return res
            .status(400)
            .json(new ErrorResource_1.default("Code is invalid", 400).toJSON());
    }
    const user = yield User_1.default.findOne({
        email: req.body.email.trim().toLowerCase(),
    });
    if (!user) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("User not found", 404).toJSON());
    }
    if (user._id.toString() !== code.userId) {
        return res
            .status(400)
            .json(new ErrorResource_1.default("Request invalid", 400).toJSON());
    }
    yield ResetCode_1.default.deleteOne({
        code: code.code,
    });
    const hashedPassword = yield argon2_1.default.hash(req.body.password.trim());
    user.password = hashedPassword;
    yield user.save();
    return res.status(200).json(new AuthResource_1.default(user).toJSON());
});
const UserController = {
    signup,
    signin,
    updateProfileImage,
    user: exports.user,
    signout: exports.signout,
    updateUser,
    validateUserEmail,
    changePassword,
    forgotPassword,
    resetPassword,
};
exports.default = UserController;
//# sourceMappingURL=user.js.map