import ErrorResource from "../resources/ErrorResource";
import ProductModel from "../models/Product";
import { IRequest, RouteHandler } from "./../types";
import { Response } from "express";
import ProductResource from "../resources/ProductResource";

const getProducts: RouteHandler = async (_, res: Response) => {
  const data = await ProductModel.find();
  // add some sort of pagination
  return res
    .status(200)
    .json(data.map((product) => new ProductResource(product).toJSON()));
};

const getProduct: RouteHandler = async (req: IRequest<any>, res: Response) => {
  const productId = req.params.productId;
  const product = await ProductModel.findOne({ id: productId });

  if (!product) {
    return res
      .status(404)
      .json(new ErrorResource("Product not found", 404).toJSON());
  }
  return res.status(200).json(new ProductResource(product).toJSON());
};

const ProductsController = { getProducts, getProduct };

export default ProductsController;
