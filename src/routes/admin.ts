import { Router } from "express";
import AdminController from "../controllers/admin";

const router = Router();

router.get("/users", AdminController.getAllUsers);
router.get("/orders", AdminController.getAllOrders);
router.get("/income", AdminController.getIncome);
router.delete("/users/:userId", AdminController.deleteUser);
router.delete("/products/:productId", AdminController.deleteProduct);

export default router;
