import { type Column, type Task } from "@/feature/tasks/types";
import { type FC, useMemo } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskCard } from "@/feature/tasks/components/TaskCard";

interface Props {
  column: Column;
  tasks: Task[];
}
export const ColumnContainer: FC<Props> = ({ column, tasks }) => {
  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md border border-red-500 bg-white"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md border bg-white"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab border-b px-2 py-4 font-bold"
      >
        {column.title}
      </div>
      {/*  Task container*/}
      <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
        <SortableContext items={tasksIds}>
          {tasks?.map((task) => <TaskCard key={task.id} task={task} />)}
        </SortableContext>
      </div>
    </div>
  );
};
