import { useMemo, useState } from "react";
import { type Column, type Task } from "@/feature/tasks/types";
import { ColumnContainer } from "@/feature/tasks/components/ColumnContainer";
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { TaskCard } from "@/feature/tasks/components/TaskCard";

export const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([
    { id: "column1", title: "Todo" },
    { id: "column2", title: "In Progress" },
    { id: "column3", title: "Done" },
  ]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const onDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === "Column") {
      setActiveColumn(e.active.data.current.column);
      return;
    }

    if (e.active.data.current?.type === "Task") {
      setActiveTask(e.active.data.current.task);
      return;
    }
  };
  const onDragEnd = (e: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = e;
    if (!over) return;
    if (active.id === over.id) return;
    setColumns((col) => {
      const activeColIndex = col.findIndex((col) => col.id === active.id);
      const overColIndex = col.findIndex((col) => col.id === over.id);
      return arrayMove(col, activeColIndex, overColIndex);
    });
  };

  const onDragOver = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;
    if (active.id === over.id) return;

    //   I am dropping a task over another task
    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    if (!isActiveTask) return;

    if (isActiveTask && isOverTask) {
      setTasks((tasks: Task[]) => {
        const activeIndex = tasks.findIndex((t) => t.id === active.id);
        const overIndex = tasks.findIndex((t) => t.id === over.id);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    //   I am dropping a task over a column
    const isOverColumn = over.data.current?.type === "Column";

    if (isActiveTask && isOverColumn)
      setTasks((tasks: Task[]) => {
        const activeIndex = tasks.findIndex((t) => t.id === active.id);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        tasks[activeIndex].columnId = over.id;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
  );

  // Tasks
  const [tasks, setTasks] = useState<Task[]>([
    { id: "task1", columnId: "column1", title: "Test Task1" },
    { id: "task2", columnId: "column2", title: "Test Task2" },
    { id: "task3", columnId: "column1", title: "Test Task3" },
    { id: "task4", columnId: "column1", title: "Test Task4" },
    { id: "task5", columnId: "column3", title: "Test Task5" },
    { id: "task6", columnId: "column3", title: "Test Task6" },
  ]);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className="flex w-full items-center justify-center overflow-x-auto overflow-y-hidden px-3">
        <div className="flex gap-4">
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <ColumnContainer
                column={col}
                key={col.id}
                tasks={tasks.filter((task) => task.columnId === col.id)}
              />
            ))}
          </SortableContext>
        </div>
      </div>
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <ColumnContainer
              tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
              column={activeColumn}
            />
          )}
          {activeTask && <TaskCard task={activeTask} />}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};
