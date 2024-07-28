"use client";

import React from "react";
import Image from "next/image";

import { Sidebar } from "../_components/Sidebar";

import { CircleHelp, Search, SearchCheckIcon } from "lucide-react";
import { cardItems, columnItems } from "../constant";
import Button from "../_components/Button";

import { Column } from "../_components/Column";
import { CreateTask } from "../_components/CreateTask";

const Home = () => {
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
                <Image src={item.imageUrl} alt="icon" width={77} height={77} />
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
          <div className="flex w-full rounded-lg bg-white justify-between">
            {columnItems.map((column) => (
              <Column
                key={column.id}
                id={column.id}
                status=""
                title={column.title}
              ></Column>
            ))}
          </div>
        </div>
      </div>
      <CreateTask />
    </div>
  );
};
export default Home;
