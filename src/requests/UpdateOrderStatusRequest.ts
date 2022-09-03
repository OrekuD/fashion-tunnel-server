import { OrderStatus } from "../types";

export default interface UpdateOrderStatusRequest {
  orderId: string;
  status: OrderStatus;
}
