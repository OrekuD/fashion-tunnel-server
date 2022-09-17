import { validateAdmin } from "./../middlewares/validateAdmin";
import { Router } from "express";
import AdminController from "../controllers/admin";

const router = Router();

router.post("/auth/sign-in", AdminController.signin);

router.get("/orders", validateAdmin, AdminController.getAllOrders);
router.get("/orders/:orderId", validateAdmin, AdminController.getOrder);
router.put(
  "/orders/:orderId/update-status",
  validateAdmin,
  AdminController.updateOrderStatus
);

router.get("/income", validateAdmin, AdminController.getIncome);

router.get("/users", validateAdmin, AdminController.getAllUsers);
router.get("/users/:userId", validateAdmin, AdminController.getUser);
router.delete("/users/:userId", validateAdmin, AdminController.deleteUser);

router.get("/products", validateAdmin, AdminController.getAllProducts);
router.post("/products", validateAdmin, AdminController.createProduct);
router.get("/products/:productId", validateAdmin, AdminController.getProduct);
router.delete(
  "/products/:productId",
  validateAdmin,
  AdminController.deleteProduct
);

export default router;
