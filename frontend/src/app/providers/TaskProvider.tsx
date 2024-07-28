"use client";
import React, { createContext, ReactNode, useState } from "react";
import { TaskProps } from "../_components/Task";
import { stat } from "fs";

interface Column {
  status: "todo" | "progress" | "review" | "completed";
  tasks: TaskProps[];
  handleAddTask: (containerStatus: string) => Promise<void>;
  handleEditTask: (task: TaskProps) => Promise<void>;
  handleDeleteTask: (taskId: string) => Promise<void>;
  handleDragStart: (e: React.DragEvent) => Promise<void>;
  handleDragOver: (e: React.DragEvent) => Promise<void>;
  handleDrop: (e: React.DragEvent, containerStatus: string) => Promise<void>;
}

const ColumnContext = createContext<Column>({
  status: "todo",
  tasks: [],
  handleAddTask: () => Promise.resolve(),
  handleEditTask: () => Promise.resolve(),
  handleDeleteTask: () => Promise.resolve(),
  handleDragStart: () => Promise.resolve(),
  handleDragOver: () => Promise.resolve(),
  handleDrop: () => Promise.resolve(),
});

export const ColumnProvider: React.FC<ReactNode> = (children) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [status, setStaus] = useState<
    "todo" | "progress" | "review" | "completed"
  >("todo");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = async (containerStatus: string) => {};
  const handleEditTask = async (task: TaskProps) => {};
  const handleDeleteTask = async (taskId: string) => {};
  const handleDragStart = async (e: React.DragEvent) => {};
  const handleDragOver = async (e: React.DragEvent) => {};
  const handleDrop = async (e: React.DragEvent, containerStatus: string) => {};

  return (
    <ColumnContext.Provider
      value={{
        status,
        tasks,
        handleAddTask,
        handleEditTask,
        handleDeleteTask,
        handleDragOver,
        handleDragStart,
        handleDrop,
      }}
    >
      {children}
    </ColumnContext.Provider>
  );
};
