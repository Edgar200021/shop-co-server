import { InferSchemaType, Schema, model } from "mongoose";
import validator from "validator";
export const basketItemSchema = new Schema({
  size: {
    type: String,
    required: [true, "Please choose size"],
    trim: true,
    enum: {
      values: [
        "XX-Small",
        "X-Small",
        "Small",
        "Medium",
        "Large",
        "X-Large",
        "XX-Large",
        "3X-Large",
        "4X-Large",
      ],
      message: "{VALUE} is not supported for size",
    },
  },
  color: {
    type: String,
    required: [true, "Please choose color"],
    validate: [validator.isHexColor, "Color must be in hex format"],
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

basketSchema.pre(/^find/, function (next) {
  //@ts-expect-error need this
  this.populate({
    path: "items.product",
    select: "image title price",
  });

  next();
});

type Basket = InferSchemaType<typeof basketSchema>;

export default model<Basket>("Basket", basketSchema);
