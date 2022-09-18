import { User } from "../models/User";
import { Order } from "../models/Order";
import {
  Address,
  DetailedOrderProduct,
  OrderStatus,
  OrderStatusTimeStamp,
} from "../types";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import DetailedUserResource from "./DetailedUserResource";

export default class DetailedOrderResource extends TimeStamps {
  private id: string;
  private total: number;
  private subtotal: number;
  private discount: number;
  private orderNumber: number;
  private products: Array<DetailedOrderProduct>;
  private status: OrderStatus;
  private user: User | null;
  private deliveryAddress: Address | null;
  private statusTimeStamps: Array<OrderStatusTimeStamp>;

  constructor(
    order: Order,
    user: User | null,
    products: Array<DetailedOrderProduct>,
    deliveryAddress: Address | null
  ) {
    super();
    this.id = (order as any)._id;
    this.total = order.total;
    this.subtotal = order.subtotal;
    this.discount = order.discount;
    this.orderNumber = order.orderNumber;
    this.status = order.status;
    this.createdAt = order.createdAt;
    this.products = products;
    this.user = user;
    this.deliveryAddress = deliveryAddress;
    this.statusTimeStamps = order.statusTimeStamps;
  }

  toJSON() {
    return {
      id: this.id,
      total: this.total,
      subtotal: this.subtotal,
      discount: this.discount,
      orderNumber: this.orderNumber,
      status: this.status,
      createdAt: this.createdAt,
      products: this.products,
      deliveryAddress: this.deliveryAddress,
      statusTimeStamps: this.statusTimeStamps,
      user: this.user ? new DetailedUserResource(this.user).toJSON() : null,
    };
  }
}
