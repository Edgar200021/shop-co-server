import { Router } from "express";

import * as basketController from "../controllers/basketController";
import * as authController from "../controllers/authController";

const router = Router();

router
  .route("/")
  .get(authController.protect, basketController.getAllBasketProducts)
  .post(authController.protect, basketController.createBasketProduct);

router
  .route("/:id")
  .patch(authController.protect, basketController.updateBasketProduct)
  .delete(authController.protect, basketController.deleteBasketProduct);

export default router;
