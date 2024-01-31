import { type Row } from "@tanstack/react-table";
import { type Project } from "@/feature/project/_components/columns";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const project = row.original as Project;

  return (
    <div className="flex justify-center gap-2">
      <p>{project.name.slice(0, 4)}</p>
      <p>{project.name.slice(0, 4)}</p>
      <p>{project.name.slice(0, 4)}</p>
    </div>
  );
}
