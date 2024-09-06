"use client";
import { Sidebar } from "@/app/_components/Sidebar";
import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { createBoard, getAllBoards } from "../providers/BoardProvider/rest";
import { useAuth } from "../providers/AuthProvider";
import { Delete, Plus } from "lucide-react";
import { Modal } from "../_components/Modal";
import Button from "../_components/Button";
import { Input } from "../_components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { erroMessageHandler } from "../_utils";
import toast from "react-hot-toast";

export type Boards = {
  id: string;
  name: string;
  createdAt: string;
};

const schema = z.object({
  name: z.string().min(1, "Board Title is required"),
});

export type formData = z.infer<typeof schema>;

const Board = () => {
  const [boards, setBoards] = useState<Boards[]>([]);
  const { session } = useAuth();
  const [open, setOpen] = useState<Boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchedBoards = async () => {
      if (!session) return;
      const fetchedBoard = ((await getAllBoards()) || []).map((board) => ({
        id: board._id,
        name: board.name,
        createdAt: board.createdAt,
      })) as Boards[];

      setBoards(fetchedBoard);
    };
    fetchedBoards();
  }, [session]);

  const handleTaskForm = () => {};

  const addForm = async (data: formData) => {
    try {
      const board = (await createBoard(data)) as Boards;

      setBoards((prev) => [...prev, board]);
      setOpen(false);

      toast.success("Board created successfully");
    } catch (error) {
      erroMessageHandler(error);
    }
  };

  const handleAddClick = () => {
    setOpen((prev) => !prev);
  };
  const ref = React.createRef<HTMLInputElement>();

  const handleDrop = () => {};

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        className="w-[20%] flex-shrink-0 overflow-y-auto"
        handleTaskForm={handleTaskForm}
      />
      <div className="w-full bg-[#F4F4F4] flex-grow overflow-auto text-black pb-10">
        <div className="m-20">
          <div className="flex gap-4">
            <div className="flex flex-wrap gap-4">
              {boards.map((board) => (
                <Link href={`/boards/${board.id}`} key={board.id}>
                  <div
                    draggable
                    className="w-[300px] h-[150px] font-inter group rounded-md bg-[#F9F9F9] border-2 transition-all duration-300 ease-out "
                  >
                    <div className="p-5">
                      <h2 className="text-2xl">{board.name}</h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="felx flex-col gap-5">
              <div className="w-[300px] h-[70px] font-inter group rounded-md bg-[#F9F9F9] border-2 transition-all duration-300 ease-out ">
                <div className="flex w-full h-full items-center justify-center p-5">
                  {!open && (
                    <h2 onClick={handleAddClick} className="text-4xl p-4">
                      +
                    </h2>
                  )}
                  {open && (
                    <form>
                      <input ref={ref} type="text" name="name" />
                      <button type="submit">Add</button>
                    </form>
                  )}
                </div>
              </div>
              <div
                onDrop={handleDrop}
                className="w-[300px] h-[150px] font-inter group rounded-md bg-[#F9F9F9] border-2 transition-all duration-300 ease-out mt-5"
              >
                <div className="flex w-full h-full items-center justify-center p-5">
                  {!open && (
                    <h2 onClick={handleAddClick} className="text-4xl p-4">
                      <Delete />
                    </h2>
                  )}
                </div>
              </div>
            </div>
            {open && (
              <Modal classname="">
                <div className=" bg-white z-10 overflow-auto">
                  <div className="">
                    <form id="form" onSubmit={handleSubmit(addForm)}>
                      <div className="text-primary">
                        <div>
                          <Input
                            name="name"
                            label="name"
                            error={errors.name}
                            register={register}
                            placeholder="Title"
                            className="font-barlow text-5xl text-zinc-300 font-semibold bg-white focus:bg-white focus:text-primary"
                          />
                          <div className="flex flex-col mt-8 gap-8">
                            <div className="flex gap-14"></div>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="default"
                        className="mt-4 flex w-full rounded-lg items-center justify-center text-white gap-2 pl-2  bg-gradient-to-b from-slate-800 to-gray-900 border-gray-900 border-2"
                        type="submit"
                      >
                        Update
                      </Button>
                    </form>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Board;
