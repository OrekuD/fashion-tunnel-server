import { Router } from "express";
import ProductsController from "../controllers/products";

const router = Router();

router.get("/", ProductsController.getProducts);
router.get("/:productId", ProductsController.getProduct);

export default router;
