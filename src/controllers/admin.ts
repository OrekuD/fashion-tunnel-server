import argon2 from "argon2";
import DetailedUserResource from "../resources/DetailedUserResource";
import UserModel from "../models/User";
import {
  DetailedOrderProduct,
  Events,
  IRequest,
  Roles,
  RouteHandler,
} from "./../types";
import ErrorResource from "../resources/ErrorResource";
import OkResource from "../resources/OkResource";
import ProductModel from "../models/Product";
import OrderModel from "../models/Order";
// import DetailedOrderResource from "../resources/DetailedOrderResource";
import SimpleOrderResource from "../resources/SimpleOrderResource";
import DetailedOrderResource from "../resources/DetailedOrderResource";
import DetailedProductResource from "../resources/DetailedProductResource";
import SocketManager from "../managers/SocketManager";
import UpdateOrderStatusRequest from "../requests/UpdateOrderStatusRequest";
import OrderStatusResource from "../resources/OrderStatusResource";
import IncomeResource from "../resources/IncomeResource";
import validateEmail from "../validation/validateEmail";
import SignInRequest from "../requests/SignInRequest";
import AuthResource from "../resources/AuthResource";
import CreateProductRequest from "../requests/CreateProductRequest";
import ProductResource from "../resources/ProductResource";

const getAllUsers: RouteHandler = async (_, res) => {
  const users = await UserModel.find().sort({
    createdAt: -1,
  });
  return res
    .status(200)
    .json(users.map((user) => new DetailedUserResource(user).toJSON()));
};

const getIncome: RouteHandler = async (_, res) => {
  const orders = await OrderModel.find();
  return res
    .status(200)
    .json(
      new IncomeResource(
        orders.reduce((sum, order) => sum + order.total, 0)
      ).toJSON()
    );
};

const getAllOrders: RouteHandler = async (_, res) => {
  const orders = await OrderModel.find().sort({
    createdAt: -1,
  });

  const response: Array<any> = [];
  for (const order of orders) {
    const user = await UserModel.findById(order.userId);
    response.push(new SimpleOrderResource(order, user!).toJSON());
  }
  return res.status(200).json(response);
};

const getOrder: RouteHandler = async (req: IRequest<any>, res) => {
  const order = await OrderModel.findById(req.params.orderId);
  if (!order) {
    return res
      .status(404)
      .json(new ErrorResource("Order not found", 404).toJSON());
  }
  const user = await UserModel.findById(order.userId);
  if (!user) {
    return res
      .status(404)
      .json(new ErrorResource("User not found", 404).toJSON());
  }
  const orderProducts: Array<DetailedOrderProduct> = [];

  for (const orderProduct of order.products) {
    const product = await ProductModel.findById(orderProduct.id);
    if (product) {
      orderProducts.push({
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
    .json(new DetailedOrderResource(order, user, orderProducts).toJSON());
};

const deleteUser: RouteHandler = async (req, res) => {
  const user = await UserModel.findById(req.params.userId);
  if (!user) {
    return res
      .status(404)
      .json(new ErrorResource("User not found", 404).toJSON());
  }
  await UserModel.findByIdAndDelete(req.params.userId);
  return res.status(200).json(new OkResource().toJSON());
};

const getUser: RouteHandler = async (req, res) => {
  const user = await UserModel.findById(req.params.userId);
  if (!user) {
    return res
      .status(404)
      .json(new ErrorResource("User not found", 404).toJSON());
  }
  return res.status(200).json(new DetailedUserResource(user).toJSON());
};

const getAllProducts: RouteHandler = async (_, res) => {
  const data = await ProductModel.find().sort({
    createdAt: -1,
  });
  // add some sort of pagination
  return res
    .status(200)
    .json(data.map((product) => new DetailedProductResource(product).toJSON()));
};

const getProduct: RouteHandler = async (req: IRequest<any>, res) => {
  const product = await ProductModel.findById(req.params.productId);
  if (!product) {
    return res
      .status(404)
      .json(new ErrorResource("Product not found", 404).toJSON());
  }
  return res.status(200).json(new DetailedProductResource(product).toJSON());
};

const deleteProduct: RouteHandler = async (req, res) => {
  const product = await ProductModel.findById(req.params.productId);
  if (!product) {
    return res
      .status(404)
      .json(new ErrorResource("Product not found", 404).toJSON());
  }
  await ProductModel.findByIdAndDelete(req.params.productId);
  return res.status(200).json(new OkResource().toJSON());
};

const updateOrderStatus: RouteHandler = async (
  req: IRequest<UpdateOrderStatusRequest>,
  res
) => {
  const order = await OrderModel.findById(req.params.orderId);
  if (!order) {
    return res
      .status(404)
      .json(new ErrorResource("Order not found", 404).toJSON());
  }

  // await OrderModel.findByIdAndUpdate(order.id, {
  //   status: req.body.status,
  // });

  const statusIndex = order.statusTimeStamps.findIndex(
    ({ status }) => status === req.body.status
  );

  const timeStamp = new Date().toISOString();
  if (statusIndex < 0) {
    order.statusTimeStamps.unshift({
      status: req.body.status,
      time: timeStamp,
    });
  } else {
    order.statusTimeStamps.splice(statusIndex, 1, {
      status: req.body.status,
      time: timeStamp,
    });
  }

  order.status = req.body.status;

  await order.save();

  SocketManager.emitMessage(
    Events.ORDER_STATUS_CHANGE,
    order.userId,
    new OrderStatusResource(order.id, req.body.status, timeStamp).toJSON()
  );

  return res
    .status(200)
    .json(
      new OrderStatusResource(order.id, req.body.status, timeStamp).toJSON()
    );
};

const signin: RouteHandler = async (req: IRequest<SignInRequest>, res) => {
  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password.trim();
  const deviceType = req.body.deviceType;
  if (!validateEmail(email)) {
    return res
      .status(400)
      .json(new ErrorResource("Email is invalid", 400).toJSON());
  }
  const user = await UserModel.findOne({ email, role: Roles.SUPER_ADMIN });
  if (!user) {
    return res
      .status(404)
      .json(new ErrorResource("User not found", 404).toJSON());
  }

  try {
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json(new ErrorResource("Password is invalid", 400));
    }
    return res.status(200).json(new AuthResource(user, deviceType).toJSON());
  } catch {
    return res
      .status(500)
      .json(new ErrorResource("Login unsuccessful", 500).toJSON());
  }
};

const createProduct: RouteHandler = async (
  req: IRequest<CreateProductRequest>,
  res
) => {
  const product = await ProductModel.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    productQuantity: req.body.productQuantity,
    extraInfo: req.body.extraInfo,
    sizeType: req.body.sizeType,
    productCategory: req.body.productCategory,
    gender: req.body.gender,
    images: req.body.images,
  });

  if (!product) {
    return res
      .status(500)
      .json(
        new ErrorResource(
          "There was an issue creating your product",
          500
        ).toJSON()
      );
  }

  return res.status(200).json(new ProductResource(product).toJSON());
};

const AdminController = {
  getAllUsers,
  deleteUser,
  deleteProduct,
  getAllOrders,
  getIncome,
  getOrder,
  getUser,
  getProduct,
  getAllProducts,
  updateOrderStatus,
  signin,
  createProduct,
};

export default AdminController;
