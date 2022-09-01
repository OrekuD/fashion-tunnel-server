"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const products_1 = __importDefault(require("./products"));
const favourites_1 = __importDefault(require("./favourites"));
const admin_1 = __importDefault(require("./admin"));
const orders_1 = __importDefault(require("./orders"));
const userAddress_1 = __importDefault(require("./userAddress"));
const router = (0, express_1.Router)();
router.use("/user", user_1.default);
router.use("/user-address", userAddress_1.default);
router.use("/products", products_1.default);
router.use("/favourites", favourites_1.default);
router.use("/admin", admin_1.default);
router.use("/orders", orders_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map