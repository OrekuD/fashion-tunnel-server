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
const argon2_1 = __importDefault(require("argon2"));
const types_1 = require("../types");
const User_1 = __importDefault(require("../models/User"));
const adminSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield User_1.default.findOne({ role: types_1.Roles.SUPER_ADMIN });
    if (admin) {
        console.info("Admin already seeded");
        return;
    }
    console.info("⚡️ Admin seeding started");
    const hashedPassword = yield argon2_1.default.hash("secret");
    try {
        yield User_1.default.create({
            firstname: "david",
            lastname: "opoku",
            email: "admin@gmail.com",
            password: hashedPassword,
            deviceType: types_1.DeviceTypes.WEB,
            activeAddressId: "",
            role: types_1.Roles.SUPER_ADMIN,
        });
    }
    catch (error) {
        console.log({ error });
        console.error("There was an issue seeding the admin");
    }
    console.info("⚡️ Admin seeding complete");
});
exports.default = adminSeeder;
//# sourceMappingURL=adminSeeder%20copy.js.map