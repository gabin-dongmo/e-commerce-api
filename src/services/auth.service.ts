import { CreateUserInput } from "../common/dtos";
import { UserModel } from "../models/user.model";

const registerService = async (input: CreateUserInput) =>
  await UserModel.create(input);

const findByEmail = (email: string) => {
  return UserModel.findOne({ email });
};

const findUserById = (id: any) => {
  return UserModel.findById({ _id: id });
};

export default { registerService, findByEmail, findUserById };
