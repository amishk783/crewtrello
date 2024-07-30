"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { TaskProps } from "../../_components/Task";

import api from "../../_utils/api/axios";

import { ColumnStatus, ColumnType } from "./type";
import { ExtendedFormData } from "@/app/_components/CreateTask/type";
import { useAuth } from "../AuthProvider";

interface ColumnContextType {
  columns: ColumnType[];

  loading: boolean;
  handleAddTask: (formData: ExtendedFormData) => Promise<void>;
  handleEditTask: (task: TaskProps) => Promise<void>;
  handleDeleteTask: (taskId: string) => Promise<void>;
  handleDragStart: (e: React.DragEvent, task: TaskProps) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (
    e: React.DragEvent,
    containerStatus: ColumnStatus
  ) => Promise<void>;
}
const ColumnContext = createContext<ColumnContextType | undefined>(undefined);

export const ColumnProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [columns, setColumns] = useState<ColumnType[]>([
    { status: "To Do", tasks: [] },
    { status: "In Progress", tasks: [] },
    { status: "Under Review", tasks: [] },
    { status: "Completed", tasks: [] },
  ]);

  const [loading, setLoading] = useState(false);
  const { session } = useAuth();

  useEffect(() => {
    if (session) fetchTasks();
  }, [session]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const accessToken = session ? session.accessToken : "";
      console.log(accessToken);
      const response = await api.get("/task/", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(session, response.data);
      const tasks: TaskProps[] = response.data || [];
      console.log("tasks", tasks);
      console.log("before", columns);
      setColumns(
        columns.map((column) => ({
          ...column,
          tasks: tasks.filter((task) => task.status === column.status),
        }))
      );
      console.log("after", columns);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (data: ExtendedFormData) => {
    try {
      setLoading(true);
      console.log(data);
      let { title, status, description, priority, deadline } = data;
      const payload = {
        title,
        status,
        ...(description && { description }),
        ...(priority && { priority }),
        ...(deadline && { deadline }),
      };
      const response = await api.post("/task/", payload);

      const newTask: TaskProps = response.data.savedTask;
      console.log("🚀 ~ handleAddTask ~ newTask:", newTask);

      setColumns((prevColumns) =>
        prevColumns.map((column) =>
          column.status === newTask.status
            ? {
                ...column,
                tasks: [...column.tasks, { ...newTask }],
              }
            : column
        )
      );
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleEditTask = async (updatedTask: TaskProps) => {
    try {
      setLoading(true);
      await api.put(`/task/${updatedTask._id}`, updatedTask);
      setColumns(
        columns.map((column) => ({
          ...column,
          tasks: column.tasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          ),
        }))
      );
    } catch (error) {
      console.error("Error editing task:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteTask = async (taskId: string) => {
    try {
      setLoading(true);
      await api.delete(`/task/${taskId}`);
      setColumns(
        columns.map((column) => ({
          ...column,
          tasks: column.tasks.filter((task) => task._id !== taskId),
        }))
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (e: React.DragEvent, task: TaskProps) => {
    console.log(task._id);
    e.dataTransfer.setData("taskId", task._id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
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
    <ColumnContext.Provider
      value={{
        columns,

        loading,
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
export const useTask = () => {
  const context = useContext(ColumnContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a ColumnProvider");
  }
  return context;
};
export { ColumnStatus };

