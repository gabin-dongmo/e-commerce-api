import { CreateOrderInput } from "../../common/dtos";
import { OrderModel } from "../models/order.model";

const create = async (input: CreateOrderInput) => {
  return await OrderModel.create(input);
};

const deleteById = async (id: any) => {
  return await OrderModel.deleteOne({ _id: id });
};

const findById = async (id: any) => {
  return await OrderModel.findOne({ _id: id });
};

const findAll = async () => {
  return await OrderModel.find();
};

const update = async (id: any, data: any) => {
  if (data !== null) {
    return await OrderModel.findOneAndUpdate({ _id: id }, data);
  }
  return await OrderModel.findOne({ _id: id });
};

export default {
  create,
  deleteById,
  findById,
  findAll,
  update,
};
