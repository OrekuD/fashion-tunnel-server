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
import validateEmail from "../validation/validateEmail";
import SignInRequest from "../requests/SignInRequest";
import AuthResource from "../resources/AuthResource";
import CreateProductRequest from "../requests/CreateProductRequest";
import ProductResource from "../resources/ProductResource";
import UpdateProductRequest from "../requests/UpdateProductRequest";
import SummaryResource from "../resources/SummaryResource";
import toNumber from "../utils/toNumber";
import PaginatedResource from "../resources/PaginatedResource";

const getAllUsers: RouteHandler = async (req, res) => {
  const page = req.query.page ? toNumber(req.query.page as string) : 0;
  const size = req.query.size ? toNumber(req.query.size as string) : 0;
  const start = (page - 1) * size;
  const end = (page - 1) * size + size;
  const users = await UserModel.find({ role: Roles.USER }).sort({
    createdAt: -1,
  });
  const hasNextPage = users.slice(end).length > 0;
  const list = users.slice(start, end);

  return res.status(200).json(
    new PaginatedResource(
      {
        currentPage: page,
        nextPage: hasNextPage ? page + 1 : page,
        pageSize: size,
        totalPages: Math.ceil(users.length / size),
      },
      list.map((user) => new DetailedUserResource(user).toJSON())
    )
  );
};

const getSummary: RouteHandler = async (_, res) => {
  const orders = await OrderModel.find();
  const users = await UserModel.find({ role: Roles.USER });
  const income = orders.reduce((sum, order) => sum + order.total, 0);
  return res
    .status(200)
    .json(new SummaryResource(income, users.length, orders.length).toJSON());
};

const getAllOrders: RouteHandler = async (req, res) => {
  const page = req.query.page ? toNumber(req.query.page as string) : 0;
  const size = req.query.size ? toNumber(req.query.size as string) : 0;
  const start = (page - 1) * size;
  const end = (page - 1) * size + size;
  const orders = await OrderModel.find().sort({
    createdAt: -1,
  });
  const hasNextPage = orders.slice(end).length > 0;
  const list = orders.slice(start, end);

  const response: Array<any> = [];
  for (const order of list) {
    const user = await UserModel.findById(order.userId);
    response.push(new SimpleOrderResource(order, user!).toJSON());
  }

  return res.status(200).json(
    new PaginatedResource(
      {
        currentPage: page,
        nextPage: hasNextPage ? page + 1 : page,
        pageSize: size,
        totalPages: Math.ceil(response.length / size),
      },
      response
    )
  );
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

const getAllProducts: RouteHandler = async (req, res) => {
  const page = req.query.page ? toNumber(req.query.page as string) : 0;
  const size = req.query.size ? toNumber(req.query.size as string) : 0;
  const start = (page - 1) * size;
  const end = (page - 1) * size + size;
  const products = await ProductModel.find().sort({
    createdAt: -1,
  });
  const hasNextPage = products.slice(end).length > 0;
  const list = products.slice(start, end);

  return res.status(200).json(
    new PaginatedResource(
      {
        currentPage: page,
        nextPage: hasNextPage ? page + 1 : page,
        pageSize: size,
        totalPages: Math.ceil(products.length / size),
      },
      list.map((product) => new DetailedProductResource(product).toJSON())
    )
  );
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

const updateProduct: RouteHandler = async (
  req: IRequest<UpdateProductRequest>,
  res
) => {
  const product = await ProductModel.findById(req.params.productId);
  if (!product) {
    return res
      .status(404)
      .json(new ErrorResource("Product not found", 404).toJSON());
  }

  const updatedProduct = await ProductModel.findByIdAndUpdate(product.id, {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    productQuantity: req.body.productQuantity,
    extraInfo: req.body.extraInfo,
    sizeType: req.body.sizeType,
    productCategory: req.body.productCategory,
    gender: req.body.gender,
    // images: req.body.images,
  });

  if (!updatedProduct) {
    return res
      .status(500)
      .json(
        new ErrorResource(
          "There was an issue updating your product",
          500
        ).toJSON()
      );
  }

  return res.status(200).json(new ProductResource(updatedProduct).toJSON());
};

const AdminController = {
  getAllUsers,
  deleteUser,
  deleteProduct,
  getAllOrders,
  getSummary,
  getOrder,
  getUser,
  getProduct,
  getAllProducts,
  updateOrderStatus,
  signin,
  createProduct,
  updateProduct,
};

export default AdminController;
