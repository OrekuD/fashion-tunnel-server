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
const DetailedUserResource_1 = __importDefault(require("../resources/DetailedUserResource"));
const User_1 = __importDefault(require("../models/User"));
const types_1 = require("./../types");
const ErrorResource_1 = __importDefault(require("../resources/ErrorResource"));
const OkResource_1 = __importDefault(require("../resources/OkResource"));
const Product_1 = __importDefault(require("../models/Product"));
const Order_1 = __importDefault(require("../models/Order"));
const SimpleOrderResource_1 = __importDefault(require("../resources/SimpleOrderResource"));
const DetailedOrderResource_1 = __importDefault(require("../resources/DetailedOrderResource"));
const DetailedProductResource_1 = __importDefault(require("../resources/DetailedProductResource"));
const SocketManager_1 = __importDefault(require("../managers/SocketManager"));
const OrderStatusResource_1 = __importDefault(require("../resources/OrderStatusResource"));
const IncomeResource_1 = __importDefault(require("../resources/IncomeResource"));
const validateEmail_1 = __importDefault(require("../validation/validateEmail"));
const AuthResource_1 = __importDefault(require("../resources/AuthResource"));
const ProductResource_1 = __importDefault(require("../resources/ProductResource"));
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
        .json(new IncomeResource_1.default(orders.reduce((sum, order) => sum + order.total, 0)).toJSON());
});
const getAllOrders = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield Order_1.default.find().sort({
        createdAt: -1,
    });
    const response = [];
    for (const order of orders) {
        const user = yield User_1.default.findById(order.userId);
        response.push(new SimpleOrderResource_1.default(order, user).toJSON());
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
    const data = yield Product_1.default.find().sort({
        createdAt: -1,
    });
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
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_1.default.findById(req.params.orderId);
    if (!order) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("Order not found", 404).toJSON());
    }
    const statusIndex = order.statusTimeStamps.findIndex(({ status }) => status === req.body.status);
    const timeStamp = new Date().toISOString();
    if (statusIndex < 0) {
        order.statusTimeStamps.unshift({
            status: req.body.status,
            time: timeStamp,
        });
    }
    else {
        order.statusTimeStamps.splice(statusIndex, 1, {
            status: req.body.status,
            time: timeStamp,
        });
    }
    order.status = req.body.status;
    yield order.save();
    SocketManager_1.default.emitMessage(types_1.Events.ORDER_STATUS_CHANGE, order.userId, new OrderStatusResource_1.default(order.id, req.body.status, timeStamp).toJSON());
    return res
        .status(200)
        .json(new OrderStatusResource_1.default(order.id, req.body.status, timeStamp).toJSON());
});
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password.trim();
    const deviceType = req.body.deviceType;
    if (!(0, validateEmail_1.default)(email)) {
        return res
            .status(400)
            .json(new ErrorResource_1.default("Email is invalid", 400).toJSON());
    }
    const user = yield User_1.default.findOne({ email, role: types_1.Roles.SUPER_ADMIN });
    if (!user) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("User not found", 404).toJSON());
    }
    try {
        const isPasswordValid = yield argon2_1.default.verify(user.password, password);
        if (!isPasswordValid) {
            return res
                .status(400)
                .json(new ErrorResource_1.default("Password is invalid", 400));
        }
        return res.status(200).json(new AuthResource_1.default(user, deviceType).toJSON());
    }
    catch (_a) {
        return res
            .status(500)
            .json(new ErrorResource_1.default("Login unsuccessful", 500).toJSON());
    }
});
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.default.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        productQuantity: req.body.productQuantity,
        extraInfo: req.body.extraInfo,
        sizeType: req.body.sizeType,
        productCategory: req.body.productCategory,
        gender: req.body.gender,
        images: req.body.images,
    });
    if (!product) {
        return res
            .status(500)
            .json(new ErrorResource_1.default("There was an issue creating your product", 500).toJSON());
    }
    return res.status(200).json(new ProductResource_1.default(product).toJSON());
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
    updateOrderStatus,
    signin,
    createProduct,
};
exports.default = AdminController;
//# sourceMappingURL=admin.js.map