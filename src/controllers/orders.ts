import UserModel from "../models/User";
import {
  DetailedOrderProduct,
  Events,
  IRequest,
  OrderProduct,
  OrderStatus,
  RouteHandler,
} from "../types";
import ErrorResource from "../resources/ErrorResource";
import OrderModel, { Order } from "../models/Order";
import OrderResource from "../resources/OrderResource";
import { calculateOrder } from "../utils/calculateOrder";
import ProductModel from "../models/Product";
import CreateOrderRequest from "../requests/CreateOrderRequest";
import UserAddressModel, { UserAddress } from "../models/UserAddress";
import UserAddressResource from "../resources/UserAddressResource";
import SocketManager from "../managers/SocketManager";

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

  const userAddress = await UserAddressModel.findById(order.userAddressId);

  const products: Array<DetailedOrderProduct> = [];
  for (const orderProduct of order.products) {
    const product = await ProductModel.findById(orderProduct.id);
    if (product) {
      products.push({
        description: product.description,
        extraInfo: product.extraInfo,
        gender: product.gender,
        images: product.images,
        name: product.name,
        productCategory: product.productCategory,
        productQuantity: product.productCategory,
        sizeType: product.sizeType,
        price: orderProduct.price,
        total: orderProduct.total,
        count: orderProduct.count,
        id: orderProduct.id,
      });
    }
  }

  return res
    .status(200)
    .json(
      new OrderResource(
        order,
        userAddress ? new UserAddressResource(userAddress).toJSON() : null,
        products
      ).toJSON()
    );
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

  const data: Array<{
    order: Order;
    address: UserAddress | null;
    products: Array<DetailedOrderProduct>;
  }> = [];

  for (const order of orders) {
    const products: Array<DetailedOrderProduct> = [];
    const address = await UserAddressModel.findById(order.userAddressId);
    for (const orderProduct of order.products) {
      const product = await ProductModel.findById(orderProduct.id);
      if (product) {
        products.push({
          description: product.description,
          extraInfo: product.extraInfo,
          gender: product.gender,
          images: product.images,
          name: product.name,
          productCategory: product.productCategory,
          productQuantity: product.productCategory,
          sizeType: product.sizeType,
          price: orderProduct.price,
          total: orderProduct.total,
          count: orderProduct.count,
          id: orderProduct.id,
        });
      }
    }

    data.push({
      order,
      address,
      products,
    });
  }

  return res
    .status(200)
    .json(
      data.map(({ order, address, products }) =>
        new OrderResource(
          order,
          address ? new UserAddressResource(address).toJSON() : null,
          products
        ).toJSON()
      )
    );
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
    userAddressId: req.body.userAddressId,
  });

  const userAddress = await UserAddressModel.findById(order.userAddressId);

  const detailedProducts: Array<DetailedOrderProduct> = [];
  for (const orderProduct of order.products) {
    const product = await ProductModel.findById(orderProduct.id);
    if (product) {
      detailedProducts.push({
        description: product.description,
        extraInfo: product.extraInfo,
        gender: product.gender,
        images: product.images,
        name: product.name,
        productCategory: product.productCategory,
        productQuantity: product.productCategory,
        sizeType: product.sizeType,
        price: orderProduct.price,
        total: orderProduct.total,
        count: orderProduct.count,
        id: orderProduct.id,
      });
    }
  }

  SocketManager.emitMessage(
    Events.USER_PROFILE_UPDATE,
    user.id,
    new OrderResource(
      order,
      userAddress ? new UserAddressResource(userAddress).toJSON() : null,
      detailedProducts
    ).toJSON()
  );

  return res
    .status(200)
    .json(
      new OrderResource(
        order,
        userAddress ? new UserAddressResource(userAddress).toJSON() : null,
        detailedProducts
      ).toJSON()
    );
};

const OrderController = {
  getUserOrders,
  createNewOrder,
  getOrder,
};

export default OrderController;
