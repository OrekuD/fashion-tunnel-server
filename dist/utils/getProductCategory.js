"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./../types");
const getProductCategory = (name) => {
    if (name.includes("tshirt")) {
        return types_1.ProductCategories.TSHIRT;
    }
    if (name.includes("trousers")) {
        return types_1.ProductCategories.TROUSERS;
    }
    if (name.includes("shoes")) {
        return types_1.ProductCategories.SHOES;
    }
    if (name.includes("jacket")) {
        return types_1.ProductCategories.JACKET;
    }
    return -1;
};
exports.default = getProductCategory;
//# sourceMappingURL=getProductCategory.js.map