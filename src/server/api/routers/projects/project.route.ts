import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createProjectSchema } from "@/server/api/routers/projects/project.type";
import { createProject } from "@/server/api/routers/projects/project.service";

export const projectRoute = createTRPCRouter({
  create: protectedProcedure
    .input(createProjectSchema)
    .mutation(async ({ ctx, input }) => {
      return createProject(ctx.session.user.id, input);
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.projects.findMany({
      where: {
        createdBy: ctx.session.user.id,
      },
    });
  }),
});
