import { Model, model, Schema, InferSchemaType } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

interface IUser {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  passwordToken?: string;
  passwordTokenExpireDate?: Date;
  role: "admin" | "user";
}
interface IUserMethods {
  comparePassword(
    candidatePassword: string,
    password: string,
  ): Promise<boolean>;
}

type UserModel = Model<IUser, object, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
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

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
  password: string,
) {
  return await bcrypt.compare(candidatePassword, password);
};

export default model<IUser, UserModel>("User", userSchema);
