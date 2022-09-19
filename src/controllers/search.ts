import ProductModel from "../models/Product";
import { IRequest, RouteHandler } from "./../types";
import ProductResource from "../resources/ProductResource";
import SearchProductRequest from "src/requests/SearchProductRequest";
import Fuse from "fuse.js";

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

const SearchController = { searchProducts };

export default SearchController;
