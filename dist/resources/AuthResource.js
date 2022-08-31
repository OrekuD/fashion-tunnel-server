"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const UserResource_1 = __importDefault(require("./UserResource"));
class AuthResource {
    constructor(user, deviceType) {
        this.accessToken = jsonwebtoken_1.default.sign({ userId: user._id }, config_1.default.JWT_SECRET);
        this.deviceType = deviceType;
        this.user = user;
    }
    toJSON() {
        return {
            accessToken: this.accessToken,
            deviceType: this.deviceType,
            user: new UserResource_1.default(this.user).toJSON(),
        };
    }
}
exports.default = AuthResource;
//# sourceMappingURL=AuthResource.js.map