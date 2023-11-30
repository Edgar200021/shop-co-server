import { Request, Response } from "express";
import Product from "../models/productModel";

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
  return res.status(200).json({ status: "success", message: "GetProduct" });
};
const createProduct = async (req: Request, res: Response) => {
  const { title, price, image, colors } = req.body;

  console.log(title, price, image);
  const product = await Product.create({ title, price, image, colors });

  return res.status(201).json({ status: "success", data: {
	product
  }});
};
const updateProduct = async (req: Request, res: Response) => {
  return res.status(200).json({ status: "success", message: "UpdateProduct" });
};
const deleteProduct = async (req: Request, res: Response) => {
  return res.status(204).json({ status: "success", data: null });
};

export {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
