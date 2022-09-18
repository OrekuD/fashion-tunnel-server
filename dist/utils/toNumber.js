"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toNumber = (number) => {
    try {
        return Number(number);
    }
    catch (error) {
        return 0;
    }
};
exports.default = toNumber;
//# sourceMappingURL=toNumber.js.map