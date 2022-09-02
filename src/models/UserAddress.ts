import { getModelForClass, prop } from "@typegoose/typegoose";

export class UserAddress {
  // @prop({ index: true })
  // public id?: string;

  @prop({ required: true, index: true })
  public userId!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public addressLine!: string;

  @prop({ required: true })
  public postalCode!: string;
}

const UserAddressModel = getModelForClass(UserAddress, {
  schemaOptions: {
    timestamps: true,
  },
});

export default UserAddressModel;
