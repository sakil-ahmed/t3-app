import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { createUserSchema } from "@/server/api/routers/user/user.type";
import { createUser } from "@/server/api/routers/user/user.service";

export const userRoute = createTRPCRouter({
  create: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ input }) => {
      return createUser(input);
    }),
});
