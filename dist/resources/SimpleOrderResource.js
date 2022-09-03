"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
class SimpleOrderResource extends defaultClasses_1.TimeStamps {
    constructor(order, user) {
        super();
        this.id = order._id;
        this.total = order.total;
        this.orderNumber = order.orderNumber;
        this.orderStatus = order.orderStatus;
        this.createdAt = order.createdAt;
        this.numberOfProducts = order.products.length;
        this.user = {
            id: user === null || user === void 0 ? void 0 : user._id,
            email: user.email,
        };
    }
    toJSON() {
        return {
            id: this.id,
            total: this.total,
            orderNumber: this.orderNumber,
            orderStatus: this.orderStatus,
            createdAt: this.createdAt,
            numberOfProducts: this.numberOfProducts,
            user: this.user,
        };
    }
}
exports.default = SimpleOrderResource;
//# sourceMappingURL=SimpleOrderResource.js.map