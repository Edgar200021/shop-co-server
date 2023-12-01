import { NextFunction, Request, Response } from "express";

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
const forgotPassword = async (req: Request, res: Response) => {};
const resetPassword = async (req: Request, res: Response) => {};

const protect = async (
  req: ICustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.signedCookies.token;

  if (!token) throw new AppError("Authentication failed", 401);

  //@ts-expect-error expec
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

export {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  protect,
  restrictTo,
};
