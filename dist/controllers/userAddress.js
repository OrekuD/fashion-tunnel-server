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
const User_1 = __importDefault(require("../models/User"));
const UserAddress_1 = __importDefault(require("../models/UserAddress"));
const UserAddressResource_1 = __importDefault(require("../resources/UserAddressResource"));
const OkResource_1 = __importDefault(require("../resources/OkResource"));
const getUserAddresses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId);
    if (!user) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("User not found", 404).toJSON());
    }
    const userAddresses = yield UserAddress_1.default.find({
        userId: req.userId,
    }).sort({
        createdAt: -1,
    });
    return res
        .status(200)
        .json(userAddresses.map((userAddress) => new UserAddressResource_1.default(userAddress).toJSON()));
});
const addNewAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId);
    if (!user) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("User not found", 404).toJSON());
    }
    const userAddress = yield UserAddress_1.default.create({
        userId: req.userId,
        name: req.body.name,
        addressLine: req.body.addressLine,
        postalCode: req.body.postalCode,
    });
    return res.status(200).json(new UserAddressResource_1.default(userAddress).toJSON());
});
const updateAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId);
    if (!user) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("User not found", 404).toJSON());
    }
    const userAddress = yield UserAddress_1.default.findById(req.params.userAddressId);
    if (!userAddress) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("Address not found", 404).toJSON());
    }
    userAddress.name = req.body.name.trim();
    userAddress.addressLine = req.body.addressLine.trim();
    userAddress.postalCode = req.body.postalCode.trim();
    yield userAddress.save();
    return res.status(200).json(new UserAddressResource_1.default(userAddress).toJSON());
});
const deleteAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId);
    if (!user) {
        return res
            .status(404)
            .json(new ErrorResource_1.default("User not found", 404).toJSON());
    }
    yield UserAddress_1.default.findByIdAndDelete(req.params.userAddressId);
    return res.status(200).json(new OkResource_1.default().toJSON());
});
const UserAddressController = {
    getUserAddresses,
    addNewAddress,
    updateAddress,
    deleteAddress,
};
exports.default = UserAddressController;
//# sourceMappingURL=userAddress.js.map