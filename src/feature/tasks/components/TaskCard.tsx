import { type Task } from "@/feature/tasks/types";
import { type FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
}
export const TaskCard: FC<Props> = ({ task }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
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
        {...attributes}
        {...listeners}
        style={style}
        className="flex h-[100px] cursor-grab items-center border bg-white p-2 text-center"
      ></div>
    );
  }
  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="flex h-[100px] cursor-grab items-center border bg-white p-2 text-center"
      >
        {task.title}
      </div>
    </>
  );
};
