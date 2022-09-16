"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateAdmin_1 = require("./../middlewares/validateAdmin");
const express_1 = require("express");
const admin_1 = __importDefault(require("../controllers/admin"));
const router = (0, express_1.Router)();
router.post("/auth/sign-in", admin_1.default.signin);
router.get("/orders", validateAdmin_1.validateAdmin, admin_1.default.getAllOrders);
router.get("/orders/:orderId", validateAdmin_1.validateAdmin, admin_1.default.getOrder);
router.put("/orders/:orderId/update-status", validateAdmin_1.validateAdmin, admin_1.default.updateOrderStatus);
router.get("/income", validateAdmin_1.validateAdmin, admin_1.default.getIncome);
router.get("/users", validateAdmin_1.validateAdmin, admin_1.default.getAllUsers);
router.get("/users/:userId", validateAdmin_1.validateAdmin, admin_1.default.getUser);
router.delete("/users/:userId", validateAdmin_1.validateAdmin, admin_1.default.deleteUser);
router.get("/products", validateAdmin_1.validateAdmin, admin_1.default.getAllProducts);
router.get("/products/:productId", validateAdmin_1.validateAdmin, admin_1.default.getProduct);
router.delete("/products/:productId", validateAdmin_1.validateAdmin, admin_1.default.deleteProduct);
exports.default = router;
//# sourceMappingURL=admin.js.map