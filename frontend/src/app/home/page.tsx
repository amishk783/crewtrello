"use client";

import React, { Suspense, useState } from "react";
import Image from "next/image";

import { Sidebar } from "../_components/Sidebar";

import { CircleHelp, Loader2, Search, SearchCheckIcon } from "lucide-react";
import { cardItems, columnItems } from "../constant";
import Button from "../_components/Button";
import { DragDropContext } from "react-beautiful-dnd";
import { Column } from "../_components/Column";
import { CreateTask } from "../_components/CreateTask";
import { useTask } from "../providers/TaskProvider";
import { Task } from "../_components/Task";
import Kanbanboard from "../_components/Kanbanboard";

const Home = () => {
  const [openCreateTask, setOpenCreateTask] = useState<boolean>(false);
  const [colStatus, setColStatus] = useState<string>("");

  const { columns, loading } = useTask();

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-black w-full h-screen">
        <Loader2 size={42} className="animate-spin" />
      </div>
    );
  }

  const handleTaskForm = (status: string) => {
    setColStatus(status);
    setOpenCreateTask((prev) => !prev);
  };
  console.log(loading);


  return (
    <div className="flex h-screen ">
      <Sidebar className="w-[20%]" />
      <div className="w-full bg-[#F4F4F4] text-black">
        <div className="flex flex-col gap-4 ml-4 my-6 mr-10">
          <div className="flex justify-between items-center ">
            <h2 className="text-black text-5xl font-barlow font-semibold">
              Good morning, Joe
            </h2>
            <div className="flex gap-4 ">
              <h3 className="font-inter">Help & feedback</h3>
              <CircleHelp />
            </div>
          </div>
          <div className="flex gap-4 ">
            {cardItems.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 bg-white h-32 items-center justify-center p-4 rounded-lg"
              >
                <Image src={item.npm i --save-dev @types/react-beautiful-dndimageUrl} alt="icon" width={77} height={77} />
                <div className="flex flex-col">
                  <h5 className=" text-primary font-medium text-base">
                    {item.title}
                  </h5>
                  <p className="text-sm text-[#868686]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex  items-center justify-end ">
              <input
                className="py-2 pl-3 w-48 outline outline-1 outline-neutral-300 rounded-lg"
                placeholder="Search"
              />
              <Image
                src="/framesearch.png"
                alt="search icon"
                className="absolute mr-4 "
                width={24}
                height={24}
              />
            </div>
            <div className="flex items-center gap-6 text-primary">
              <div className="flex items-center gap-4">
                <h2 className="text-base ">Calender view</h2>
                <Image
                  src="/framecalender.png"
                  alt="calender icon"
                  width={24}
                  height={24}
                />
              </div>
              <div className="flex items-center gap-2 font-inter">
                <h2 className="text-base ">Autmation</h2>
                <Image
                  src="/frameautmation.png"
                  alt="automation icon"
                  width={24}
                  height={24}
                />
              </div>
              <div className="flex items-center gap-2">
                <h2 className="text-base ">Filter</h2>
                <Image
                  src="/framefilter.png"
                  alt="filter icon"
                  width={24}
                  height={24}
                />
              </div>
              <div className="flex items-center gap-2">
                <h2 className="text-base ">Share</h2>
                <Image
                  src="/frameshare.png"
                  alt="share icon"
                  width={24}
                  height={24}
                />
              </div>
              <Button className=" flex rounded-lg text-lg font-medium items-center justify-center text-white gap-2  font-barlow bg-gradient-to-b from-[#4C38C2] via-purple-indigo to-[#2F2188] border-[#2F2188] border-2">
                Create new
                <Image
                  src="/dashboard/frameplus.png"
                  alt="button icon"
                  width={24}
                  height={24}
                />
              </Button>
            </div>
          </div>

          {/* <div className="grid grid-cols-4 gap-4 w-full rounded-lg bg-white justify-between ">
            {columns.map((column) => (
              <div key={column.status}>
                <div key={column.status}>
                  <Column
                    tasks={column.tasks}
                    title={column.status}
                    handleTaskForm={handleTaskForm}
                  ></Column>
                </div>
              </div>
            ))}
          </div> */}
        
            <Kanbanboard/>
          
        </div>
      </div>
      {openCreateTask && (
        <CreateTask
          taskStatus={colStatus}
          onClose={() => setOpenCreateTask((prev) => !prev)}
        />
      )}
    </div>
  );
};
export default Home;
