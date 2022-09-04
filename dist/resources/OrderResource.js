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
        this.status = order.status;
        this.createdAt = order.createdAt;
        this.products = products;
        this.deliveryAddress = deliveryAddress;
        this.statusTimeStamps = order.statusTimeStamps;
    }
    toJSON() {
        return {
            id: this.id,
            total: this.total,
            subtotal: this.subtotal,
            discount: this.discount,
            orderNumber: this.orderNumber,
            status: this.status,
            products: this.products,
            createdAt: this.createdAt,
            deliveryAddress: this.deliveryAddress,
            statusTimeStamps: this.statusTimeStamps,
        };
    }
}
exports.default = OrderResource;
//# sourceMappingURL=OrderResource.js.map