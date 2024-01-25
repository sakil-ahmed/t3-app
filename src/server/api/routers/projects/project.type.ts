import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(1, "Title Should not be empty"),
  description: z.string().min(1, "Description Should not be empty"),
});
export type createProjectDto = z.infer<typeof createProjectSchema>;
