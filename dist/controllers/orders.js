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
const User_1 = __importDefault(require("../models/User"));
const types_1 = require("../types");
const ErrorResource_1 = __importDefault(require("../resources/ErrorResource"));
const Order_1 = __importDefault(require("../models/Order"));
const OrderResource_1 = __importDefault(require("../resources/OrderResource"));
const calculateOrder_1 = require("../utils/calculateOrder");
const Product_1 = __importDefault(require("../models/Product"));
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId);
    if (!user) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("User not found", 404).toJSON());
    }
    const order = yield Order_1.default.findOne({
        userId: req.userId,
        _id: req.params.orderId,
    });
    if (!order) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("Order not found", 404).toJSON());
    }
    return res.status(200).json(new OrderResource_1.default(order).toJSON());
});
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId);
    if (!user) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("User not found", 404).toJSON());
    }
    const orders = yield Order_1.default.find({ userId: req.userId }).sort({
        createdAt: -1,
    });
    return res
        .status(200)
        .json(orders.map((order) => new OrderResource_1.default(order).toJSON()));
});
const createNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId);
    if (!user) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("User not found", 404).toJSON());
    }
    const productIds = req.body.products.map(({ id }) => id);
    const products = yield Product_1.default.find({
        _id: {
            $in: productIds,
        },
    });
    if (productIds.length !== products.length) {
        console.log("some products not found");
        return res
            .status(400)
            .json(new ErrorResource_1.default("Some products were not found", 400).toJSON());
    }
    const orderProducts = products.map(({ _id, price }) => {
        const item = req.body.products.find(({ id }) => id === _id.toString());
        return {
            price,
            id: _id,
            count: item.count,
            total: item.count * price,
        };
    });
    const { subtotal, total, discount } = (0, calculateOrder_1.calculateOrder)(orderProducts, req.body.discount);
    if (subtotal !== req.body.subtotal || total !== req.body.total) {
        return res
            .status(400)
            .json(new ErrorResource_1.default("Invalid order", 400).toJSON());
    }
    const orders = yield Order_1.default.find();
    const order = yield Order_1.default.create({
        orderNumber: orders.length + 1,
        total,
        subtotal,
        discount,
        userId: req.userId,
        products: orderProducts,
        orderStatus: types_1.OrderStatus.PENDING,
    });
    return res.status(200).json(new OrderResource_1.default(order).toJSON());
});
const OrderController = {
    getUserOrders,
    createNewOrder,
    getOrder,
};
exports.default = OrderController;
//# sourceMappingURL=orders.js.map