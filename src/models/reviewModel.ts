import { InferSchemaType, Schema, Types, model } from "mongoose";
import Product from "./productModel";

const reviewSchema = new Schema({
  review: {
    type: String,
    required: [true, "Review can not be empty!"],
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, "Review must have a rating"],
    min: [1, "A review rating must be more or equal than 1"],
    max: [5, "A review rating must be less or equal than 5"],
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: [true, "Review must belong to a user"],
  },
  product: {
    type: Schema.ObjectId,
    ref: "Product",
    required: [true, "Review must belong to a product"],
  },
});

reviewSchema.index({ user: 1, product: 1 }, { unique: true });

reviewSchema.statics.calcAverageRatings = async function (
  product: Types.ObjectId,
) {
  const stats = await this.aggregate([
    {
      $match: { product },
    },
    {
      $group: {
        _id: "$product",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  console.log(stats);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(product, {
      ratingQuantity: stats[0].nRating,
      avgRating: stats[0].avgRating,
    });
  } else {
    await Product.findByIdAndUpdate(product, {
      ratingQuantity: 0,
      avgRating: 4.5,
    });
  }
};

reviewSchema.pre(/^find/, function (next) {
  //@ts-expect-error i need this
  this.populate({ path: "user", select: "name email" });

  next();
});

reviewSchema.post("save", async function () {
  //@ts-expect-error i need this
  await this.constructor.calcAverageRatings(this.product);
});

reviewSchema.post(/^findOneAnd/, async function () {
  // @ts-expect-error i need this ts enable,believe me :D
  const doc = await this.model.findOne(this.getQuery());

  await doc.constructor.calcAverageRatings(doc.product);
});

type Review = InferSchemaType<typeof reviewSchema>;

export default model<Review>("Review", reviewSchema);
