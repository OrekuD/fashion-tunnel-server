"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateUser_1 = require("./../middlewares/validateUser");
const express_1 = require("express");
const orders_1 = __importDefault(require("../controllers/orders"));
const router = (0, express_1.Router)();
router.get("/", validateUser_1.validateUser, orders_1.default.getUserOrders);
router.get("/:orderId", validateUser_1.validateUser, orders_1.default.getOrder);
router.post("/", validateUser_1.validateUser, orders_1.default.createNewOrder);
exports.default = router;
//# sourceMappingURL=orders.js.map