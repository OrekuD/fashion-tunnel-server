import { getModelForClass, prop } from "@typegoose/typegoose";

export class ResetCode {
  @prop({ required: true })
  public code!: string;

  @prop({ required: true })
  public userId!: string;

  @prop({ required: true })
  public createdAt!: Date;
}

const ResetCodeModel = getModelForClass(ResetCode);

export default ResetCodeModel;
