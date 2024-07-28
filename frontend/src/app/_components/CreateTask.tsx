import Image from "next/image";
import React from "react";
import Button from "./Button";

export const CreateTask = () => {
  return (
    <div className="absolute top-0 left-[50%] bottom-0 right-0 h-full bg-white z-10 overflow-auto">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <Image
              src="/framecross.png"
              alt="time icon"
              width={24}
              height={24}
            />
            <Image
              src="/frameenlarge.png"
              alt="time icon"
              width={24}
              height={24}
            />
          </div>
          <div className="flex gap-4">
            <Button className=" h-10 bg-zinc-100 text-primary">
              <p>Share</p>{" "}
              <Image
                src="/framestopwatch.png"
                alt="time icon"
                width={20}
                height={20}
              />
            </Button>
            <Button className=" h-10 bg-zinc-100 text-[#797979]">
              <p>Share</p>{" "}
              <Image
                src="/framestopwatch.png"
                alt="time icon"
                width={20}
                height={20}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
