import { Router } from "express";
import * as reviewController from "../controllers/reviewController";
import * as authController from "../controllers/authController";

const router = Router();

router.use(reviewController.checkProductId);
router.get(
  "/myReview/:productId",
  authController.protect,
  reviewController.getMyReview,
);

router.delete(
  "/deleteMyReview/:productId",
  authController.protect,
  authController.restrictTo("user"),
  reviewController.setUserIdToBody,
  reviewController.deleteReview,
);
router.patch(
  "/updateMyReview/:productId",
  authController.protect,
  authController.restrictTo("user"),
  reviewController.setUserIdToBody,
  reviewController.updateReview,
);

router
  .route("/:productId")
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo("user"),
    reviewController.createReview,
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    reviewController.updateReview,
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    reviewController.deleteReview,
  );

export default router;
