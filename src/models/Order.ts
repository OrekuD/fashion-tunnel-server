import { prop, getModelForClass } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { OrderProduct, OrderStatus } from "../types";

export class Order extends TimeStamps {
  @prop({ required: true })
  public total!: number;

  @prop({ required: true })
  public subtotal!: number;

  @prop({ required: true })
  public discount!: number;

  @prop({ required: true })
  public products!: Array<OrderProduct>;

  @prop({ required: true })
  public userId!: string;

  @prop({ required: true })
  public orderNumber!: number;

  @prop({ required: true })
  public orderStatus!: OrderStatus;
}

const OrderModel = getModelForClass(Order, {
  schemaOptions: {
    timestamps: true,
  },
});

export default OrderModel;
