import ProductModel from "../models/Product";
import { RouteHandler } from "./../types";
import { Response } from "express";
import ProductResource from "../resources/ProductResource";

const getProducts: RouteHandler = async (_, res: Response) => {
  const data = await ProductModel.find();
  // add some sort of pagination
  return res
    .status(200)
    .json(data.map((product) => new ProductResource(product).toJSON()));
};

const ProductsController = { getProducts };

export default ProductsController;
