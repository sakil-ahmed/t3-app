"use client";
import { columns } from "@/feature/project/_components/columns";
import { DataTable } from "@/feature/project/_components/data-table";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";

export const ProjectTable = () => {
  const { data: sessionData = [] } = useSession();
  const { data: projects } = api.projects.getAll.useQuery(undefined, {
    enabled: sessionData !== undefined,
  });

  return (
    <>{projects ? <DataTable columns={columns} data={projects} /> : null}</>
  );
};
