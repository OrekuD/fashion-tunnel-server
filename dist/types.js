"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = exports.ShoeSizes = exports.ClothSizes = exports.ProductGender = exports.Events = exports.Roles = exports.ProductCategories = exports.DeviceTypes = void 0;
class DeviceTypes {
}
exports.DeviceTypes = DeviceTypes;
DeviceTypes.ANDROID = "android";
DeviceTypes.IOS = "ios";
DeviceTypes.WEB = "web";
var ProductCategories;
(function (ProductCategories) {
    ProductCategories[ProductCategories["TSHIRT"] = 0] = "TSHIRT";
    ProductCategories[ProductCategories["SHOES"] = 1] = "SHOES";
    ProductCategories[ProductCategories["HOODIE"] = 2] = "HOODIE";
    ProductCategories[ProductCategories["DRESSES"] = 3] = "DRESSES";
    ProductCategories[ProductCategories["TROUSERS"] = 4] = "TROUSERS";
    ProductCategories[ProductCategories["JACKET"] = 5] = "JACKET";
})(ProductCategories = exports.ProductCategories || (exports.ProductCategories = {}));
var Roles;
(function (Roles) {
    Roles[Roles["SUPER_ADMIN"] = 1] = "SUPER_ADMIN";
    Roles[Roles["ADMIN"] = 2] = "ADMIN";
    Roles[Roles["USER"] = 3] = "USER";
    Roles[Roles["BANNED"] = -100] = "BANNED";
})(Roles = exports.Roles || (exports.Roles = {}));
var Events;
(function (Events) {
    Events["USER_ADDRESS_CREATE"] = "user:address:create";
    Events["USER_ORDER_CREATE"] = "user:order:create";
    Events["USER_PROFILE_UPDATE"] = "user:profile:update";
    Events["USER_FAVOURITE_ITEM"] = "user:favourite:item";
    Events["ORDER_STATUS_CHANGE"] = "order:status:change";
})(Events = exports.Events || (exports.Events = {}));
var ProductGender;
(function (ProductGender) {
    ProductGender[ProductGender["WOMEN"] = 0] = "WOMEN";
    ProductGender[ProductGender["MEN"] = 1] = "MEN";
    ProductGender[ProductGender["UNISEX"] = 2] = "UNISEX";
})(ProductGender = exports.ProductGender || (exports.ProductGender = {}));
var ClothSizes;
(function (ClothSizes) {
    ClothSizes[ClothSizes["XXS"] = 0] = "XXS";
    ClothSizes[ClothSizes["XS"] = 1] = "XS";
    ClothSizes[ClothSizes["S"] = 2] = "S";
    ClothSizes[ClothSizes["M"] = 3] = "M";
    ClothSizes[ClothSizes["L"] = 4] = "L";
    ClothSizes[ClothSizes["XL"] = 5] = "XL";
    ClothSizes[ClothSizes["XXL"] = 6] = "XXL";
})(ClothSizes = exports.ClothSizes || (exports.ClothSizes = {}));
var ShoeSizes;
(function (ShoeSizes) {
    ShoeSizes[ShoeSizes["XXS"] = 0] = "XXS";
    ShoeSizes[ShoeSizes["XS"] = 1] = "XS";
    ShoeSizes[ShoeSizes["S"] = 2] = "S";
    ShoeSizes[ShoeSizes["M"] = 3] = "M";
    ShoeSizes[ShoeSizes["L"] = 4] = "L";
    ShoeSizes[ShoeSizes["XL"] = 5] = "XL";
    ShoeSizes[ShoeSizes["XXL"] = 6] = "XXL";
})(ShoeSizes = exports.ShoeSizes || (exports.ShoeSizes = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["PENDING"] = 0] = "PENDING";
    OrderStatus[OrderStatus["ACCEPTED"] = 1] = "ACCEPTED";
    OrderStatus[OrderStatus["PROCESSING"] = 2] = "PROCESSING";
    OrderStatus[OrderStatus["DISPATCHED"] = 3] = "DISPATCHED";
    OrderStatus[OrderStatus["DELIVERED"] = 4] = "DELIVERED";
    OrderStatus[OrderStatus["REJECTED"] = 5] = "REJECTED";
    OrderStatus[OrderStatus["CANCELLED"] = 6] = "CANCELLED";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
//# sourceMappingURL=types.js.map