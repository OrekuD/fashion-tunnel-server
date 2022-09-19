import { Router } from "express";
import ProductsController from "../controllers/products";

const router = Router();

router.get("/", ProductsController.getProducts);
router.post("/search", ProductsController.searchProducts);
router.get("/:productId", ProductsController.getProduct);

export default router;
