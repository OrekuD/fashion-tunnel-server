import ErrorResource from "../resources/ErrorResource";
import UserModel from "../models/User";
import { IRequest, RouteHandler } from "../types";
import UserAddressModel from "../models/UserAddress";
import UserAddressResource from "../resources/UserAddressResource";
import AddNewAddressRequest from "src/requests/AddNewAddressRequest";
import OkResource from "src/resources/OkResource";

const getUserAddresses: RouteHandler = async (req: IRequest<any>, res) => {
  const user = await UserModel.findById(req.userId);
  if (!user) {
    return res
      .status(404)
      .json(new ErrorResource("User not found", 404).toJSON());
  }

  const userAddresses = await UserAddressModel.find({
    userId: req.userId,
  }).sort({
    createdAt: -1,
  });

  return res
    .status(200)
    .json(
      userAddresses.map((userAddress) =>
        new UserAddressResource(userAddress).toJSON()
      )
    );
};

const addNewAddress: RouteHandler = async (
  req: IRequest<AddNewAddressRequest>,
  res
) => {
  const user = await UserModel.findById(req.userId);
  if (!user) {
    return res
      .status(404)
      .json(new ErrorResource("User not found", 404).toJSON());
  }

  const userAddress = await UserAddressModel.create({
    userId: req.userId,
    name: req.body.name,
    addressLine: req.body.addressLine,
    postalCode: req.body.postalCode,
  });

  return res.status(200).json(new UserAddressResource(userAddress).toJSON());
};

const updateAddress: RouteHandler = async (
  req: IRequest<AddNewAddressRequest>,
  res
) => {
  const user = await UserModel.findById(req.userId);
  if (!user) {
    return res
      .status(404)
      .json(new ErrorResource("User not found", 404).toJSON());
  }

  const userAddress = await UserAddressModel.findById(req.params.userAddressId);

  if (!userAddress) {
    return res
      .status(404)
      .json(new ErrorResource("Address not found", 404).toJSON());
  }

  userAddress.name = req.body.name.trim();
  userAddress.addressLine = req.body.addressLine.trim();
  userAddress.postalCode = req.body.postalCode.trim();

  await userAddress.save();

  return res.status(200).json(new UserAddressResource(userAddress).toJSON());
};

const deleteAddress: RouteHandler = async (req: IRequest<any>, res) => {
  const user = await UserModel.findById(req.userId);
  if (!user) {
    return res
      .status(404)
      .json(new ErrorResource("User not found", 404).toJSON());
  }

  await UserAddressModel.findByIdAndDelete(req.params.userAddressId);

  return res.status(200).json(new OkResource().toJSON());
};

const UserAddressController = {
  getUserAddresses,
  addNewAddress,
  updateAddress,
  deleteAddress,
};

export default UserAddressController;
