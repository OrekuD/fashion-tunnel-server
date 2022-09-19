import { Router } from "express";
import UserRoutes from "./user";
import ProductsRoutes from "./products";
import FavouritesRoutes from "./favourites";
import AdminRoutes from "./admin";
import OrdersRoutes from "./orders";
import UserAddressRoutes from "./userAddress";
import ImagesRoutes from "./images";
import SearchRoutes from "./search";

const router = Router();

router.use("/user", UserRoutes);
router.use("/user-address", UserAddressRoutes);
router.use("/products", ProductsRoutes);
router.use("/favourites", FavouritesRoutes);
router.use("/admin", AdminRoutes);
router.use("/orders", OrdersRoutes);
router.use("/search", SearchRoutes);
router.use("/upload/images", ImagesRoutes);

export default router;
