import { ProductCategories } from "./../types";

const getProductCategory = (name: string) => {
  if (name.includes("tshirt")) {
    return ProductCategories.TSHIRT;
  }
  if (name.includes("trousers")) {
    return ProductCategories.TROUSERS;
  }
  if (name.includes("shoes")) {
    return ProductCategories.SHOES;
  }
  if (name.includes("jacket")) {
    return ProductCategories.JACKET;
  }
  return -1;
};

export default getProductCategory;
