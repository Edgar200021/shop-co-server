import { IGetAllProductsQuery } from "./../types";
import { Request, RequestHandler, Response } from "express";

import Product from "../models/productModel";

import { AppError } from "../utils/AppError";
import { APIFeatures } from "../utils/ApiFeatures";

const getAllProducts: RequestHandler<
  unknown,
  unknown,
  unknown,
  IGetAllProductsQuery
> = async (req, res) => {
  const productsFeature = new APIFeatures<IGetAllProductsQuery>(
    Product.find(),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await productsFeature.query;

  return res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
};

const getProduct = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError(`There are no product with id ${req.params.id}`, 404);
  }

  console.log(product);
  return res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
};

const createProduct = async (req: Request, res: Response) => {
  const { title, price, image, color, discount, size, category, description } =
    req.body;

  const product = await Product.create({
    title,
    price,
    image,
    color,
    discount,
    size,
    category,
    description,
  });

  return res.status(201).json({
    status: "success",
    data: {
      product,
    },
  });
};

const updateProduct = async (req: Request, res: Response) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new AppError(`There are no product with id ${req.params.id}`, 404);
  }

  return res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
};

const deleteProduct = async (req: Request, res: Response) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    throw new AppError(`There are no product with id ${req.params.id}`, 404);
  }

  return res.status(204).json({ status: "success", data: null });
};

const getProductFilters = async (req: Request, res: Response) => {
  const result = await Product.aggregate([
    { $unwind: "$color" },
    { $unwind: "$size" },
    {
      $group: {
        _id: null,
        minPrice: {
          $min: "$price",
        },
        maxPrice: {
          $max: "$price",
        },
        colors: {
          $addToSet: "$color",
        },
        size: {
          $addToSet: "$size",
        },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      filters: result,
    },
  });
};

export {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductFilters,
};
