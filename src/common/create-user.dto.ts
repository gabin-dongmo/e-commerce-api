import { z } from "zod";
import { UserType } from "../models/user.model";

export type CreateUserDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserType;
};

export function validate(dto: CreateUserDto) {
  const schema = z.object({
    firstName: z.string().min(5).max(50),
    lastName: z.string().min(5).max(75),
    email: z.string().email().max(255),
    password: z.string(),
  });

  return schema.safeParse(dto);
}
