import { getModelForClass, prop } from "@typegoose/typegoose";

export class Favourite {
  @prop({ index: true })
  public id?: string;

  @prop({ required: true, index: true })
  public productId!: string;

  @prop({ required: true, index: true })
  public userId!: string;
}

const FavouriteModel = getModelForClass(Favourite, {
  schemaOptions: {
    timestamps: true,
  },
});

export default FavouriteModel;
