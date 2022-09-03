import { OrderStatus } from "../types";

export default interface UpdateOrderStatusRequest {
  status: OrderStatus;
}
