"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./../types");
const Product_1 = __importDefault(require("../models/Product"));
const mongoose_1 = __importDefault(require("mongoose"));
const faker_1 = require("@faker-js/faker");
const generateRandomQuantity_1 = __importDefault(require("../utils/generateRandomQuantity"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uploadFile_1 = require("../utils/uploadFile");
const getProductName_1 = __importDefault(require("../utils/getProductName"));
const getProductCategory_1 = __importDefault(require("../utils/getProductCategory"));
const seeder = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product_1.default.find();
    if (products.length > 0) {
        console.info("Products already seeded");
        return;
    }
    console.info("⚡️ Seeding started");
    try {
        const rawImages = fs_1.default.readdirSync(path_1.default.join(__dirname, "../images"));
        const dict = {};
        const testProducts = [];
        rawImages.forEach((image) => {
            const splitImage = image.split("_");
            const join = splitImage[0] + splitImage[1];
            if (dict.hasOwnProperty(join)) {
                dict[join] = [image, ...dict[join]];
            }
            else {
                dict[join] = [image];
            }
        });
        for (var image in dict) {
            const images = [];
            for (const file in dict[image]) {
                const { url } = yield (0, uploadFile_1.uploadFile)(path_1.default.join(__dirname, `../images/${dict[image][file]}`), { access_mode: "public", folder: "/products" });
                images.unshift(url);
            }
            console.log(`${image} done uploading`);
            const sizeType = image.includes("shoes") ? "shoe" : "cloth";
            testProducts.push({
                id: new mongoose_1.default.Types.ObjectId().toString(),
                name: (0, getProductName_1.default)(image),
                description: faker_1.faker.commerce.productDescription(),
                price: Number(Number(faker_1.faker.commerce.price(12, 400, 2)).toFixed(2)),
                productQuantity: (0, generateRandomQuantity_1.default)(),
                extraInfo: faker_1.faker.commerce.productDescription(),
                sizeType,
                productCategory: (0, getProductCategory_1.default)(image),
                gender: types_1.ProductGender.UNISEX,
                images,
            });
        }
        yield Product_1.default.insertMany(testProducts);
    }
    catch (error) {
        console.error("There was an issue seeding the products");
    }
    console.info("⚡️ Seeding complete");
});
exports.default = seeder;
//# sourceMappingURL=temp_seeder.js.map