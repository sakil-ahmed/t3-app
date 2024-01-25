import { type createProjectDto } from "@/server/api/routers/projects/project.type";
import { db } from "@/server/db";

export const createProject = async (
  userId: string,
  input: createProjectDto,
) => {
  return db.projects.create({
    data: { ...input, createdBy: userId },
  });
};
