import jwt from "jsonwebtoken";
import { Response } from "express";
import env from "./validateEnv";
import { Types } from "mongoose";

const createJwt = (payload: Record<string, string | Types.ObjectId>) =>
  jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_LIFETIME,
  });

const attachCookieToResponse = (
  res: Response,
  payload: Record<string, string | Types.ObjectId>,
): void => {
  const token = createJwt(payload);

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    secure: env.NODE_ENV === "development",
    signed: true,
  });
};

const verifyJwt = async (token: string) => jwt.verify(token, env.JWT_SECRET);

export { createJwt, attachCookieToResponse, verifyJwt };
