import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export const errorController = (
  error: unknown,
  req: Request,
  res: Response,
) => {
  let message = "Something went wrong!",
    statusCode = 500;

	console.log(statusCode)

  if (error instanceof ApiError) {
    message = error.message;
    statusCode = error.statusCode;
  }

  return res.status(statusCode).json({
    status: "fail",
    message,
  });
};
