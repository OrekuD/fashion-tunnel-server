"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserResource {
    constructor(user) {
        this.email = user.email;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
    }
    toJSON() {
        return {
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
        };
    }
}
exports.default = UserResource;
//# sourceMappingURL=UserResource.js.map