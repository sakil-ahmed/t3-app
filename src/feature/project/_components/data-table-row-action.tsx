"use client";
import { type Row } from "@tanstack/react-table";
import { type Project } from "@/feature/project/_components/columns";
import { Button } from "@/components/ui/button";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { DeleteModal } from "@/components/DeleteModal";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const project = row.original as Project;
  const router = useRouter();

  const viewSingleProject = (id: string) => {
    router.push(`/projects/${id}/board`);
  };

  return (
    <div className="flex gap-6">
      <Button
        variant={"outline"}
        className="px-2"
        onClick={() => viewSingleProject(project.id)}
      >
        <GrView size={20} />
      </Button>
      <Button variant={"outline"} className="px-2">
        <FaRegEdit size={20} />
      </Button>
      <DeleteModal />
    </div>
  );
}
