"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderStatusResource {
    constructor(orderId, status) {
        this.orderId = orderId;
        this.status = status;
    }
    toJSON() {
        return {
            orderId: this.orderId,
            status: this.status,
        };
    }
}
exports.default = OrderStatusResource;
//# sourceMappingURL=OrderStatusResource%20copy.js.map