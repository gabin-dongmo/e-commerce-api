import { z } from "zod";
import { UserRole } from "../models/user.model";

export type CreateUserDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: UserRole;
};

export function validateUser(dto: CreateUserDto) {
  const schema = z.object({
    firstName: z.string().max(50),
    lastName: z.string().max(75),
    email: z.string().email().max(255),
    password: z.string(),
  });

  return schema.safeParse(dto);
}
