"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type RouterOutputs } from "@/trpc/shared";
import { format } from "date-fns";
import { DataTableRowActions } from "@/feature/project/_components/data-table-row-action";
import Link from "next/link";

export type Project = RouterOutputs["projects"]["getAll"][0];
export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const project = row.original;
      return (
        <Link
          className="font-bold hover:underline"
          href={`/projects/${project.id}/board`}
        >
          {project.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return <>{date ? <p>{format(date, "PPP")}</p> : ""}</>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "UpdatedAt",
    cell: ({ row }) => {
      const date = row.original.updatedAt;
      return <>{date ? <p>{format(date, "PPP")}</p> : ""}</>;
    },
  },
  {
    accessorKey: "",
    header: "Actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
