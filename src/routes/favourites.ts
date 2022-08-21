import { validateUser } from "./../middlewares/validateUser";
import { Router } from "express";
import FavouritesController from "../controllers/favourites";

const router = Router();

router.get("/", validateUser, FavouritesController.getUserFavourites);
router.post("/", validateUser, FavouritesController.updateFavourites);

export default router;
