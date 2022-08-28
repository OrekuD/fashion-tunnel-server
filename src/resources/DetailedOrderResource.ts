import { User } from "../models/User";
import { Order } from "../models/Order";
import { OrderStatus } from "../types";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import UserResource from "./UserResource";

export default class DetailedOrderResource extends TimeStamps {
  private total: number;
  private subtotal: number;
  private discount: number;
  private orderNumber: number;
  private orderStatus: OrderStatus;
  private user: User | null;

  constructor(order: Order, user: User | null) {
    super();
    this.total = order.total;
    this.subtotal = order.subtotal;
    this.discount = order.discount;
    this.orderNumber = order.orderNumber;
    this.orderStatus = order.orderStatus;
    this.createdAt = order.createdAt;
    this.user = user;
  }

  toJSON() {
    return {
      total: this.total,
      subtotal: this.subtotal,
      discount: this.discount,
      orderNumber: this.orderNumber,
      orderStatus: this.orderStatus,
      createdAt: this.createdAt,
      user: this.user ? new UserResource(this.user).toJSON() : null,
    };
  }
}
