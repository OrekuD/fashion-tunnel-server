import { Router } from "express";
import AdminController from "../controllers/admin";

const router = Router();

router.get("/orders", AdminController.getAllOrders);
router.get("/orders/:orderId", AdminController.getOrder);
router.get("/socket/:userId", AdminController.test);

router.get("/income", AdminController.getIncome);

router.get("/users", AdminController.getAllUsers);
router.get("/users/:userId", AdminController.getUser);
router.delete("/users/:userId", AdminController.deleteUser);

router.get("/products", AdminController.getAllProducts);
router.get("/products/:productId", AdminController.getProduct);
router.delete("/products/:productId", AdminController.deleteProduct);

export default router;
