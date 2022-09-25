import { getModelForClass, prop } from "@typegoose/typegoose";

export class ResetCode {
  @prop({ required: true })
  public code!: string;

  @prop({ required: true })
  public userId!: string;

  @prop({ required: true, index: true })
  public expiresAt!: Date;
}

const ResetCodeModel = getModelForClass(ResetCode, {
  schemaOptions: {
    expireAfterSeconds: 120,
    timestamps: true,
  },
});

export default ResetCodeModel;
