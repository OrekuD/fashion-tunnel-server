import { Order } from "../models/Order";
import { OrderStatus } from "../types";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export default class OrderResource extends TimeStamps {
  private total: number;
  private subtotal: number;
  private discount: number;
  private orderNumber: number;
  private orderStatus: OrderStatus;

  constructor(order: Order) {
    super();
    this.total = order.total;
    this.subtotal = order.subtotal;
    this.discount = order.discount;
    this.orderNumber = order.orderNumber;
    this.orderStatus = order.orderStatus;
    this.createdAt = order.createdAt;
  }

  toJSON() {
    return {
      total: this.total,
      subtotal: this.subtotal,
      discount: this.discount,
      orderNumber: this.orderNumber,
      orderStatus: this.orderStatus,
      createdAt: this.createdAt,
    };
  }
}
