"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorResource {
    constructor(message, code) {
        this.message = message;
        this.code = code;
    }
    toJSON() {
        return {
            message: this.message,
            code: this.code,
        };
    }
}
exports.default = ErrorResource;
//# sourceMappingURL=ErrorResource.js.map