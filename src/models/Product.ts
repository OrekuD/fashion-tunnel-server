import { ProductGender, ProductCategories, SizeType } from "./../types";
import { getModelForClass, prop } from "@typegoose/typegoose";

export class Product {
  // @prop()
  // public _id?: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ required: true })
  public price!: number;

  @prop({ required: true })
  public productQuantity!: number;

  @prop({ required: true })
  public extraInfo!: Array<string>;

  @prop({ required: true })
  public gender!: ProductGender;

  @prop({ required: true })
  public productCategory!: ProductCategories;

  @prop({ required: true })
  public sizeType!: SizeType; // TODO: maybe make this optional ?

  @prop({ required: true })
  public images!: Array<string>;
}

const ProductModel = getModelForClass(Product, {
  schemaOptions: {
    timestamps: true,
  },
});

export default ProductModel;
