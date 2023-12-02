import { Types } from "mongoose";
import { IGetAllProductsQuery } from "./query";
import { Request } from "express";

interface ICustomRequest extends Request {
  user: {
    id: Types.ObjectId;
    role: "admin" | "user";
  };
}

export { IGetAllProductsQuery, ICustomRequest };
