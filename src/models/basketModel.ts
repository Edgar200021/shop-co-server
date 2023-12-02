import { InferSchemaType, Schema, model } from "mongoose";

export const basketItemSchema = new Schema({
  size: {
    type: String,
    required: [true, "Please choose size"],
    trim: true,
  },
  color: {
    type: String,
    required: [true, "Please choose color"],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, "Please select quantity"],
  },
  product: { type: Schema.ObjectId, ref: "Product" },
});

const basketSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
      unique: true,
    },
    items: [basketItemSchema],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

type Basket = InferSchemaType<typeof basketSchema>;

export default model<Basket>("Basket", basketSchema);
