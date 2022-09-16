import { Router } from "express";
import ImagesController from "../controllers/images";

const router = Router();

router.post("/", ImagesController.uploadImages);

export default router;
