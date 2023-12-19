import { z } from "zod";
import { UserRole } from "../models/user.model";

type CreateUserDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: UserRole;
};

export function validateUserCreation(dto: CreateUserDto) {
  const schema = z.object({
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(75),
    email: z.string().email().max(255),
    password: z.string().min(1),
  });

  return schema.safeParse(dto);
}
