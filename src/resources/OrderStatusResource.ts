import { OrderStatus } from "../types";

export default class OrderStatusResource {
  private orderId: string;
  private status: OrderStatus;
  private time: string;

  constructor(orderId: string, status: OrderStatus, time: string) {
    this.orderId = orderId;
    this.status = status;
    this.time = time;
  }

  toJSON() {
    return {
      orderId: this.orderId,
      status: this.status,
      time: this.time,
    };
  }
}
