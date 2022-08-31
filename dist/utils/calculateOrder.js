"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateOrder = void 0;
const calculateOrder = (products, discountPercentage) => {
    if (products.length === 0)
        return { total: 0, discount: 0, subtotal: 0 };
    const subtotal = products.reduce((sum, item) => sum + item.count * item.price, 0);
    const discount = subtotal * discountPercentage;
    const total = subtotal - discount;
    return { total, discount, subtotal };
};
exports.calculateOrder = calculateOrder;
//# sourceMappingURL=calculateOrder.js.map