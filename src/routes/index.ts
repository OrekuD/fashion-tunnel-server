import { Router } from "express";
import UserRoutes from "./user";
import ProductsRoutes from "./products";
import FavouritesRoutes from "./favourites";
import AdminRoutes from "./admin";
import OrdersRoutes from "./orders";

const router = Router();

// router.get("/", (req, res) => {
//   res.status(200).send({ message: "Hi there" });
// });

// router.use("/products", ProductsRoutes);
router.use("/user", UserRoutes);
router.use("/products", ProductsRoutes);
router.use("/favourites", FavouritesRoutes);
router.use("/admin", AdminRoutes);
router.use("/orders", OrdersRoutes);

export default router;
