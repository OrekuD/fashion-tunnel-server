import { prop, getModelForClass } from "@typegoose/typegoose";

export class User {
  @prop()
  public id?: string;

  @prop({ required: true })
  public firstname!: string;

  @prop({ required: true })
  public lastname!: string;

  @prop({ required: true, index: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true })
  public deviceType!: string;

  // @prop({ type: () => [String] })
  // public jobs?: string[];
}

const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});

export default UserModel;
