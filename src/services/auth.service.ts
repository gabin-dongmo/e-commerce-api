import { User } from "../models/user.model";

const findByEmail = (email: string) => {
  return User.findOne({ email });
};

const findUserById = (id: any) => {
  return User.findById({ _id: id });
};

export default { findByEmail, findUserById };
