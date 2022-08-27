import DetailedUserResource from "../resources/DetailedUserResource";
import UserModel from "../models/User";
import { RouteHandler } from "./../types";
import ErrorResource from "../resources/ErrorResource";
import OkResource from "../resources/OkResource";
import ProductModel from "../models/Product";

const getAllUsers: RouteHandler = async (_, res) => {
  const users = await UserModel.find();
  return res
    .status(200)
    .json(users.map((user) => new DetailedUserResource(user).toJSON()));
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
};

export default AdminController;
