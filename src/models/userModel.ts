import { model, Schema, InferSchemaType } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    validate: [validator.isEmail, "Invalid email"],
  },
  password: {
    type: String,

    required: [true, "Please provide password"],
    validate: [
      validator.isStrongPassword,
      "Come up with a more complex password",
    ],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm password"],

    validate: {
      validator: function (val: string) {
        return this.password === val;
      },
      message: "The passwords don't match",
    },
    select: false,
  },
  passwordToken: String,
  passwordTokenExpireDate: Date,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
