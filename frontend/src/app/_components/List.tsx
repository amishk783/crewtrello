import React, { Suspense, useCallback, useState } from "react";
import Image from "next/image";
import { debounce } from "lodash";

import { useDnD } from "../providers/DndProvider";

import Button from "./Button";
import { Task } from "./Task";

import { cn } from "../_utils";
import { Plus } from "lucide-react";
import { Card } from "../../../typings";
import { useDroppable } from "@dnd-kit/core";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { todo } from "node:test";
import { createList, updateList } from "../_utils/api/list";
import { useForm } from "react-hook-form";
import { Input } from "./Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { list } from "postcss";
import { useParams } from "next/navigation";
import { Modal } from "./Modal";
import { CreateTask } from "./CreateTask";

interface ListType {
  id: string;
  cards: Card[];
  title: string;
  position: number;
  index: number;
  handleTaskForm: (status: string) => void;
}

const schema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const List: React.FC<ListType> = ({
  id,
  cards,
  title,
  index,
  position,
  handleTaskForm,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: title },
  });

  const { id: boardId } = useParams();
  const [openCardModel, setOpenCardModel] = useState(false);

  const handleTitleChange = async (data) => {
    console.log(data);
    const respnse = await updateList(
      {
        ...data,
        position,
        boardId,
      },
      id
    );
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={cn(
                  "mx-4 px-2 rounded-md my-2  w-full h-full ",
                  snapshot.isDraggingOver
                    ? "bg-green-100 transition-colors duration-200"
                    : "bg-white"
                )}
              >
                <div className="flex relative flex-grow-0 flex-wrap items-start justify-between px-1 pt-1 ">
                  <div className="flex justify-between mb-3 relative flex-auto ">
                    <form
                      onBlur={handleSubmit(handleTitleChange)}
                      className="text-md text-zinc-500 font-normal "
                    >
                      <Input
                        variant="textarea"
                        className="py-2 px-3 h-max overflow-hidden bg-transparent resize-none break-words w-32 bg-white m-0 "
                        type="text"
                        name="name"
                        label="name"
                        register={register}
                        error={errors.name}
                      />
                    </form>
                  </div>
                  <Image src="/framebar.png" width={24} height={24} alt="bar" />
                </div>

                <div className="flex flex-col gap-4 h-full">
                  {cards.map((card, index) => (
                    <Task key={card._id} card={card} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
                <Button
                  onClick={()=>setOpenCardModel((prev) => !prev)}
                  className="mt-4 flex w-full rounded-lg items-center justify-between text-white gap-2 pl-2  bg-gradient-to-b from-slate-800 to-gray-900 border-gray-900 border-2"
                >
                  <p className="text-xl font-medium font-inter">Add new</p>
                  <Plus />
                </Button>
                {openCardModel && (
                  <Modal>
                    <CreateTask
                      listId={id}
                      boardId={boardId as string}
                      onClose={() => setOpenCardModel(false)}
                    />
                  </Modal>
                )}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
