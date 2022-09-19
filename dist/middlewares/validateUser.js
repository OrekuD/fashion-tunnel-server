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
exports.validateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const ErrorResource_1 = __importDefault(require("../resources/ErrorResource"));
const User_1 = __importDefault(require("../models/User"));
const validateUser = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json(new ErrorResource_1.default("Unauthorized", 401));
    }
    return jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log(err);
            return res.status(403).json(new ErrorResource_1.default("Unauthorized", 403));
        }
        const _user = yield User_1.default.findOne({
            _id: user.userId,
        });
        if (!_user) {
            return res.status(403).json(new ErrorResource_1.default("Unauthorized", 403));
        }
        req.userId = user.userId;
        return next();
    }));
};
exports.validateUser = validateUser;
//# sourceMappingURL=validateUser.js.map