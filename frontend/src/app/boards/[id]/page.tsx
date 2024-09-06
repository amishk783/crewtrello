"use client";

import Button from "@/app/_components/Button";
import { Input } from "@/app/_components/Input";
import Kanbanboard from "@/app/_components/Kanbanboard";
import { List } from "@/app/_components/List";
import { Sidebar } from "@/app/_components/Sidebar";
import { cn } from "@/app/_utils";
import { createList } from "@/app/_utils/api/list";
import { useAuth } from "@/app/providers/AuthProvider";
import { useBoard } from "@/app/providers/BoardProvider";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ListType } from "../../../../typings";

const Board = () => {
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const handleTaskForm = () => {};

  const { getCurrentBoard, currentBoard, setBoardState } = useBoard();
  const { session } = useAuth();

  const { id } = useParams();

  const boardId = id as string;
  useEffect(() => {
    if (boardId) {
      getCurrentBoard(boardId);
    }
  }, [boardId, session, getCurrentBoard]);

  const handleForm = async (data) => {
    const position = currentBoard.lists.size;
    const newData = {
      ...data,
      boardId,
      position,
    };
    const entries = Array.from(currentBoard.lists);
    const response = await createList(newData);

    const newList: ListType = { ...response.savedList, cards: [] } as ListType;
    console.log("🚀 ~ handleForm ~ newList:", newList);
    const newLists = new Map(entries);

    newLists.set(newList._id, newList);
    setBoardState({ ...currentBoard, lists: newLists });
  };
  return (
    <div className="flex h-screen ">
      <Sidebar
        className="w-[20%] flex-shrink-0 overflow-y-auto overflow-x-hidden"
        handleTaskForm={handleTaskForm}
      />
      <div className="w-full overflow-hidden   bg-[#F4F4F4] text-black pb-10">
        <div className="py-5 bg-zinc-300/50 px-8  ">
          <div className="w-[90%] flex justify-end">
            <Button className="bg-white py-4 px-6 rounded-md ">Share</Button>
          </div>
        </div>
        <div className="m-20 ">
          <div className="flex flex-row gap-10 ">
            <div className="flex overflow-visible   overflow-x-auto  gap-10 w-full">
              <Kanbanboard />

              <div className="w-[300px] h-full py-4 font-inter group rounded-md bg-[#F9F9F9] border-2 transition-all duration-300 ease-out ">
                <div className={cn("px-1 w-full max-w-sm h-full")}>
                  {open && (
                    <form
                      onSubmit={handleSubmit(handleForm)}
                      className="flex flex-col gap-4"
                    >
                      <Input
                        register={register}
                        name="name"
                        label="name"
                        error={errors}
                      />
                      <div className="flex justify-end">
                        <Button type="submit" className="w-1/2 ">
                          Add list
                        </Button>
                      </div>
                    </form>
                  )}
                  {!open && (
                    <Button
                      onClick={() => setOpen((prev) => !prev)}
                      className="mt-4 flex w-full rounded-lg items-center justify-between text-white gap-2 pl-2  bg-gradient-to-b from-slate-800 to-gray-900 border-gray-900 border-2"
                    >
                      <p className="text-xl font-medium font-inter">Add new</p>
                      <Plus />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Board;
