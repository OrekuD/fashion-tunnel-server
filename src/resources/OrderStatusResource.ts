import { OrderStatus } from "../types";

export default class OrderStatusResource {
  private orderId: string;
  private status: OrderStatus;

  constructor(orderId: string, status: OrderStatus) {
    this.orderId = orderId;
    this.status = status;
  }

  toJSON() {
    return {
      orderId: this.orderId,
      status: this.status,
    };
  }
}
