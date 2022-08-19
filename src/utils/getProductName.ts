import { faker } from "@faker-js/faker";
const getProductName = (name: string) => {
  let productName = "";
  if (name.includes("tshirt")) {
    productName = `${name.slice(6, name.length)} T-Shirt`;
  }
  if (name.includes("trousers")) {
    productName = `${name.slice(8, name.length)} Pants`;
  }
  if (name.includes("shoes")) {
    productName = `${name.slice(5, name.length)}`;
  }
  if (name.includes("jacket")) {
    productName = `${name.slice(6, name.length)} Jacket`;
  }
  return `${faker.commerce.productAdjective()} ${productName}`;
};

export default getProductName;
