"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const DetailedUserResource_1 = __importDefault(require("./DetailedUserResource"));
class DetailedOrderResource extends defaultClasses_1.TimeStamps {
    constructor(order, user, products) {
        super();
        this.id = order._id;
        this.total = order.total;
        this.subtotal = order.subtotal;
        this.discount = order.discount;
        this.orderNumber = order.orderNumber;
        this.orderStatus = order.orderStatus;
        this.createdAt = order.createdAt;
        this.products = products;
        this.user = user;
    }
    toJSON() {
        return {
            id: this.id,
            total: this.total,
            subtotal: this.subtotal,
            discount: this.discount,
            orderNumber: this.orderNumber,
            orderStatus: this.orderStatus,
            createdAt: this.createdAt,
            products: this.products,
            user: this.user ? new DetailedUserResource_1.default(this.user).toJSON() : null,
        };
    }
}
exports.default = DetailedOrderResource;
//# sourceMappingURL=DetailedOrderResource.js.map