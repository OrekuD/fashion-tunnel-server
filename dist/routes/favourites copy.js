"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateUser_1 = require("./../middlewares/validateUser");
const express_1 = require("express");
const favourites_1 = __importDefault(require("../controllers/favourites"));
const router = (0, express_1.Router)();
router.get("/", validateUser_1.validateUser, favourites_1.default.getUserFavourites);
router.post("/", validateUser_1.validateUser, favourites_1.default.updateFavourites);
exports.default = router;
//# sourceMappingURL=favourites%20copy.js.map