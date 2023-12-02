import mongoose from "mongoose";
import { Response, RequestHandler } from "express";

import Basket from "../models/basketModel";
import Product from "../models/productModel";

import { APIFeatures } from "./../utils/ApiFeatures";
import { AppError } from "../utils/AppError";
import { ICustomRequest } from "../types/index";
import { IQuery } from "../types/query";

const getAllBasketProducts: RequestHandler<
  unknown,
  unknown,
  unknown,
  Pick<IQuery, "limit" | "page">
> = async (req, res: Response) => {
  const userId = (req as unknown as ICustomRequest).user.id;

  const basketFeature = new APIFeatures(
    Basket.findOne({ user: new mongoose.Types.ObjectId(userId) }),
    req.query,
  ).paginate();

  const basketProducts = await basketFeature.query;

  return res.status(200).json({
    status: "success",
    results: basketProducts.items?.length,
    data: {
      basketProducts: basketProducts.items,
    },
  });
};

const createBasketProduct = async (req: ICustomRequest, res: Response) => {
  const { size, color, quantity, productId } = req.body;

  const product = await Product.findById(productId);

  if (!product) throw new AppError(`No product with id ${productId}`, 404);

  const basket = await Basket.findOne({ user: req.user.id });

  if (!basket)
    throw new AppError("Something went wrong. Try again later!", 500);

  const isBasketProductExist = basket.items.some(
    (item) =>
      item.product._id?.toString() === productId &&
      item.color === color &&
      item.size === size,
  );

  if (isBasketProductExist) {
    const item = basket.items.find(
      (item) =>
        item.product._id?.toString() === productId &&
        item.color === color &&
        item.size === size,
    );
    item!.quantity = item!.quantity + quantity;
  } else {
    basket.items.push({ color, size, quantity, product: productId });
  }

  await basket.save();

  return res.status(200).json({
    status: "success",
    results: basket.items.length,
    data: {
      basketProducts: basket.items,
    },
  });
};
const deleteBasketProduct = async (req: ICustomRequest, res: Response) => {
  const { id } = req.params;

  const basket = await Basket.findOne({ user: req.user.id });

  if (!basket)
    throw new AppError("Something went wrong. Try again later!", 500);

  // @ts-expect-error need this

  basket.items = basket.items.filter((item) => item._id?.toString() !== id);

  await basket.save({ validateBeforeSave: false });

  return res.status(204).json({
    status: "success",
    data: null,
  });
};
const updateBasketProduct = async (req: ICustomRequest, res: Response) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const basket = await Basket.findOne({ user: req.user.id });

  if (!basket)
    throw new AppError("Something went wrong. Try again later!", 500);

  // @ts-expect-error need this
  basket.items = basket.items.map((item) =>
    item._id?.toString() === id
      ? { ...item, quantity: item.quantity + quantity }
      : item,
  );

  await basket.save();

  return res.status(200).json({
    status: "success",
    data: {
      basketProducts: basket.items,
    },
  });
};

export {
  getAllBasketProducts,
  createBasketProduct,
  deleteBasketProduct,
  updateBasketProduct,
};
