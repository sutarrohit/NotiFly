import { z, ZodType } from "zod";

export const CreateUserInput = z.object({
  userName: z.string().min(4).max(50),
  name: z.string().min(4).max(50),
  email: z.string().email().min(4),
  password: z.string().min(4),
});

export const LoginUserInput = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(1000),
});
