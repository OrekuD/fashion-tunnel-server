import { ProductCategories, ProductGender, SizeType } from "../types";

export default interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  productQuantity: string;
  productCategory: ProductCategories;
  gender: ProductGender;
  extraInfo: Array<string>;
  sizeType: SizeType;
  images: Array<string>;
}
