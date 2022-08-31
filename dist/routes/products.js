"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = __importDefault(require("../controllers/products"));
const router = (0, express_1.Router)();
router.get("/", products_1.default.getProducts);
router.get("/:productId", products_1.default.getProduct);
exports.default = router;
//# sourceMappingURL=products.js.map