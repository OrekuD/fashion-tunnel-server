import { Router } from "express";
import SearchController from "../controllers/search";

const router = Router();

router.post("/", SearchController.searchProducts);

export default router;
