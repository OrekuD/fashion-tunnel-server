"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IncomeResource {
    constructor(total) {
        this.total = total;
    }
    toJSON() {
        return {
            total: this.total,
        };
    }
}
exports.default = IncomeResource;
//# sourceMappingURL=IncomeResource.js.map