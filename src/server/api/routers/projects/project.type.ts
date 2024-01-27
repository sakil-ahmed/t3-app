import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1, "Name Should not be empty"),
});
export type createProjectDto = z.infer<typeof createProjectSchema>;
