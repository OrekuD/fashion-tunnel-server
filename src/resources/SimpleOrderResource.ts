import { User } from "../models/User";
import { Order } from "../models/Order";
import { OrderStatus, OrderStatusTimeStamp } from "../types";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export default class SimpleOrderResource extends TimeStamps {
  private id: string;
  private total: number;
  private orderNumber: number;
  private numberOfProducts: number;
  private status: OrderStatus;
  private user: {
    id: string;
    email: string;
  };
  private statusTimeStamps: Array<OrderStatusTimeStamp>;

  constructor(order: Order, user: User) {
    super();
    this.id = (order as any)._id;
    this.total = order.total;
    this.orderNumber = order.orderNumber;
    this.status = order.status;
    this.createdAt = order.createdAt;
    this.numberOfProducts = order.products.length;
    this.user = {
      id: (user as any)?._id,
      email: user.email!,
    };
    this.statusTimeStamps = order.statusTimeStamps;
  }

  toJSON() {
    return {
      id: this.id,
      total: this.total,
      orderNumber: this.orderNumber,
      status: this.status,
      createdAt: this.createdAt,
      numberOfProducts: this.numberOfProducts,
      user: this.user,
      statusTimeStamps: this.statusTimeStamps,
    };
  }
}
