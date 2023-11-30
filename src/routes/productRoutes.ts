import { Router } from "express";
import * as productController from "../controllers/productController";

const router = Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);
router
  .route("/:id")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

export default router;
