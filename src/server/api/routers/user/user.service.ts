import { type createUserDto } from "@/server/api/routers/user/user.type";
import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";

export const createUser = async (input: createUserDto) => {
  const userIsExists = await db.user.findUnique({
    where: {
      email: input.email,
    },
  });

  if (userIsExists) {
    throw new TRPCError({
      code: "CONFLICT",
      message: "Email already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);

  return db.user.create({
    data: {
      ...input,
      password: hashedPassword,
    },
  });
};
