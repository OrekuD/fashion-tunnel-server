import { Router } from "express";
import UserController from "../controllers/user";
import { validateUser } from "../middlewares/validateUser";

const router = Router();
router.post("/sign-up", UserController.signup);
router.post("/sign-in", UserController.signin);
router.post(
  "/upload-profile-image",
  validateUser,
  UserController.uploadProfileImage
);
router.get("/sign-out", validateUser, UserController.signout);
router.get("/user", validateUser, UserController.user);

export default router;
