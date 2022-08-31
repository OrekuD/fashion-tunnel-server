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
const argon2_1 = __importDefault(require("argon2"));
const fs_1 = __importDefault(require("fs"));
const User_1 = __importDefault(require("../models/User"));
const validateEmail_1 = __importDefault(require("../validation/validateEmail"));
const validateName_1 = __importDefault(require("../validation/validateName"));
const AuthResource_1 = __importDefault(require("../resources/AuthResource"));
const UserResource_1 = __importDefault(require("../resources/UserResource"));
const ErrorResource_1 = __importDefault(require("../resources/ErrorResource"));
const OkResource_1 = __importDefault(require("../resources/OkResource"));
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
        });
        return res.status(200).json(new AuthResource_1.default(user, deviceType).toJSON());
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
    const deviceType = req.body.deviceType;
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
        return res.status(200).json(new AuthResource_1.default(user, deviceType).toJSON());
    }
    catch (_a) {
        return res
            .status(500)
            .json(new ErrorResource_1.default("Login unsuccessful", 500).toJSON());
    }
});
const uploadProfileImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (!req.files) {
        return res.status(400).send({ message: "No file provided" });
    }
    try {
        const file = req.files.image;
        file.mv(`${__dirname}/${file.name}`, (error) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                return res.status(500).send({ message: "File upload unsuccessful" });
            }
            try {
                fs_1.default.unlinkSync(`${__dirname}/${file.name}`);
                return res
                    .status(200)
                    .send({ message: "File upload successful", url: "" });
            }
            catch (error) {
                return res.status(500).send({ message: "File upload unsuccessful" });
            }
        }));
        return res.status(500).send({ message: "File upload unsuccessful" });
    }
    catch (error) {
        return res.status(500).send({ message: "File upload unsuccessful" });
    }
});
const user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
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
const UserController = {
    signup,
    signin,
    uploadProfileImage,
    user: exports.user,
    signout: exports.signout,
};
exports.default = UserController;
//# sourceMappingURL=user.js.map