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
const DetailedUserResource_1 = __importDefault(require("../resources/DetailedUserResource"));
const User_1 = __importDefault(require("../models/User"));
const ErrorResource_1 = __importDefault(require("../resources/ErrorResource"));
const OkResource_1 = __importDefault(require("../resources/OkResource"));
const Product_1 = __importDefault(require("../models/Product"));
const Order_1 = __importDefault(require("../models/Order"));
const SimpleOrderResource_1 = __importDefault(require("../resources/SimpleOrderResource"));
const DetailedOrderResource_1 = __importDefault(require("../resources/DetailedOrderResource"));
const DetailedProductResource_1 = __importDefault(require("../resources/DetailedProductResource"));
const getAllUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find().sort({
        createdAt: -1,
    });
    return res
        .status(200)
        .json(users.map((user) => new DetailedUserResource_1.default(user).toJSON()));
});
const getIncome = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield Order_1.default.find();
    return res
        .status(200)
        .json({ amount: orders.reduce((sum, order) => sum + order.total, 0) });
});
const getAllOrders = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield Order_1.default.find().sort({
        createdAt: -1,
    });
    const response = [];
    for (const order of orders) {
        const user = yield User_1.default.findById(order.userId);
        response.push(new SimpleOrderResource_1.default(order, user, order.products.length).toJSON());
    }
    return res.status(200).json(response);
});
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_1.default.findById(req.params.orderId);
    if (!order) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("Order not found", 404).toJSON());
    }
    const user = yield User_1.default.findById(order.userId);
    if (!user) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("User not found", 404).toJSON());
    }
    const orderProducts = [];
    for (const orderProduct of order.products) {
        const product = yield Product_1.default.findById(orderProduct.id);
        if (product) {
            orderProducts.push({
                description: product.description,
                extraInfo: product.extraInfo,
                gender: product.gender,
                images: product.images,
                name: product.name,
                productCategory: product.productCategory,
                productQuantity: product.productCategory,
                sizeType: product.sizeType,
                price: orderProduct.price,
                total: orderProduct.total,
                count: orderProduct.count,
                id: orderProduct.id,
            });
        }
    }
    return res
        .status(200)
        .json(new DetailedOrderResource_1.default(order, user, orderProducts).toJSON());
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.params.userId);
    if (!user) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("User not found", 404).toJSON());
    }
    yield User_1.default.findByIdAndDelete(req.params.userId);
    return res.status(200).json(new OkResource_1.default().toJSON());
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.params.userId);
    if (!user) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("User not found", 404).toJSON());
    }
    return res.status(200).json(new DetailedUserResource_1.default(user).toJSON());
});
const getAllProducts = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Product_1.default.find();
    return res
        .status(200)
        .json(data.map((product) => new DetailedProductResource_1.default(product).toJSON()));
});
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.default.findById(req.params.productId);
    if (!product) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("Product not found", 404).toJSON());
    }
    return res.status(200).json(new DetailedProductResource_1.default(product).toJSON());
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.default.findById(req.params.productId);
    if (!product) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("Product not found", 404).toJSON());
    }
    yield Product_1.default.findByIdAndDelete(req.params.productId);
    return res.status(200).json(new OkResource_1.default().toJSON());
});
const AdminController = {
    getAllUsers,
    deleteUser,
    deleteProduct,
    getAllOrders,
    getIncome,
    getOrder,
    getUser,
    getProduct,
    getAllProducts,
};
exports.default = AdminController;
//# sourceMappingURL=admin.js.map