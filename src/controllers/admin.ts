import DetailedUserResource from "../resources/DetailedUserResource";
import UserModel from "../models/User";
import { RouteHandler } from "./../types";
import ErrorResource from "../resources/ErrorResource";
import OkResource from "../resources/OkResource";
import ProductModel from "../models/Product";
import OrderModel from "../models/Order";
import DetailedOrderResource from "../resources/DetailedOrderResource";

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
  for (const orderIndex in orders) {
    const user = await UserModel.findById(orders[orderIndex].userId);
    response.push(
      new DetailedOrderResource(
        orders[orderIndex],
        user,
        orders[orderIndex].products
      ).toJSON()
    );
  }
  return res.status(200).json(response);
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
};

export default AdminController;
