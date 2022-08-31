"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductResource {
    constructor(product) {
        this.id = product._id;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.productQuantity = product.productQuantity;
        this.extraInfo = product.extraInfo;
        this.gender = product.gender;
        this.productCategory = product.productCategory;
        this.sizeType = product.sizeType;
        this.images = product.images;
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            productQuantity: this.productQuantity,
            extraInfo: this.extraInfo,
            gender: this.gender,
            productCategory: this.productCategory,
            sizeType: this.sizeType,
            images: this.images,
        };
    }
}
exports.default = ProductResource;
//# sourceMappingURL=ProductResource.js.map