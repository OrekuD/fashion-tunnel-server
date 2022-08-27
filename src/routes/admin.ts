import { Router } from "express";
import AdminController from "../controllers/admin";

const router = Router();

router.get("/users", AdminController.getAllUsers);
router.delete("/users/:userId", AdminController.deleteUser);
router.delete("/products/:productId", AdminController.deleteProduct);

export default router;
