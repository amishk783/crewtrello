import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useTask } from "../providers/TaskProvider";
import { cn } from "../_utils";
import { CircleX, Delete, Pen } from "lucide-react";
import Button from "./Button";
import toast from "react-hot-toast";
import {
  format,
  parseISO,
  formatDistanceToNow,
  differenceInHours,
} from "date-fns";
import { Modal } from "./Modal";
import { EditTask } from "./EditTask";
import { useDnD } from "../providers/DndProvider";

export interface TaskProps {
  _id: string;
  title: string;
  description?: string;
  priority?: "Low" | "Medium" | "Urgent";
  deadline?: string;
  status: "To Do" | "In Progress" | "Under Review" | "Completed";
  createdAt?: string;
}
export interface Props {
  task: TaskProps;
  index: number;
}
export const Task: React.FC<TaskProps> = (task) => {
  const { handleDragStart } = useDnD();
  const [openEdit, setOpenEdit] = useState(false);

  let formattedDate;
  if (task.deadline) {
    const date = parseISO(task.deadline);
    formattedDate = format(date, "MMMM d, yyyy");
  }
  const getTimeElapsed = () => {
    if (!task.createdAt) return;

    const date = parseISO(task.createdAt);

    const givenHour = date.getUTCHours();
    const timeElapsed = formatDistanceToNow(date, { addSuffix: true });
    const hoursDifference = differenceInHours(new Date(), date);

    return timeElapsed;
  };

  getTimeElapsed();

  const onDragStart = useCallback(
    (e: React.DragEvent) => {
      handleDragStart(e, task);
    },
    [handleDragStart, task]
  );
  const { handleDeleteTask } = useTask();
  const handleDelete = async () => {
    try {
      await handleDeleteTask(task._id);
      toast.success("Task deleted succesfully", {
        className: "text-white-300 bg-green-300",
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const handleOpenEdit = () => {
    setOpenEdit((prev) => !prev);
  };
  const handleCloseEdit = () => {
    setOpenEdit((prev) => !prev);
  };

  return (
    <div
      onDragStart={onDragStart}
      draggable
      className={cn(
        "w-full font-inter rounded-md bg-[#F9F9F9] border-2 transition-all duration-300 ease-out "
      )}
    >
      <div className="flex flex-col gap-2 p-2">
        <div className="flex justify-between items-center">
          <h1 className="text-primary text-2xl">{task.title}</h1>
          <div className="flex mr-1 gap-2">
            <Button onClick={handleOpenEdit} variant="ghost" className="p-0">
              <Pen size={20} className="text-primary" />
            </Button>
            <Button onClick={handleDelete} variant="ghost" className="p-0">
              <CircleX className=" stroke-red-400" />
            </Button>
          </div>
        </div>
        <p className="text-lg text-zinc-500">{task.description}</p>
        {task.priority && (
          <h4
            className={cn(
              "w-20 px-2 py-1 rounded-xl text-white font-inter font-normal ",
              task.priority === "Urgent"
                ? "bg-red-300"
                : task.priority === "Medium"
                ? "bg-orange-300"
                : "bg-green-400"
            )}
          >
            {task.priority}
          </h4>
        )}
        {task.deadline && (
          <div className="flex items-center gap-2">
            <Image
              src="/framestopwatch.png"
              alt="time icon"
              width={20}
              height={20}
            />
            <h4 className="text-primary font-medium">{formattedDate}</h4>
          </div>
        )}
        <p className="text-primary">{getTimeElapsed()}</p>
      </div>

      {openEdit && (
        <Modal>
          <div className="flex flex-col justify-center items-center">
            <Button
              variant="ghost"
              className="relative p-0 ml-auto"
              onClick={handleCloseEdit}
            >
              <CircleX className=" stroke-red-400"></CircleX>
            </Button>
            <EditTask task={task} onClose={handleCloseEdit} />
          </div>
        </Modal>
      )}
    </div>
  );
};
