import DetailedUserResource from "../resources/DetailedUserResource";
import UserModel from "../models/User";
import { DetailedOrderProduct, IRequest, RouteHandler } from "./../types";
import ErrorResource from "../resources/ErrorResource";
import OkResource from "../resources/OkResource";
import ProductModel from "../models/Product";
import OrderModel from "../models/Order";
// import DetailedOrderResource from "../resources/DetailedOrderResource";
import SimpleOrderResource from "../resources/SimpleOrderResource";
import DetailedOrderResource from "../resources/DetailedOrderResource";
import DetailedProductResource from "../resources/DetailedProductResource";

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
    .json({ amount: orders.reduce((sum, order) => sum + order.total, 0) });
};

const getAllOrders: RouteHandler = async (_, res) => {
  const orders = await OrderModel.find().sort({
    createdAt: -1,
  });

  const response: Array<any> = [];
  for (const order of orders) {
    const user = await UserModel.findById(order.userId);
    response.push(
      new SimpleOrderResource(order, user!, order.products.length).toJSON()
    );
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
  const data = await ProductModel.find();
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
};

export default AdminController;