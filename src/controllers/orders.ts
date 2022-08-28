import UserModel from "../models/User";
import { IRequest, OrderProduct, OrderStatus, RouteHandler } from "../types";
import ErrorResource from "../resources/ErrorResource";
import OrderModel from "../models/Order";
import OrderResource from "../resources/OrderResource";
import { calculateOrder } from "../utils/calculateOrder";
import ProductModel from "../models/Product";
import CreateOrderRequest from "../requests/CreateOrderRequest";

const getOrder: RouteHandler = async (req: IRequest<any>, res) => {
  const user = await UserModel.findById(req.userId);
  if (!user) {
    return res
      .status(404)
      .json(new ErrorResource("User not found", 404).toJSON());
  }
  const order = await OrderModel.findOne({
    userId: req.userId,
    _id: req.params.orderId,
  });
  if (!order) {
    return res
      .status(404)
      .json(new ErrorResource("Order not found", 404).toJSON());
  }
  return res.status(200).json(new OrderResource(order).toJSON());
};

const getUserOrders: RouteHandler = async (req: IRequest<any>, res) => {
  const user = await UserModel.findById(req.userId);
  if (!user) {
    return res
      .status(404)
      .json(new ErrorResource("User not found", 404).toJSON());
  }
  const orders = await OrderModel.find({ userId: req.userId }).sort({
    createdAt: -1,
  });
  return res
    .status(200)
    .json(orders.map((order) => new OrderResource(order).toJSON()));
};

const createNewOrder: RouteHandler = async (
  req: IRequest<CreateOrderRequest>,
  res
) => {
  const user = await UserModel.findById(req.userId);
  if (!user) {
    return res
      .status(404)
      .json(new ErrorResource("User not found", 404).toJSON());
  }
  const productIds: Array<string> = req.body.products.map(({ id }) => id);
  const products = await ProductModel.find({
    _id: {
      $in: productIds,
    },
  });
  if (productIds.length !== products.length) {
    // do something?
    console.log("some products not found");
    return res
      .status(400)
      .json(new ErrorResource("Some products were not found", 400).toJSON());
  }

  const orderProducts: Array<OrderProduct> = products.map(({ _id, price }) => {
    const item = req.body.products.find(({ id }) => id === _id.toString())!;
    return {
      price,
      id: _id,
      count: item.count,
      total: item.count * price,
    };
  });

  const { subtotal, total, discount } = calculateOrder(
    orderProducts,
    req.body.discount
  );

  if (subtotal !== req.body.subtotal || total !== req.body.total) {
    return res
      .status(400)
      .json(new ErrorResource("Invalid order", 400).toJSON());
  }

  const orders = await OrderModel.find();
  const order = await OrderModel.create({
    orderNumber: orders.length + 1,
    total,
    subtotal,
    discount,
    userId: req.userId,
    products: orderProducts,
    orderStatus: OrderStatus.PENDING,
  });
  return res.status(200).json(new OrderResource(order).toJSON());
};

const OrderController = {
  getUserOrders,
  createNewOrder,
  getOrder,
};

export default OrderController;
