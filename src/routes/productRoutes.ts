import { Router } from "express";
import * as productController from "../controllers/productController";
import * as uploadController from "../controllers/uploadController";
import * as authController from "../controllers/authController";
import { upload } from "../utils/multer";

const router = Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    productController.createProduct,
  );

router.post(
  "/upload",
  authController.protect,
  authController.restrictTo("admin"),
  upload.single("image"),
  uploadController.uploadProductImage,
);

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    productController.updateProduct,
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    productController.deleteProduct,
  );

export default router;
