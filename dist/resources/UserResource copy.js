"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DetailedUserResource {
    constructor(user) {
        this.id = user.id;
        this.email = user.email;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
    }
    toJSON() {
        return {
            id: this.id,
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
        };
    }
}
exports.default = DetailedUserResource;
//# sourceMappingURL=UserResource%20copy.js.map