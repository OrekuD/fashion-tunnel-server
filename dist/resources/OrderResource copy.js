"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
class OrderResource extends defaultClasses_1.TimeStamps {
    constructor(order) {
        super();
        this.total = order.total;
        this.subtotal = order.subtotal;
        this.discount = order.discount;
        this.orderNumber = order.orderNumber;
        this.orderStatus = order.orderStatus;
        this.createdAt = order.createdAt;
        this.products = order.products;
    }
    toJSON() {
        return {
            total: this.total,
            subtotal: this.subtotal,
            discount: this.discount,
            orderNumber: this.orderNumber,
            orderStatus: this.orderStatus,
            products: this.products,
            createdAt: this.createdAt,
        };
    }
}
exports.default = OrderResource;
//# sourceMappingURL=OrderResource%20copy.js.map