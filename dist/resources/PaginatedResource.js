"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PaginatedResource {
    constructor(meta, list) {
        this.meta = meta;
        this.list = list;
    }
    toJSON() {
        return {
            meta: this.meta,
            list: this.list,
        };
    }
}
exports.default = PaginatedResource;
//# sourceMappingURL=PaginatedResource.js.map