import { OrderProduct } from "../types";

export default interface CreateOrderRequest {
  total: number;
  subtotal: number;
  discount: number;
  products: Array<OrderProduct>;
}
