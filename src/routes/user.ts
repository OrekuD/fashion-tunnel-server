import { Router } from "express";
import UserController from "../controllers/user";
import { validateUser } from "../middlewares/validateUser";

const router = Router();
router.post("/sign-up", UserController.signup);
router.post("/sign-in", UserController.signin);
router.put("/profile-image", validateUser, UserController.updateProfileImage);
router.get("/sign-out", validateUser, UserController.signout);
router.get("/", validateUser, UserController.user);
router.put("/", validateUser, UserController.updateUser);
router.put("/change-password", validateUser, UserController.changePassword);
router.post("/validate/email", UserController.validateUserEmail);

export default router;
