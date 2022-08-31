"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OkResource {
    constructor(data) {
        this.data = "";
        this.data = data || "";
    }
    toJSON() {
        return {
            status: 200,
            message: "ok",
            data: this.data,
        };
    }
}
exports.default = OkResource;
//# sourceMappingURL=OkResource.js.map