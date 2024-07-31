import React, { useState } from "react";
import { Column } from "./Column";
import { useTask } from "../providers/TaskProvider";

import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { ColumnStatus } from "../providers/TaskProvider/type";
import Button from "./Button";
import { Plus } from "lucide-react";
import { DnDProvider } from "../providers/DndProvider";
import { ColumnProvider } from "../providers/TaskProvider";
import { CreateTask } from "./CreateTask";
interface KanbanboardType {
  handleTaskForm: (status: string) => void;
  openCreateTask: boolean;
  colStatus: string;
  closeCreateTask: () => void;
}

const Kanbanboard: React.FC<KanbanboardType> = ({
  handleTaskForm,
  openCreateTask,
  closeCreateTask,
  colStatus,
}) => {
  const { columns, loading } = useTask();
  // const [openCreateTask, setOpenCreateTask] = useState<boolean>(false);
  // const [colStatus, setColStatus] = useState<string>("");

  // const handleForm = (status: string) => {
  //   setColStatus(status);
  //   setOpenCreateTask((prev) => !prev);
  // };

  return (
    <DnDProvider>
      <div className="grid grid-cols-4 gap-4 w-full rounded-lg bg-white justify-between pb-10 overflow-auto">
        {columns.map((column) => (
          <div className="flex flex-col items-center px-4" key={column.status}>
            <Column
              tasks={column.tasks}
              title={column.status}
              handleTaskForm={handleTaskForm}
            ></Column>
          </div>
        ))}
        {openCreateTask && (
          <CreateTask taskStatus={colStatus} onClose={closeCreateTask} />
        )}
      </div>
    </DnDProvider>
  );
};

export default Kanbanboard;
