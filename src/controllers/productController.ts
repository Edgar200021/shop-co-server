import { Request, Response } from "express";
import Product from "../models/productModel";
import { AppError } from "../utils/AppError";

const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find();

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

  return res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
};

const createProduct = async (req: Request, res: Response) => {
  const { title, price, image, colors } = req.body;

  const product = await Product.create({ title, price, image, colors });

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

export {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
