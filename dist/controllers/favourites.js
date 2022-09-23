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
const OkResource_1 = __importDefault(require("../resources/OkResource"));
const ProductResource_1 = __importDefault(require("../resources/ProductResource"));
const ErrorResource_1 = __importDefault(require("../resources/ErrorResource"));
const User_1 = __importDefault(require("../models/User"));
const types_1 = require("./../types");
const Favourite_1 = __importDefault(require("../models/Favourite"));
const Product_1 = __importDefault(require("../models/Product"));
const SocketManager_1 = __importDefault(require("../managers/SocketManager"));
const updateFavourites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId);
    if (!user) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("User not found", 404).toJSON());
    }
    const product = yield Product_1.default.findById(req.body.productId);
    if (!product) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("Product not found", 404).toJSON());
    }
    const alreadyAdded = yield Favourite_1.default.findOne({
        $and: [{ productId: req.body.productId }, { userId: req.userId }],
    });
    if (alreadyAdded) {
        yield Favourite_1.default.deleteOne({ _id: alreadyAdded._id });
    }
    else {
        const favourite = yield Favourite_1.default.create({
            productId: req.body.productId,
            userId: req.userId,
        });
        if (!favourite) {
            return res
                .status(500)
                .json(new ErrorResource_1.default("There was an issue adding your new favourite", 500).toJSON());
        }
    }
    SocketManager_1.default.emitMessage(types_1.Events.USER_FAVOURITE_ITEM, user._id.toString(), {
        product,
        hasLiked: Boolean(alreadyAdded),
    });
    return res.status(200).json(new OkResource_1.default().toJSON());
});
const getUserFavourites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId);
    if (!user) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("User not found", 404).toJSON());
    }
    const favourites = yield Favourite_1.default.find({ userId: req.userId }).sort({
        createdAt: -1,
    });
    const ids = favourites.map(({ productId }) => productId);
    const products = yield Product_1.default.find({
        _id: {
            $in: ids,
        },
    });
    const reorderedList = ids.map((_id) => products.find(({ id }) => id === _id));
    return res
        .status(200)
        .json(reorderedList
        .filter(Boolean)
        .map((product) => new ProductResource_1.default(product).toJSON()));
});
const FavouriteController = {
    updateFavourites,
    getUserFavourites,
};
exports.default = FavouriteController;
//# sourceMappingURL=favourites.js.map