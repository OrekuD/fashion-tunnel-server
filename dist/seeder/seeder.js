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
const productsSeeder_1 = __importDefault(require("./productsSeeder"));
const adminSeeder_1 = __importDefault(require("./adminSeeder"));
const usersSeeder_1 = __importDefault(require("./usersSeeder"));
const seeder = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, productsSeeder_1.default)();
    yield (0, adminSeeder_1.default)();
    yield (0, usersSeeder_1.default)();
});
exports.default = seeder;
//# sourceMappingURL=seeder.js.map