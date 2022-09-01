"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
class UserAddressResource extends defaultClasses_1.TimeStamps {
    constructor(userAddress) {
        super();
        this.id = userAddress === null || userAddress === void 0 ? void 0 : userAddress._id;
        this.name = userAddress.name;
        this.addressLine = userAddress.addressLine;
        this.postalCode = userAddress.postalCode;
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            addressLine: this.addressLine,
            postalCode: this.postalCode,
        };
    }
}
exports.default = UserAddressResource;
//# sourceMappingURL=UserAddressResource.js.map