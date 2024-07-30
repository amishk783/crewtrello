import React, { useState } from "react";
import { Column } from "./Column";
import { useTask } from "../providers/TaskProvider";
import {
  DragDropContext,
  Droppable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";

const Kanbanboard = () => {
  const [colStatus, setColStatus] = useState<string>("");
  const { columns, loading } = useTask();
  const handleTaskForm = (status: string) => {
    setColStatus(status);
    // setOpenCreateTask((prev) => !prev);
  };
  const handleDragEnd = (result: DropResult, provided: ResponderProvided) => {
    throw new Error("Function not implemented.");
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-4 gap-4 w-full rounded-lg bg-white justify-between ">
        {columns.map((column) => (
          <div key={column.status}>
            <div key={column.status}>
              <Column
                tasks={column.tasks}
                title={column.status}
                handleTaskForm={handleTaskForm}
              ></Column>
            </div>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Kanbanboard;
