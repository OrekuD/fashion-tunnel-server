import { Product } from "../models/Product";
import { SizeType } from "./../types";

export default class ProductResource {
  private id?: string;
  private name: string;
  private description: string;
  private price: number;
  private productQuantity: number;
  private extraInfo: string;
  private sizeType: SizeType;
  private images: Array<string>;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.productQuantity = product.productQuantity;
    this.extraInfo = product.extraInfo;
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
      sizeType: this.sizeType,
      images: this.images,
    };
  }
}
