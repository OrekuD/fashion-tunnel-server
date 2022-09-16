"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const ErrorResource_1 = __importDefault(require("../resources/ErrorResource"));
const validateUser = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json(new ErrorResource_1.default("Unauthorized", 401));
    }
    return jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json(new ErrorResource_1.default("Unauthorized", 403));
        }
        req.userId = user.userId;
        return next();
    });
};
exports.validateUser = validateUser;
//# sourceMappingURL=validateUser.js.map