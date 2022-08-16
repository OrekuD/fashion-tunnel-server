import { Router } from "express";
import UserRoutes from "./user";

const router = Router();

// router.get("/", (req, res) => {
//   res.status(200).send({ message: "Hi there" });
// });

// router.use("/products", ProductsRoutes);
router.use("/user", UserRoutes);

export default router;
