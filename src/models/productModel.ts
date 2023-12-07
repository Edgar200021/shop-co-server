import { InferSchemaType, model, Schema } from "mongoose";
import validator from "validator";

import Review from "./reviewModel";

const productSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Product must have a title"],
      maxLength: [
        30,
        "A product title name must have less or equal than 20 characters",
      ],
      minLength: [
        4,
        "A product title name must have more or equal than 4 characters",
      ],
    },
    category: {
      type: "String",
      required: [true, "Product must have a category"],
      enum: {
        values: [
          "t-shirt",
          "shorts",
          "shirts",
          "hoodie",
          "jeans",
          "blouse",
          "coat",
          "dress",
          "jacket",
          "leggins",
          "pants",
          "suit",
          "sweater",
          "accessory",
        ],
        message: "{VALUE} is different from t-shirt,shorts,shirts,hoodie,jeans",
      },
    },
    price: {
      type: Number,
      required: [true, "Product must have a price"],
      min: [0, "A tour price must be more than 0$ "],
    },
    priceDiscount: {
      type: Number,
      set: (val: number) => Math.round((val * 10) / 10),
    },
    discount: {
      type: Number,
      min: [1, "A product discount must be more or equal than 1 "],
      max: [99, "A product discount must be less or equal than 99"],
    },
    image: {
      type: String,
      required: [true, "Product must have a image"],
      trim: true,
    },
    color: {
      type: [String],
      required: [true, "Product must have a color"],
      validate: {
        validator: (val: string[]) =>
          val.every(validator.isHexColor) && !!val.length,
        message: "Colors must be in hex format and contains minimum 1 color ",
      },
    },
    size: {
      type: [String],
      required: [true, "Product must have a size"],
      validate: {
        validator: (val: string[]) => !!val.length,
        message: "Product must have a size",
      },
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
    avgRating: {
      type: Number,
      default: 4.5,
      min: [1, "A product avgRating must be more or equal than 1 "],
      max: [5, "A product discount must be less or equal than 5 "],
    },
    ratingQuantity: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
});

productSchema.pre("save", function (next) {
  if (this.isNew && this.discount) {
    this.priceDiscount = this.price * (1 - this.discount / 100);
  }

  next();
});
productSchema.pre("findOneAndUpdate", async function (next) {
  // @ts-expect-error i need this ts enable,believe me :D
  if (!this.getUpdate().price && !this.getUpdate().discount) return next();
  const doc = await this.model.findOne(this.getQuery());
  // @ts-expect-error i need this ts enable,believe me :D
  const price = this.getUpdate().price || doc.price;
  // @ts-expect-error i need this ts enable,believe me :D
  const discount = this.getUpdate().discount || doc.discount;

  if (!discount) return next();
  this.updateOne({
    priceDiscount: price * (1 - discount / 100),
    discount,
  });

  next();
});
productSchema.pre("findOne", function (next) {
  this.select("-__v");
  this.populate({ path: "reviews", select: "-__v" });
  next();
});

productSchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.find(this.getQuery());

  await Review.deleteMany({ product: doc[0]._id });

  next();
});

type Product = InferSchemaType<typeof productSchema>;

export default model<Product>("Product", productSchema);
