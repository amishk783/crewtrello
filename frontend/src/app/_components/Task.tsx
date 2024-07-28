import React from "react";
import Image from "next/image";
export interface TaskProps {
  title: string;
  description?: string;
  priority?: "low" | "medium" | "urgent";
  deadline?: string;
  status: "todo" | "progress" | "review" | "completed";
}

export const Task: React.FC<TaskProps> = ({
  title,
  description,
  priority,
  deadline,
  status,
}) => {
  return (
    <div draggable className="font-inter rounded-md bg-slate-100 ">
      <div className="p-2">
        <h1 className="text-primary text-2xl">{title}</h1>
        <p className="text-lg">{description}</p>
        <h4 className="px-3 py-2 rounded-lg ">{priority}</h4>
        <div className="flex items-center gap-2">
          <Image
            src="/framestopwatch.png"
            alt="time icon"
            width={20}
            height={20}
          />
          <h4 className="text-primary font-medium">{deadline}</h4>
        </div>
        <p>1 hr ago</p>
      </div>
    </div>
  );
};
