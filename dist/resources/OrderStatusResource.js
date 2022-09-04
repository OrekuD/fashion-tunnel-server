"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderStatusResource {
    constructor(orderId, status, time) {
        this.orderId = orderId;
        this.status = status;
        this.time = time;
    }
    toJSON() {
        return {
            orderId: this.orderId,
            status: this.status,
            time: this.time,
        };
    }
}
exports.default = OrderStatusResource;
//# sourceMappingURL=OrderStatusResource.js.map