import { ClothType } from "./../types";
import { Product } from "./../models/Product";
import ProductModel from "../models/Product";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import generateRandomQuantity from "../utils/generateRandomQuantity";

const tempSeeder = async () => {
  const products = await ProductModel.find();
  if (products.length > 0) {
    console.info("Products already seeded");
    return;
  }
  console.info("⚡️ Seeding started");

  const testProducts: Array<Product> = Array(100)
    .fill("1")
    .map(() => {
      const gender = Math.floor(Math.random() * 3);
      const clothType = Math.floor(Math.random() * 3);

      return {
        id: new mongoose.Types.ObjectId().toString(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number(Number(faker.commerce.price(12, 400, 2)).toFixed(2)),
        productQuantity: generateRandomQuantity(),
        extraInfo: faker.commerce.productDescription(),
        sizeType: clothType === ClothType.SHOES ? "shoe" : "cloth",
        clothType,
        gender,
        images: [
          "https://cdn-images.farfetch-contents.com/18/49/36/17/18493617_39736957_1000.jpg",
          "https://cdn-images.farfetch-contents.com/18/49/36/17/18493617_39736952_1000.jpg",
          "https://cdn-images.farfetch-contents.com/18/49/36/17/18493617_39736887_1000.jpg",
          "https://cdn-images.farfetch-contents.com/18/49/36/17/18493617_39736927_1000.jpg",
        ],
      };
    });

  //   await ProductModel.create({
  //     id: v4().toString(),
  //     name: "Testing seeder",
  //     description: "Testing description",
  //     price: 12.99,
  //     productQuantity: 23,
  //     extraInfo:
  //       "Aliquip officia consequat dolore sint. Ullamco incididunt eiusmod elit minim quis minim duis ut occaecat voluptate. Commodo eu ipsum et commodo qui ipsum. Ex tempor et officia eiusmod proident eu et adipisicing. Lorem ullamco dolor commodo consectetur in.",
  //     sizeType: "cloth",
  //     images: [
  //       "https://cdn-images.farfetch-contents.com/18/49/36/17/18493617_39736957_1000.jpg",
  //       "https://cdn-images.farfetch-contents.com/18/49/36/17/18493617_39736952_1000.jpg",
  //       "https://cdn-images.farfetch-contents.com/18/49/36/17/18493617_39736887_1000.jpg",
  //       "https://cdn-images.farfetch-contents.com/18/49/36/17/18493617_39736927_1000.jpg",
  //     ],
  //   });

  await ProductModel.insertMany(testProducts);

  console.info("⚡️ Seeding ended");
};

export default tempSeeder;
