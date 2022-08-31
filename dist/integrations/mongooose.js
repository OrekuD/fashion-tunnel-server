"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const db = `mongodb+srv://${config_1.default.DB_USER}:${config_1.default.DB_PASSWORD}@cluster0.p87cqe2.mongodb.net/?retryWrites=true&w=majority`;
mongoose_1.default.connect(db);
exports.default = mongoose_1.default;
//# sourceMappingURL=mongooose.js.map