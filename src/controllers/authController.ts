import { sendEmail } from "./../utils/mail";
import { NextFunction, Request, Response } from "express";
import crypto from "crypto";

import User from "../models/userModel";
import { attachCookieToResponse, verifyJwt } from "../utils/jwt";
import { AppError } from "../utils/AppError";
import { ICustomRequest } from "../types";

const signup = async (req: Request, res: Response) => {
  const { name, email, password, passwordConfirm } = req.body;

  const user = await User.create({ name, email, password, passwordConfirm });

  attachCookieToResponse(res, { id: user._id });

  return res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });
};
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new AppError("Please provide email and password", 400);

  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password, user.password))) {
    throw new AppError("Email or password not correct", 400);
  }

  attachCookieToResponse(res, { id: user._id });

  return res.status(200).json({
    status: "success",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });
};
const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
  });

  return res.status(200).json({
    status: "success",
    message: "User loged out",
  });
};
const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) throw new AppError("Please provide email", 400);

  const user = await User.findOne({ email });

  if (!user) throw new AppError(`No user with email ${email}`, 404);

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host",
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetUrl}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Shop-Co: Reset password ✅",
      message,
    });
  } catch (error) {
    throw new AppError(error, 500);
  }

  return res.status(200).json({
    status: "success",
    message: "Please check your email for reset password",
  });
};
const resetPassword = async (req: Request, res: Response) => {
  const { resetToken } = req.params;
  const { password, passwordConfirm } = req.body;

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) throw new AppError("Token is invalid or has expired", 400);

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetExpires = user.passwordResetToken = undefined;

  await user.save();

  return res.status(200).json({
    status: "success",
    message: "Please go to login page and login",
  });
};
const protect = async (
  req: ICustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.signedCookies.token;

  if (!token) throw new AppError("Authentication failed", 401);

  // @ts-expect-error 23232
  const { id } = await verifyJwt(token);

  const currentUser = await User.findById(id);

  if (!currentUser)
    throw new AppError(
      "The user belonging to this token does no longer exists",
      401,
    );

  req.user = { id: currentUser._id, role: currentUser.role };
  next();
};
const restrictTo = (...roles: string[]) => {
  return (req: ICustomRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role))
      throw new AppError(
        "You do not have permission to perform this action",
        403,
      );

    next();
  };
};
const updatePassword = async (req: ICustomRequest, res: Response) => {
  const { currentPassword, password, passwordConfirm } = req.body;

  const user = await User.findById(req.user.id).select("+password");

  if (!currentPassword)
    throw new AppError("Please provide your current password", 400);

  const isCorrectPassword = await user.comparePassword(
    currentPassword,
    user.password,
  );
  if (!isCorrectPassword)
    throw new AppError("Your current password is wrong", 401);

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
  });
};

export {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
};
