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
const ErrorResource_1 = __importDefault(require("../resources/ErrorResource"));
const Product_1 = __importDefault(require("../models/Product"));
const ProductResource_1 = __importDefault(require("../resources/ProductResource"));
const getProducts = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Product_1.default.find().sort({
        createdAt: -1,
    });
    return res
        .status(200)
        .json(data.map((product) => new ProductResource_1.default(product).toJSON()));
});
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const product = yield Product_1.default.findOne({ id: productId });
    if (!product) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("Product not found", 404).toJSON());
    }
    return res.status(200).json(new ProductResource_1.default(product).toJSON());
});
const ProductsController = { getProducts, getProduct };
exports.default = ProductsController;
//# sourceMappingURL=products.js.map