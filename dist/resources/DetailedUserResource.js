"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
class DetailedUserResource extends defaultClasses_1.TimeStamps {
    constructor(user) {
        super();
        this.id = user === null || user === void 0 ? void 0 : user._id;
        this.email = user.email;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.deviceType = user.deviceType;
        this.profilePicture = user.profilePicture;
        this.createdAt = user.createdAt;
    }
    toJSON() {
        var _a;
        return {
            id: this.id,
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
            deviceType: this.deviceType,
            profilePicture: this.profilePicture,
            createdAt: (_a = this.createdAt) === null || _a === void 0 ? void 0 : _a.toISOString(),
        };
    }
}
exports.default = DetailedUserResource;
//# sourceMappingURL=DetailedUserResource.js.map