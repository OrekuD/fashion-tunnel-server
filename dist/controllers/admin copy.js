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
const getAllUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find();
    return res
        .status(200)
        .json(users.map((user) => new DetailedUserResource_1.default(user).toJSON()));
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
};
exports.default = AdminController;
//# sourceMappingURL=admin%20copy.js.map