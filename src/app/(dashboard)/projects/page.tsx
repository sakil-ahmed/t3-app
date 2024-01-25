"use client";
import { ProjectCard } from "@/feature/projects/ProjectCard";
import { CreateProject } from "@/feature/projects/CreateProject";
import { api } from "@/trpc/react";
import { LoadingScreen } from "@/app/ProtectedLayout";
import { useSession } from "next-auth/react";

export default function ProjectsPage() {
  const { data: sessionData } = useSession();
  const {
    data: projects,
    isLoading,
    refetch,
  } = api.projects.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  return (
    <>
      <div className="flex w-full items-center justify-between pb-10">
        <h3 className="mt-2 scroll-m-20 text-2xl font-semibold tracking-tight">
          {"The People's Rebellion"}
        </h3>
        <CreateProject />
      </div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {projects?.map((item, index) => (
            <ProjectCard key={index} {...item} />
          ))}
        </div>
      )}
    </>
  );
}
