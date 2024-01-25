import { postRouter } from "@/server/api/routers/post";
import { createTRPCRouter } from "@/server/api/trpc";
import { userRoute } from "@/server/api/routers/user/user.route";
import { projectRoute } from "@/server/api/routers/projects/project.route";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  users: userRoute,
  projects: projectRoute,
});

// export type definition of API
export type AppRouter = typeof appRouter;
