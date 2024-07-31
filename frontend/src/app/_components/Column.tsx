import React, { Suspense, useCallback, useState } from "react";
import Image from "next/image";
import { Task, TaskProps } from "./Task";
import Button from "./Button";
import { Loader, Plus } from "lucide-react";
import { useTask } from "../providers/TaskProvider";
import { ColumnStatus } from "../providers/TaskProvider/type"; // Import the ColumnStatus type
import SkeletonTask from "./SkeletonTask";
import { useDnD } from "../providers/DndProvider";
import { cn } from "../_utils";

interface ColumnType {
  tasks: TaskProps[];
  title: string;
  handleTaskForm: (status: string) => void;
}

export const Column: React.FC<ColumnType> = ({
  tasks,
  title,
  handleTaskForm,
}) => {
  const { handleDragOver, handleDragLeave, handleDrop } = useDnD();

  const onDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      handleDragOver(e, title as ColumnStatus);
    },
    [handleDragOver, title]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      handleDrop(e, title as ColumnStatus);
    },
    [handleDrop, title]
  );

  return (
    <div
      className={cn("mx-4 my-2  w-full")}
      onDragOver={onDragOver}
      onDragLeave={handleDragLeave}
      onDrop={onDrop}
    >
      <div className="flex justify-between mb-3 ">
        <h2 className="text-2xl text-zinc-500 font-normal">{title}</h2>
        <Image src="/framebar.png" width={24} height={24} alt="bar" />
      </div>

      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <Task key={task._id} {...task} />
        ))}
      </div>
      <Button
        onClick={() => handleTaskForm(title as ColumnStatus)}
        className="mt-4 flex w-full rounded-lg items-center justify-between text-white gap-2 pl-2  bg-gradient-to-b from-slate-800 to-gray-900 border-gray-900 border-2"
      >
        <p className="text-xl font-medium font-inter">Add new</p>
        <Plus />
      </Button>
    </div>
  );
};
