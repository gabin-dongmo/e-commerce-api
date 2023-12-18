import { CreateUserInput } from "../../common/dtos";
import { UserModel } from "../models/user.model";

const registerService = async (input: CreateUserInput) => {
  return await UserModel.create(input);
};

const findByEmail = async (email: string) => {
  return await UserModel.findOne({ email });
};

const findUserById = async (id: any) => {
  return await UserModel.findById({ _id: id });
};

export default { registerService, findByEmail, findUserById };
