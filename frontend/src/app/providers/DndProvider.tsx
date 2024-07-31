import { createContext, useContext, useState } from "react";
import { TaskProps } from "../_components/Task";
import { useTask } from "./TaskProvider";
import { ColumnStatus } from "./TaskProvider/type";
import api from "../_utils/api/axios";
import { DndContext } from "@dnd-kit/core";

interface DnDContextType {
  isDragging: boolean;
  draggedOverColumn: ColumnStatus | null;
  handleDragStart: (e: React.DragEvent, task: TaskProps) => void;
  handleDragOver: (e: React.DragEvent, columnStatus: ColumnStatus) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDrop: (
    e: React.DragEvent,
    containerStatus: ColumnStatus
  ) => Promise<void>;
}
const DnDContext = createContext<DnDContextType | undefined>(undefined);
export const DnDProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { columns, setColumns } = useTask();
  const [loading, setLoading] = useState(false);
  const [draggedOverColumn, setDraggedOverColumn] =
    useState<ColumnStatus | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const handleDragStart = (e: React.DragEvent, task: TaskProps) => {
    console.log(task._id);
    setIsDragging(true);
    e.dataTransfer.setData("taskId", task._id);
    if (e.target instanceof HTMLElement) {
      e.target.classList.add("task-dragging");
    }
  };
  const handleDragOver = (e: React.DragEvent, columnStatus: ColumnStatus) => {
    e.preventDefault();
    setDraggedOverColumn(columnStatus);
  };

  const handleDragLeave = () => {
    setDraggedOverColumn(null);
  };

  const handleDrop = async (
    e: React.DragEvent,
    containerStatus: ColumnStatus
  ) => {
    const taskId = e.dataTransfer.getData("taskId");

    const task = columns
      .flatMap((col) => col.tasks)
      .find((t) => t._id === taskId);

    if (task) {
      if (task.status === containerStatus) return;
      try {
        setLoading(true);
        const updatedTask = { ...task, status: containerStatus };
        await api.put(`/task/${taskId}`, updatedTask);
        setColumns(
          columns.map((column) => ({
            ...column,
            tasks:
              column.status === containerStatus
                ? [...column.tasks, updatedTask]
                : column.tasks.filter((t) => t._id !== taskId),
          }))
        );
      } catch (error) {
        console.error("Error moving task:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <DnDContext.Provider
      value={{
        handleDragOver,
        handleDragLeave,
        draggedOverColumn,
        isDragging,
        handleDragStart,
        handleDrop,
      }}
    >
      {children}
    </DnDContext.Provider>
  );
};

export const useDnD = () => {
  const context = useContext(DnDContext);
  if (context === undefined) {
    throw new Error("useDnD must be used within a DnDProvider");
  }
  return context;
};
