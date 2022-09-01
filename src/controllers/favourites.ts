import OkResource from "../resources/OkResource";
import ProductResource from "../resources/ProductResource";
import ErrorResource from "../resources/ErrorResource";
import UserModel from "../models/User";
import { IRequest, RouteHandler } from "./../types";
import FavouriteModel from "../models/Favourite";
import ProductModel from "../models/Product";

const updateFavourites: RouteHandler = async (
  req: IRequest<{ productId: string }>,
  res
) => {
  const user = await UserModel.findById(req.userId);
  if (!user) {
    return res
      .status(404)
      .json(new ErrorResource("User not found", 404).toJSON());
  }
  const product = await ProductModel.findById(req.body.productId);
  if (!product) {
    return res
      .status(404)
      .json(new ErrorResource("Product not found", 404).toJSON());
  }

  const alreadyAdded = await FavouriteModel.findOne({
    $and: [{ productId: req.body.productId }, { userId: req.userId }],
  });

  if (alreadyAdded) {
    await FavouriteModel.deleteOne({ _id: alreadyAdded._id });
  } else {
    const favourite = await FavouriteModel.create({
      productId: req.body.productId,
      userId: req.userId,
    });

    if (!favourite) {
      return res
        .status(500)
        .json(
          new ErrorResource(
            "There was an issue adding your new favourite",
            500
          ).toJSON()
        );
    }
  }

  return res.status(200).json(new OkResource().toJSON());
};

const getUserFavourites: RouteHandler = async (req: IRequest<any>, res) => {
  const user = await UserModel.findById(req.userId);
  if (!user) {
    return res
      .status(404)
      .json(new ErrorResource("User not found", 404).toJSON());
  }

  const favourites = await FavouriteModel.find({ userId: req.userId }).sort({
    createdAt: -1,
  });
  const ids = favourites.map(({ productId }) => productId);
  const products = await ProductModel.find({
    _id: {
      $in: ids,
    },
  });

  const reorderedList = ids.map((_id) => products.find(({ id }) => id === _id));

  return res
    .status(200)
    .json(
      reorderedList
        .filter(Boolean)
        .map((product) => new ProductResource(product!).toJSON())
    );
};

const FavouriteController = {
  updateFavourites,
  getUserFavourites,
};

export default FavouriteController;
