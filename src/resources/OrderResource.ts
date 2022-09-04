import { Order } from "../models/Order";
import {
  Address,
  DetailedOrderProduct,
  OrderStatus,
  OrderStatusTimeStamp,
} from "../types";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export default class OrderResource extends TimeStamps {
  private id: string;
  private total: number;
  private subtotal: number;
  private discount: number;
  private orderNumber: number;
  private products: Array<DetailedOrderProduct>;
  private status: OrderStatus;
  private deliveryAddress: Address | null;
  private statusTimeStamps: Array<OrderStatusTimeStamp>;

  constructor(
    order: Order,
    deliveryAddress: Address | null,
    products: Array<DetailedOrderProduct>
  ) {
    super();
    this.id = (order as any)?._id;
    this.total = order.total;
    this.subtotal = order.subtotal;
    this.discount = order.discount;
    this.orderNumber = order.orderNumber;
    this.status = order.status;
    this.createdAt = order.createdAt;
    this.products = products;
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
      products: this.products,
      createdAt: this.createdAt,
      deliveryAddress: this.deliveryAddress,
      statusTimeStamps: this.statusTimeStamps,
    };
  }
}
