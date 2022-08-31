"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateName = (name) => {
    if (name.trim().length === 0)
        return false;
    return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(name.trim());
};
exports.default = validateName;
//# sourceMappingURL=validateName.js.map