import React, { useState } from "react";
import Image from "next/image";
import { Task } from "./Task";
import Button from "./Button";
import { Plus } from "lucide-react";

interface ColumnType {
  status: string;
  id: number;
  title: string;
}

export const Column: React.FC<ColumnType> = ({ status, id, title }) => {
  const [openCreateTask, setOpenCreateTask] = useState<boolean>();
  const handleCreateTask = () => {
    setOpenCreateTask((prev) => !prev);
  };
  return (
    <div className="mx-4 my-2 w-full">
      <div className="flex justify-between mb-3 ">
        <h2 className="text-2xl text-zinc-500 font-normal">{title}</h2>
        <Image src="/framebar.png" width={24} height={24} alt="bar" />
      </div>
      <div className="">
        <Task
          title="Implement User Authentication"
          description="Develop and integrate user authentication using email and password."
          priority="urgent"
          deadline="2024-08-15"
          status="todo"
        />
      </div>
      <Button
        onClick={handleCreateTask}
        className="mt-4 flex w-full rounded-lg items-center justify-between text-white gap-2 pl-2  bg-gradient-to-b from-slate-800 to-gray-900 border-gray-900 border-2"
      >
        <p className="text-xl font-medium font-inter">Add new</p>
        <Plus />
      </Button>
    </div>
  );
};
