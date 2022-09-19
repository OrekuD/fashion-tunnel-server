import ErrorResource from "../resources/ErrorResource";
import ProductModel from "../models/Product";
import { IRequest, RouteHandler } from "./../types";
import ProductResource from "../resources/ProductResource";
import SearchProductRequest from "src/requests/SearchProductRequest";
import Fuse from "fuse.js";

const getProducts: RouteHandler = async (_, res) => {
  const data = await ProductModel.find().sort({
    createdAt: -1,
  });
  // add some sort of pagination
  return res
    .status(200)
    .json(data.map((product) => new ProductResource(product).toJSON()));
};

const getProduct: RouteHandler = async (req: IRequest<any>, res) => {
  const productId = req.params.productId;
  const product = await ProductModel.findOne({ id: productId });

  if (!product) {
    return res
      .status(404)
      .json(new ErrorResource("Product not found", 404).toJSON());
  }
  return res.status(200).json(new ProductResource(product).toJSON());
};

const searchProducts: RouteHandler = async (
  req: IRequest<SearchProductRequest>,
  res
) => {
  const products = await ProductModel.find();
  const fuse = new Fuse(products, {
    keys: ["name"],
  });

  const response = fuse.search(req.body.query);

  return res
    .status(200)
    .json(response.map(({ item }) => new ProductResource(item).toJSON()));
};

const ProductsController = { getProducts, getProduct, searchProducts };

export default ProductsController;
