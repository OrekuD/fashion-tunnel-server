"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SummaryResource {
    constructor(income, customers, orders, products, chart) {
        this.income = income;
        this.customers = customers;
        this.orders = orders;
        this.products = products;
        this.chart = chart;
    }
    toJSON() {
        return {
            income: this.income,
            customers: this.customers,
            orders: this.orders,
            products: this.products,
            chart: this.chart,
        };
    }
}
exports.default = SummaryResource;
//# sourceMappingURL=SummaryResource.js.map