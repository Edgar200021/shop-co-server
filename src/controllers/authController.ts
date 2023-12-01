import { Request, Response } from "express";
import User from "../models/userModel";

const signup = async (req: Request, res: Response) => {
  const { name, email, password, passwordConfirm } = req.body;

  const user = await User.create({ name, email, password, passwordConfirm });

  return res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
};
const login = async (req: Request, res: Response) => {};
const forgotPassword = async (req: Request, res: Response) => {};
const resetPassword = async (req: Request, res: Response) => {};

export { signup, login, forgotPassword, resetPassword };
