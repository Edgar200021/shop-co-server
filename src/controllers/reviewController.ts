import mongoose, { isValidObjectId } from "mongoose";
import { Request, Response, RequestHandler, NextFunction } from "express";

import Review from "../models/reviewModel";

import { AppError } from "./../utils/AppError";
import { APIFeatures } from "./../utils/ApiFeatures";
import { IGetAllReviews } from "../types/query";
import { ICustomRequest } from "../types/index";

const checkProductId = (req: Request, res: Response, next: NextFunction) => {
  if (!isValidObjectId(new mongoose.Types.ObjectId(req.params.productId)))
    throw new AppError("Invalid product id", 400);

  next();
};

const getAllReviews: RequestHandler<
  { productId: string },
  unknown,
  unknown,
  IGetAllReviews
> = async (req, res: Response) => {
  if (!req.params.productId)
    throw new AppError("Please provide product id", 400);

  console.log("logger");
  const reviewFeature = new APIFeatures(
    Review.find({
      product: new mongoose.Types.ObjectId(req.params.productId),
    }).select("-product"),
    req.query,
  )
    .filter()
    .limitFields()
    .sort()
    .paginate();

  const reviews = await reviewFeature.query;
  const totalResultsAfterFiltering = await Review.countDocuments(
    reviewFeature._filterObj,
  );

  return res.status(200).json({
    status: "success",
    results: totalResultsAfterFiltering,
    data: {
      reviews,
    },
  });
};

const getReview = async (req: Request, res: Response) => {
  const review = await Review.findById(req.params.productId);

  if (!review)
    throw new AppError(`No review with id ${req.params.productId}`, 404);

  return res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
};

const getMyReview = async (req: ICustomRequest, res: Response) => {
  const review = await Review.find({
    user: req.user.id,
    product: new mongoose.Types.ObjectId(req.params.productId),
  });

  if (!review)
    throw new AppError(`No review with id ${req.params.productId}`, 404);

  return res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
};

const createReview = async (req: ICustomRequest, res: Response) => {
  console.log(req.params.productId);
  const review = await Review.create({
    product: new mongoose.Types.ObjectId(req.params.productId),
    user: req.user.id,
    rating: req.body.rating,
    review: req.body.review,
  });

  return res.status(201).json({
    status: "success",
    data: {
      review,
    },
  });
};

const setUserIdToBody = (
  req: ICustomRequest,
  res: Response,
  next: NextFunction,
) => {
  req.body.userId = req.user.id;

  next();
};

const updateReview = async (req: Request, res: Response) => {
  if (!req.body.userId) throw new AppError("Please provide user id", 400);

  const review = await Review.findOneAndUpdate(
    {
      product: new mongoose.Types.ObjectId(req.params.productId),
      user: req.body.userId,
    },
    req.body,
    { new: true, runValidators: true },
  );

  if (!review) throw new AppError(`No review with user id ${req.body.id}`, 404);

  return res.status(200).json({
    status: "success",
    data: { review },
  });
};

const deleteReview = async (req: Request, res: Response) => {
  if (!req.body.userId) throw new AppError("Please provide user iD", 400);

  const review = await Review.findOneAndDelete({
    product: new mongoose.Types.ObjectId(req.params.productId),
    user: req.body.userId,
  });

  if (!review) throw new AppError(`No review with user id ${req.body.id}`, 404);

  return res.status(204).json({
    status: "success",
    data: null,
  });
};

export {
  getAllReviews,
  getReview,
  getMyReview,
  createReview,
  updateReview,
  deleteReview,
  setUserIdToBody,
  checkProductId,
};
