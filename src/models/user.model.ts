import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../startup/config";

export enum UserType {
  ADMIN,
  CUSTOMER,
}

const userSchema: mongoose.Schema = new mongoose.Schema({
  firstName: { type: String, required: true, minLength: 5, maxLength: 50 },
  lastName: { type: String, required: true, minLength: 5, maxLength: 75 },
  email: { type: String, required: true, unique: true, maxLength: 255 },
  password: { type: String, required: true },
  role: { type: UserType, default: UserType.CUSTOMER },
  createdAt: { type: Date, default: Date.now() },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, JWT_SECRET);
};

export const UserModel = mongoose.model("User", userSchema);
