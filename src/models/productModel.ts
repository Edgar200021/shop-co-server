import { InferSchemaType, model, Schema } from "mongoose";
import validator from "validator";
const productSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Product must have a title"],
    maxLength: [
      20,
      "A product title name must have less or equal than 20 characters",
    ],
    minLength: [
      4,
      "A product title name must have more or equal than 4 characters",
    ],
  },
  price: {
    type: Number,
    required: [true, "Product must have a price"],
    min: [0, "A tour price must be more than 0$ "],
  },
  priceDiscount: Number,
  discount: {
    type: Number,
    min: [1, "A product discount must be more or equal than 1 "],
    max: [99, "A product discount must be less or equal than 99"],
  },
  image: {
    type: String,
    required: [true, "Product must have a image"],
  },
  colors: {
    type: [String],
    required: [true, "Product must have a color"],
    validate: {
      validator: (val: string[]) => val.every(validator.isHexColor) && !!val.length,
      message: "Colors must be in hex format and contains minimum 1 color ",
    },
  },
});

//maxLength: [40, 'A tour name must have less or equal than 40 characters'],
//minLength: [10, 'A tour name must have more or equal than 40 characters'],

type Product = InferSchemaType<typeof productSchema>;

export default model<Product>("Product", productSchema);
