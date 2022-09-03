"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = __importDefault(require("../controllers/admin"));
const router = (0, express_1.Router)();
router.get("/orders", admin_1.default.getAllOrders);
router.get("/orders/:orderId", admin_1.default.getOrder);
router.get("/income", admin_1.default.getIncome);
router.get("/users", admin_1.default.getAllUsers);
router.get("/users/:userId", admin_1.default.getUser);
router.delete("/users/:userId", admin_1.default.deleteUser);
router.get("/products", admin_1.default.getAllProducts);
router.get("/products/:productId", admin_1.default.getProduct);
router.delete("/products/:productId", admin_1.default.deleteProduct);
exports.default = router;
//# sourceMappingURL=admin.js.map