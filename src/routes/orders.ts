import { validateUser } from "./../middlewares/validateUser";
import { Router } from "express";
import OrderController from "../controllers/orders";

const router = Router();

router.get("/", validateUser, OrderController.getUserOrders);
router.get("/:orderId", validateUser, OrderController.getUserOrders);
router.post("/", validateUser, OrderController.createNewOrder);

export default router;
