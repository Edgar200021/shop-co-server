import { Model, model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";

interface IUser {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  role: "admin" | "user";
}
interface IUserMethods {
  comparePassword: (
    candidatePassword: string,
    password: string,
  ) => Promise<boolean>;
  createPasswordResetToken: () => void;
}

type UserModel = Model<IUser, object, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: {
    type: String,
    required: [true, "Please provide name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    validate: [validator.isEmail, "Invalid email"],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    validate: [
      validator.isStrongPassword,
      "Come up with a more complex password",
    ],
    trim: true,
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
    trim: true,
    select: false,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
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

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
  password: string,
) {
  return await bcrypt.compare(candidatePassword, password);
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

  return resetToken;
};

export default model<IUser, UserModel>("User", userSchema);
