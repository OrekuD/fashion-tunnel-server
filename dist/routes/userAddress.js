"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateUser_1 = require("./../middlewares/validateUser");
const express_1 = require("express");
const userAddress_1 = __importDefault(require("../controllers/userAddress"));
const router = (0, express_1.Router)();
router.get("/", validateUser_1.validateUser, userAddress_1.default.getUserAddresses);
router.put("/:userAddressId", validateUser_1.validateUser, userAddress_1.default.updateAddress);
router.delete("/:userAddressId", validateUser_1.validateUser, userAddress_1.default.deleteAddress);
router.post("/", validateUser_1.validateUser, userAddress_1.default.addNewAddress);
exports.default = router;
//# sourceMappingURL=userAddress.js.map