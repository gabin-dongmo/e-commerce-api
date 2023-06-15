import { CreateCartInput } from "../../shared/types/models";
import { CartModel } from "../models/cart.model";

const createCartService = async (input: CreateCartInput) => {
  return await CartModel.create(input);
};

const deleteCartService = async (id: any) => {
  return await CartModel.deleteOne({ _id: id });
};

const findOneCartService = async (id: any) => {
  return await CartModel.findOne({ _id: id });
};

const findAllCartService = async () => {
  return await CartModel.find();
};

export default {
  createCartService,
  deleteCartService,
  findAllCartService,
  findOneCartService,
};