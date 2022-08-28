import { User } from "../models/User";
import { Order } from "../models/Order";
import { OrderProduct, OrderStatus } from "../types";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import DetailedUserResource from "./DetailedUserResource";

export default class DetailedOrderResource extends TimeStamps {
  private id: string;
  private total: number;
  private subtotal: number;
  private discount: number;
  private orderNumber: number;
  private products: Array<OrderProduct>;
  private orderStatus: OrderStatus;
  private user: User | null;

  constructor(order: Order, user: User | null, products: Array<OrderProduct>) {
    super();
    this.id = (order as any)._id;
    this.total = order.total;
    this.subtotal = order.subtotal;
    this.discount = order.discount;
    this.orderNumber = order.orderNumber;
    this.orderStatus = order.orderStatus;
    this.createdAt = order.createdAt;
    this.products = products;
    this.user = user;
  }

  toJSON() {
    return {
      id: this.id,
      total: this.total,
      subtotal: this.subtotal,
      discount: this.discount,
      orderNumber: this.orderNumber,
      orderStatus: this.orderStatus,
      createdAt: this.createdAt,
      products: this.products,
      user: this.user ? new DetailedUserResource(this.user).toJSON() : null,
    };
  }
}
