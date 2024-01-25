import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "Name must have at least 3 character(s)"),
  email: z
    .string()
    .email("email must be a valid email")
    .min(1, "EMail should not be empty"),
  password: z.string().min(6, "Password must be at least 6 character"),
});

export type createUserDto = z.infer<typeof createUserSchema>;
