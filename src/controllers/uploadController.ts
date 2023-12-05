import { Request, Response } from "express";
import { cloudinary } from "../utils/cloudinary";
import fs from "fs";

const uploadProductImage = async (req: Request, res: Response) => {
  const result = await cloudinary.uploader.upload(req.file.path, {
    use_filename: true,
    folder: "shop-co",
  });

  fs.unlinkSync(req.file.path);

  return res.status(200).json({
    status: "success",
    data: {
      image: result.secure_url,
    },
  });
};

export { uploadProductImage };
