import { ProductGender } from "../types";
import { Product } from "../models/Product";
import ProductModel from "../models/Product";
import { faker } from "@faker-js/faker";
import generateRandomQuantity from "../utils/generateRandomQuantity";
import fs from "fs";
import path from "path";
import { uploadFile } from "../utils/uploadFile";
import getProductName from "../utils/getProductName";
import getProductCategory from "../utils/getProductCategory";

const productsSeeder = async () => {
  const products = await ProductModel.find();

  if (products.length > 0) {
    console.info("Products already seeded");
    return;
  }

  console.info("⚡️ Products seeding started");

  try {
    const rawImages = fs.readdirSync(path.join(__dirname, "../images"));
    const dict: { [type: string]: Array<string> } = {};
    const testProducts: Array<Product> = [];

    rawImages.forEach((image) => {
      const splitImage = image.split("_");
      const join = splitImage[0] + splitImage[1];
      if (dict.hasOwnProperty(join)) {
        dict[join] = [image, ...dict[join]];
      } else {
        dict[join] = [image];
      }
    });

    let index = 0;
    for (var image in dict) {
      const images: Array<string> = [];
      for (const file in dict[image]) {
        const { url } = await uploadFile(
          path.join(__dirname, `../images/${dict[image][file]}`),
          { access_mode: "public", folder: "/products" }
        );
        images.unshift(url);
        index++;
      }

      console.log(`${index}/${rawImages.length} ${".".repeat(index)}`);

      const sizeType = image.includes("shoes") ? "shoe" : "cloth";

      testProducts.push({
        // id: new mongoose.Types.ObjectId().toString(),
        name: getProductName(image),
        description: faker.commerce.productDescription(),
        price: Number(Number(faker.commerce.price(12, 400, 2)).toFixed(2)),
        productQuantity: generateRandomQuantity(),
        extraInfo: faker.commerce.productDescription(),
        sizeType,
        productCategory: getProductCategory(image),
        gender: ProductGender.UNISEX,
        images,
      });
    }

    await ProductModel.insertMany(testProducts);
  } catch (error) {
    console.error("There was an issue seeding the products");
  }

  console.info("⚡️ Products seeding complete");
};

export default productsSeeder;
