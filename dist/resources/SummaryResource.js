"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SummaryResource {
    constructor(income, customers, orders) {
        this.income = income;
        this.customers = customers;
        this.orders = orders;
    }
    toJSON() {
        return {
            income: this.income,
            customers: this.customers,
            orders: this.orders,
        };
    }
}
exports.default = SummaryResource;
//# sourceMappingURL=SummaryResource.js.map