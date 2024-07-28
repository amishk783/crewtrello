"use client";
import { Avatar } from "./Avatar";
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { dashboardItems } from "../constant";

import { usePathname } from "next/navigation";
import { cn } from "../_utils";

interface Props {
  className?: string;
}

export const Sidebar: React.FC<Props> = ({ className }) => {
  const pathname = usePathname();

  const isActivePage = (path: string): boolean => {
    return path === pathname;
  };
  return (
    <div className={cn(" border-orange-500", className)}>
      <div className="flex flex-col px-2 justify-between h-full">
        <div className="flex flex-col gap-2 px-2">
          <div className="px-2">
            <Avatar />
            <div className="flex justify-between items-center ">
              <div className="flex gap-4">
                <Image
                  src="/framenotifaction.png"
                  width={24}
                  height={24}
                  alt="notifaction alert"
                />
                <Image
                  src="/frameloader.png"
                  width={24}
                  height={24}
                  alt="notifaction alert"
                />
                <Image
                  src="/framenext.png"
                  width={24}
                  height={24}
                  alt="notifaction alert"
                />
              </div>
              <Button className=" h-10 bg-zinc-100 text-primary">
                Logout
              </Button>
            </div>
          </div>
          <div className="pt-2">
            <div className="flex flex-col gap-2 text-xl  pb-6 ">
              {dashboardItems.map((item) => (
                <Link
                  className={`flex gap-4 items-center hover:bg-slate-50 hover:bg-opacity-30 px-2  py-3 rounded-lg ${
                    isActivePage(item.pathUrl)
                      ? "bg-[#F4F4F4] border-2 border-[#DDDDDD]"
                      : ""
                  }`}
                  href={item.pathUrl}
                  key={item.text}
                >
                  <Image
                    src={item.imageUrl}
                    alt="dashboard icons"
                    width={30}
                    height={10}
                  />
                  <h2 className="text-[#797979] font-barlow font-normal">
                    {item.text}
                  </h2>
                </Link>
              ))}
            </div>
            <Button className=" flex w-full rounded-lg text-xl font-medium items-center justify-center text-white gap-2 pl-2 font-barlow bg-gradient-to-b from-[#4C38C2] via-purple-indigo to-[#2F2188] border-[#2F2188] border-2">
              Create new task{" "}
              <Image
                src="/dashboard/frameplus.png"
                alt="button icon"
                width={24}
                height={24}
              />
            </Button>
          </div>
        </div>
        <div className="px-2 bg-[#f7f7f7] mb-6">
          <Button className="w-full flex items-center gap-2  rounded-lg ">
            <Image
              src="/framedownload.png"
              width={40}
              height={40}
              alt="download icon"
            />
            <div className="flex flex-col text-start">
              <h2 className="text-lg font-medium text-[#797979]">
                Download the app
              </h2>
              <h4 className=" text-sm text-[#797979] ">
                Get the full experience
              </h4>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
