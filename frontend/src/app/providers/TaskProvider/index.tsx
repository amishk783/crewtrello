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
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

interface ColumnContextType {
  columns: ColumnType[];

  loading: boolean;
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
  handleAddTask: (formData: ExtendedFormData) => Promise<void>;
  handleEditTask: (task: TaskProps) => Promise<void>;
  handleDeleteTask: (taskId: string) => Promise<void>;
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



  const fetchTasks = async () => {
    try {
      setLoading(true);
      const accessToken = session ? session.accessToken : "";

      const response = await api.get("/task/", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      const tasks: TaskProps[] = response.data || [];

      setColumns(
        columns.map((column) => ({
          ...column,
          tasks: tasks.filter((task) => task.status === column.status),
        }))
      );
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
      if (session) fetchTasks();
    }, [session]);

  const handleAddTask = async (data: ExtendedFormData) => {
    try {
      setLoading(true);

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
      setColumns((prevColumns) => {
        const newColumns = prevColumns.map((column) => ({
          ...column,
          tasks: column.tasks.filter((task) => task._id !== updatedTask._id),
        }));

        const targetColumn = newColumns.find(
          (column) => column.status === updatedTask.status
        );
        if (targetColumn) {
          targetColumn.tasks.push(updatedTask);
        }

        return newColumns;
      });
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

  return (
    <ColumnContext.Provider
      value={{
        columns,
        setColumns,
        loading,
        handleAddTask,
        handleEditTask,
        handleDeleteTask,
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
