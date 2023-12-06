import { InferSchemaType, Schema, Types, model } from "mongoose";
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
    quantity: Number,
    totalPrice: Number,
    totalDiscountedPrice: Number,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

type Basket = InferSchemaType<typeof basketSchema>;

type ExtendedBasket = Basket & { _id: Types.ObjectId };

basketSchema.statics.calcTotalPrice = async function (
  basketInstance: ExtendedBasket,
) {
  const total = await this.aggregate([
    {
      $match: {
        _id: basketInstance._id,
      },
    },
    {
      $unwind: {
        path: "$items",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "items.product",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: {
        path: "$product",
      },
    },
    {
      $group: {
        _id: null,
        quantity: { $sum: "$items.quantity" },
        totalPrice: {
          $sum: { $multiply: ["$items.quantity", "$items.price"] },
        },
        totalDiscountedPrice: {
          $sum: {
            $multiply: [
              "$items.quantity",
              {
                $cond: {
                  if: { $gt: ["$product.priceDiscount", 0] },
                  then: "$product.priceDiscount",
                  else: "$product.price",
                },
              },
            ],
          },
        },
      },
    },
  ]);

  if (total && total.length > 0) {
    basketInstance.quantity = total[0].quantity;
    basketInstance.totalDiscountedPrice = total[0].totalDiscountedPrice;
    basketInstance.totalPrice = total[0].totalPrice;
  } else {
    basketInstance.quantity = 0;
    basketInstance.totalDiscountedPrice = 0;
    basketInstance.totalPrice = 0;
  }

  if (
    //@ts-expect-error sds
    basketInstance.isModified("quantity") ||
    //@ts-expect-error sds
    basketInstance.isModified("totalPrice")
  ) {
    //@ts-expect-error sds
    await basketInstance.save();
  }
};

basketSchema.pre(/^find/, function (next) {
  //@ts-expect-error need this
  this.populate({
    path: "items.product",
    select: "image title price",
  });

  next();
});

basketSchema.post("save", async function (doc) {
  //@ts-expect-error sdsd
  await this.constructor.calcTotalPrice(doc);
});
export default model<Basket>("Basket", basketSchema);
