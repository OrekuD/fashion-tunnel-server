import { User } from "../models/User";
import { Order } from "../models/Order";
import { OrderStatus } from "../types";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export default class SimpleOrderResource extends TimeStamps {
  private id: string;
  private total: number;
  private orderNumber: number;
  private numberOfProducts: number;
  private orderStatus: OrderStatus;
  private user: {
    id: string;
    email: string;
  };

  constructor(order: Order, user: User) {
    super();
    this.id = (order as any)._id;
    this.total = order.total;
    this.orderNumber = order.orderNumber;
    this.orderStatus = order.orderStatus;
    this.createdAt = order.createdAt;
    this.numberOfProducts = order.products.length;
    this.user = {
      id: (user as any)?._id,
      email: user.email!,
    };
  }

  toJSON() {
    return {
      id: this.id,
      total: this.total,
      orderNumber: this.orderNumber,
      orderStatus: this.orderStatus,
      createdAt: this.createdAt,
      numberOfProducts: this.numberOfProducts,
      user: this.user,
    };
  }
}
