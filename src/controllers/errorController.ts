import { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/AppError";
import env from "../utils/validateEnv";

interface ValidationError extends Error {
  errors: {
    [key: string]: { message: string };
  };
}

const handleValidationErrorDB = (err: ValidationError): AppError => {
  const message = `Invalid input data. ${Object.values(err.errors)
    .map((val) => val.message)
    .join(", ")}`;

  return new AppError(message, 400);
};

interface DubplicateError {
  keyValue: Record<string, string>;
}

const handleDuplicateErrorDB = (err: DubplicateError): AppError => {
  const message = `Duplicate field value "${
    Object.values(err.keyValue)[0]
  }". Please use another value!`;

  return new AppError(message, 400);
};

const handleJWTError = (): AppError =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = (): AppError =>
  new AppError("Your token has expired! Please log in again!", 401);

const handleDevelopmentError = (err: AppError, res: Response) => {
  return res.status(500).json({
    err,
    status: "error",
    stack: err.stack,
    message: err.message,
  });
};

const handleProductionError = (err: AppError, res: Response) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Something went wrong!",
  });
};

const errorController = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //  return res.status(500).json({ err });

  if (env.NODE_ENV === "production") handleDevelopmentError(err, res);
  if (env.NODE_ENV === "development") {
    let error = { ...err, name: err.name };
    console.log(error.name);
    if (error.name === "ValidationError")
      //@ts-expect-error for validation errors
      error = handleValidationErrorDB(error);

    //@ts-expect-error for validation errors
    if (error.code === 11000) error = handleDuplicateErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    handleProductionError(error, res);
  }
};
export default errorController;
