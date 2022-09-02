"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
class OrderResource extends defaultClasses_1.TimeStamps {
    constructor(order, deliveryAddress, products) {
        super();
        this.id = order === null || order === void 0 ? void 0 : order._id;
        this.total = order.total;
        this.subtotal = order.subtotal;
        this.discount = order.discount;
        this.orderNumber = order.orderNumber;
        this.orderStatus = order.orderStatus;
        this.createdAt = order.createdAt;
        this.products = products;
        this.deliveryAddress = deliveryAddress;
    }
    toJSON() {
        return {
            id: this.id,
            total: this.total,
            subtotal: this.subtotal,
            discount: this.discount,
            orderNumber: this.orderNumber,
            orderStatus: this.orderStatus,
            products: this.products,
            createdAt: this.createdAt,
            deliveryAddress: this.deliveryAddress,
        };
    }
}
exports.default = OrderResource;
//# sourceMappingURL=OrderResource.js.map