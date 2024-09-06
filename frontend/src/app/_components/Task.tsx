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
  isValid,
} from "date-fns";
import { Modal } from "./Modal";
import { EditCard } from "./EditCard";
import { Card } from "../../../typings";

import { Draggable } from "@hello-pangea/dnd";

export interface Props {
  card: Card;
  index: number;
}
export const Task: React.FC<Props> = ({ card, index }) => {
  // const { handleDragStart } = useDnD();
  const [openEdit, setOpenEdit] = useState(false);

  let formattedDate;
  if (card.deadline) {
    const date = parseISO(card.deadline);
    if (isValid(date)) {
      formattedDate = format(date, "MMMM d, yyyy");
    } else {
      console.error("Invalid date:", card.deadline);
    }
  }
  const getTimeElapsed = () => {
    if (!card.createdAt) return;

    const date = parseISO(card.createdAt);

    const givenHour = date.getUTCHours();
    const timeElapsed = formatDistanceToNow(date, { addSuffix: true });
    const hoursDifference = differenceInHours(new Date(), date);

    return timeElapsed;
  };

  getTimeElapsed();

  const handleOpenEdit = () => {
    setOpenEdit((prev) => !prev);
  };
  const handleCloseEdit = () => {
    setOpenEdit((prev) => !prev);
  };

  return (
    <Draggable draggableId={card._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "w-full font-inter bg-[#F9F9F9] group rounded-lg  border-2 "
          )}
        >
          <div className="flex flex-col gap-2 p-2">
            <div className="flex justify-between items-center overflow-hidden">
              <h1 className="text-primary text-2xl overflow-x-auto">
                {card.title}
              </h1>
              <div className="flex mr-1 gap-2 invisible transition  ease-in-out delay-300 group-hover:visible">
                <Button
                  onClick={handleOpenEdit}
                  variant="ghost"
                  className="p-0 hover:scale-[110%] transition ease-in delay-75"
                >
                  <Pen size={20} className="text-primary " />
                </Button>
                <Button
                  // onClick={handleDelete}
                  variant="ghost"
                  className="p-0 hover:scale-[110%] transition ease-in delay-75"
                >
                  <CircleX className=" stroke-red-400" />
                </Button>
              </div>
            </div>
            <p className="text-lg text-zinc-500">{card.description}</p>
            {card.priority && (
              <h4
                className={cn(
                  "w-20 px-2 py-1 rounded-xl text-white font-inter font-normal ",
                  card.priority === "Urgent"
                    ? "bg-red-300"
                    : card.priority === "Medium"
                    ? "bg-orange-300"
                    : "bg-green-400"
                )}
              >
                {card.priority}
              </h4>
            )}
            {card.deadline && (
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
                <EditCard card={card} onClose={handleCloseEdit} />
              </div>
            </Modal>
          )}
        </div>
      )}
    </Draggable>
  );
};
