import { z } from "zod";

export type LoginUserDto = {
  email: string;
  password: string;
};

export function validateUserLogin(dto: LoginUserDto) {
  const schema = z.object({
    email: z.string().min(1),
    password: z.string().min(1),
  });

  return schema.safeParse(dto);
}
