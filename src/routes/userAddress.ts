import { validateUser } from "./../middlewares/validateUser";
import { Router } from "express";
import UserAddressController from "../controllers/userAddress";

const router = Router();

router.get("/", validateUser, UserAddressController.getUserAddresses);
router.put(
  "/:userAddressId",
  validateUser,
  UserAddressController.updateAddress
);
router.delete(
  "/:userAddressId",
  validateUser,
  UserAddressController.deleteAddress
);
router.post("/", validateUser, UserAddressController.addNewAddress);

export default router;
