"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_1 = __importDefault(require("../controllers/search"));
const router = (0, express_1.Router)();
router.post("/", search_1.default.searchProducts);
exports.default = router;
//# sourceMappingURL=search.js.map