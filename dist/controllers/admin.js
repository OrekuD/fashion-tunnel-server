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
const validateEmail_1 = __importDefault(require("../validation/validateEmail"));
const AuthResource_1 = __importDefault(require("../resources/AuthResource"));
const ProductResource_1 = __importDefault(require("../resources/ProductResource"));
const SummaryResource_1 = __importDefault(require("../resources/SummaryResource"));
const toNumber_1 = __importDefault(require("../utils/toNumber"));
const PaginatedResource_1 = __importDefault(require("../resources/PaginatedResource"));
const UserAddress_1 = __importDefault(require("../models/UserAddress"));
const UserAddressResource_1 = __importDefault(require("../resources/UserAddressResource"));
const date_fns_1 = require("date-fns");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page ? (0, toNumber_1.default)(req.query.page) : 0;
    const size = req.query.size ? (0, toNumber_1.default)(req.query.size) : 0;
    const start = (page - 1) * size;
    const end = (page - 1) * size + size;
    const users = yield User_1.default.find({ role: types_1.Roles.USER }).sort({
        createdAt: -1,
    });
    const hasNextPage = users.slice(end).length > 0;
    const list = users.slice(start, end);
    return res.status(200).json(new PaginatedResource_1.default({
        currentPage: page,
        nextPage: hasNextPage ? page + 1 : page,
        pageSize: size,
        totalPages: Math.ceil(users.length / size),
    }, list.map((user) => new DetailedUserResource_1.default(user).toJSON())));
});
const getSummary = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product_1.default.find();
    const orders = yield Order_1.default.find();
    const users = yield User_1.default.find({ role: types_1.Roles.USER });
    const income = orders.reduce((sum, order) => sum + order.total, 0);
    const chartOrders = yield Order_1.default.find({
        createdAt: {
            $gte: (0, date_fns_1.subDays)(new Date(), 6),
            $lte: new Date(),
        },
    });
    const chartUsers = yield User_1.default.find({
        createdAt: {
            $gte: (0, date_fns_1.subDays)(new Date(), 6),
            $lte: new Date(),
        },
    });
    const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
    const chart = days.map((day, index) => {
        const orders = chartOrders.filter(({ createdAt }) => (createdAt === null || createdAt === void 0 ? void 0 : createdAt.getDay()) === index);
        const users = chartUsers.filter(({ createdAt }) => (createdAt === null || createdAt === void 0 ? void 0 : createdAt.getDay()) === index);
        return {
            name: day,
            users: users.length,
            orders: orders.length,
        };
    });
    return res
        .status(200)
        .json(new SummaryResource_1.default(income, users.length, orders.length, products.length, chart).toJSON());
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page ? (0, toNumber_1.default)(req.query.page) : 0;
    const size = req.query.size ? (0, toNumber_1.default)(req.query.size) : 0;
    const start = (page - 1) * size;
    const end = (page - 1) * size + size;
    const orders = yield Order_1.default.find().sort({
        createdAt: -1,
    });
    const hasNextPage = orders.slice(end).length > 0;
    const list = orders.slice(start, end);
    const response = [];
    for (const order of list) {
        const user = yield User_1.default.findById(order.userId);
        response.push(new SimpleOrderResource_1.default(order, user).toJSON());
    }
    return res.status(200).json(new PaginatedResource_1.default({
        currentPage: page,
        nextPage: hasNextPage ? page + 1 : page,
        pageSize: size,
        totalPages: Math.ceil(response.length / size),
    }, response));
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
    const userAddress = yield UserAddress_1.default.findById(order.userAddressId);
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
        .json(new DetailedOrderResource_1.default(order, user, orderProducts, userAddress ? new UserAddressResource_1.default(userAddress).toJSON() : null).toJSON());
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
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page ? (0, toNumber_1.default)(req.query.page) : 0;
    const size = req.query.size ? (0, toNumber_1.default)(req.query.size) : 0;
    const start = (page - 1) * size;
    const end = (page - 1) * size + size;
    const products = yield Product_1.default.find().sort({
        createdAt: -1,
    });
    const hasNextPage = products.slice(end).length > 0;
    const list = products.slice(start, end);
    return res.status(200).json(new PaginatedResource_1.default({
        currentPage: page,
        nextPage: hasNextPage ? page + 1 : page,
        pageSize: size,
        totalPages: Math.ceil(products.length / size),
    }, list.map((product) => new DetailedProductResource_1.default(product).toJSON())));
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
        return res.status(200).json(new AuthResource_1.default(user).toJSON());
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
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.default.findById(req.params.productId);
    if (!product) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("Product not found", 404).toJSON());
    }
    const updatedProduct = yield Product_1.default.findByIdAndUpdate(product.id, {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        productQuantity: req.body.productQuantity,
        extraInfo: req.body.extraInfo,
        sizeType: req.body.sizeType,
        productCategory: req.body.productCategory,
        gender: req.body.gender,
    });
    if (!updatedProduct) {
        return res
            .status(500)
            .json(new ErrorResource_1.default("There was an issue updating your product", 500).toJSON());
    }
    return res.status(200).json(new ProductResource_1.default(updatedProduct).toJSON());
});
const AdminController = {
    getAllUsers,
    deleteUser,
    deleteProduct,
    getAllOrders,
    getSummary,
    getOrder,
    getUser,
    getProduct,
    getAllProducts,
    updateOrderStatus,
    signin,
    createProduct,
    updateProduct,
};
exports.default = AdminController;
//# sourceMappingURL=admin.js.map