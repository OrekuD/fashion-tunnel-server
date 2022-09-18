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
const faker_1 = require("@faker-js/faker");
const usersSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    console.info("⚡️ Users seeding started");
    const hashedPassword = yield argon2_1.default.hash("secret");
    for (let i = 0; i < 1000; i++) {
        const userNumber = i + 1;
        const firstname = faker_1.faker.name.firstName();
        const lastname = faker_1.faker.name.lastName();
        yield User_1.default.create({
            firstname: firstname,
            lastname: lastname,
            email: faker_1.faker.internet.email(firstname, lastname),
            password: hashedPassword,
            deviceType: i % 3 === 0
                ? types_1.DeviceTypes.WEB
                : i % 2 === 0
                    ? types_1.DeviceTypes.ANDROID
                    : types_1.DeviceTypes.IOS,
            activeAddressId: "",
            role: types_1.Roles.USER,
        });
        console.log(`User ${userNumber} seeded`);
    }
    console.info("⚡️ Users seeding complete");
});
exports.default = usersSeeder;
//# sourceMappingURL=usersSeeder.js.map