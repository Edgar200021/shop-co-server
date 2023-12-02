import { AppError } from "./../utils/AppError";
import { NextFunction, RequestHandler } from "express";
import { Request, Response } from "express";

import User from "../models/userModel";
import { APIFeatures } from "./../utils/ApiFeatures";
import { IGetAllUsersQuery } from "../types/query";
import { ICustomRequest } from "../types";

const filterBody = (
  obj: Record<string, string>,
  ...allowedFields: string[]
): Record<string, string> => {
  return Object.keys(obj).reduce((acc, el) => {
    if (allowedFields.includes(el)) {
      acc[el] = obj[el];
    }
    return acc;
  }, {});
};

const getAllUsers: RequestHandler<
  unknown,
  unknown,
  unknown,
  IGetAllUsersQuery
> = async (req, res: Response) => {
  const usersFeature = new APIFeatures(
    User.find().select("-password"),
    req.query,
  )
    .filter()
    .limitFields()
    .sort()
    .paginate();

  const users = await usersFeature.query;

  return res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
};

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password");

  if (!user) throw new AppError(`No user with id ${id}`, 404);

  return res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

const setIdToParams = (
  req: ICustomRequest,
  res: Response,
  next: NextFunction,
) => {
  req.params.id = req.user.id.toString();

  next();
};

const deleteUser = async (req: ICustomRequest, res: Response) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) throw new AppError(`No user with id ${id}`, 404);

  return res.status(204).json({
    status: "success",
    data: null,
  });
};

const updateUser = async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user)
    throw new AppError(`There are no user with id ${req.params.id}`, 404);

  return res.status(200).json({
    status: "success",
    data: { user },
  });
};

const updateMe = async (req: ICustomRequest, res: Response) => {
  if (req.body.password || req.body.passwordConfirm)
    throw new AppError(
      "This route is not for password updates. Please use /updateMyPassword",
      400,
    );

  const filteredBody = filterBody(req.body, "name", "email");

  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

export {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  updateMe,
  setIdToParams,
};
