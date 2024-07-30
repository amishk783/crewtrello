import React, { Suspense, useCallback, useState } from "react";
import Image from "next/image";
import { Task, TaskProps } from "./Task";
import Button from "./Button";
import { Loader, Plus } from "lucide-react";
import { useTask } from "../providers/TaskProvider";
import { ColumnStatus } from "../providers/TaskProvider"; // Import the ColumnStatus type
import SkeletonTask from "./SkeletonTask";

interface ColumnType {
  tasks: TaskProps[];
  title: string;
  handleTaskForm: (status: ColumnStatus) => void; // Update the type of handleTaskForm argument
}

export const Column: React.FC<ColumnType> = ({
  tasks,
  title,
  handleTaskForm,
}) => {
  const { handleDragOver, handleDrop, loading } = useTask();

  const onDragOver = useCallback(
    (e: React.DragEvent) => {
      handleDragOver(e);
    },
    [handleDragOver]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      handleDrop(e, title as ColumnStatus);
    },
    [handleDrop, title]
  );

  return (
    <div
      className="mx-4 my-2  w-full"
      onDragOver={onDragOver}
      onDrop={onDrop} // Cast title to ColumnStatus
    >
      {loading && <Loader className=" animate-spin" size={42} />}
      <div className="flex justify-between mb-3 ">
        <h2 className="text-2xl text-zinc-500 font-normal">{title}</h2>
        <Image src="/framebar.png" width={24} height={24} alt="bar" />
      </div>
      <div className="flex flex-col gap-4">
        {loading
          ? Array(5)
              .fill(null)
              .map((_, i) => <SkeletonTask key={i} />)
          : tasks.map((task, index) => {
              return <Task key={index} {...task} />;
            })}
      </div>
      <Button
        onClick={() => handleTaskForm(title as ColumnStatus)} // Cast title to ColumnStatus
        className="mt-4 flex w-full rounded-lg items-center justify-between text-white gap-2 pl-2  bg-gradient-to-b from-slate-800 to-gray-900 border-gray-900 border-2"
      >
        <p className="text-xl font-medium font-inter">Add new</p>
        <Plus />
      </Button>
    </div>
  );
};
