import React, { useCallback } from "react";
import Image from "next/image";
import { useTask } from "../providers/TaskProvider";

export interface TaskProps {
  _id: string;
  title: string;
  description?: string;
  priority?: "Low" | "Medium" | "Urgent";
  deadline?: string;
  status: "To Do" | "In Progress" | "Under Review" | "Completed";
}

export const Task: React.FC<TaskProps> = (task) => {
  const { handleDragStart } = useTask();

  const onDragStart = useCallback(
    (e: React.DragEvent) => {
      handleDragStart(e, task);
    },
    [handleDragStart, task]
  );

  return (
    <div
      onDragStart={onDragStart}
      draggable
      className="font-inter rounded-md bg-slate-100 transition-all duration-300 ease-out "
    >
      <div className="p-2">
        <h1 className="text-primary text-2xl">{task.title}</h1>
        <p className="text-lg">{task.description}</p>
        <h4 className="px-3 py-2 rounded-lg ">{task.priority}</h4>
        <div className="flex items-center gap-2">
          <Image
            src="/framestopwatch.png"
            alt="time icon"
            width={20}
            height={20}
          />
          <h4 className="text-primary font-medium">{task.deadline}</h4>
        </div>
        <p>1 hr ago</p>
      </div>
    </div>
  );
};
