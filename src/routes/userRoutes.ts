import { Router } from "express";
import * as authController from "../controllers/authController";
import * as userController from "../controllers/userController";

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword/:resetToken", authController.resetPassword);

router.use(authController.protect);

router.patch("/updatePassword", authController.updatePassword);
router.get("/showMe", userController.setIdToParams, userController.getUser);
router.delete(
  "/deleteMe",
  userController.setIdToParams,
  userController.deleteUser,
);
router.patch("/updateMe", userController.updateMe);

router.use(authController.protect, authController.restrictTo("admin"));

router.route("/").get(userController.getAllUsers);
router
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);

export default router;
