import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../Button";
import { Input } from "../Input";
import { Selector } from "./Selector";
import { useTask } from "@/app/providers/TaskProvider";

import { Plus } from "lucide-react";
import { ExtendedFormData, Option } from "./type";
import { priorityOption, statusOption } from "./constant";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  deadline: z.string().optional(),
});

export type formData = z.infer<typeof schema>;

interface Props {
  taskStatus: string;
  onClose: () => void;
}
export const CreateTask: React.FC<Props> = ({ taskStatus, onClose }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formData>({ resolver: zodResolver(schema) });

  const { handleAddTask } = useTask();

  const onSelectChange = () => (selectedOption: Option | null) => {
    console.log("Selected option:", selectedOption);
  };

  const statusRef = React.useRef<HTMLInputElement>(null);
  const priorityRef = React.useRef<HTMLInputElement>(null);

  const handleForm = async (data: ExtendedFormData) => {
    event?.preventDefault();
    const status = statusRef.current?.value || "";
    console.log("🚀 ~ status:", status);
    const priority =
      priorityRef.current?.value !== "Not Selected"
        ? priorityRef.current?.value
        : "";
    console.log("🚀 ~ priority:", priority);

    handleAddTask({ status, priority, ...data });
    onClose();
  };

  const handleEnlarge = () => {};
  return (
    <div className="absolute top-0 left-[50%] bottom-0 right-0 h-full bg-white z-10 overflow-auto drop-shadow-md shadow-xl">
      <div className="p-6">
        <form id="form" onSubmit={handleSubmit(handleForm)}>
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <Button variant="ghost" type="submit" className="p-0">
                <Image
                  src="/framecross.png"
                  alt="time icon"
                  width={24}
                  height={24}
                />
              </Button>
              <Button variant="ghost" className="p-0" onClick={handleEnlarge}>
                <Image
                  src="/frameenlarge.png"
                  alt="time icon"
                  width={24}
                  height={24}
                />
              </Button>
            </div>
            <div className="flex gap-4  items-center">
              <Button className="text-base text-primary h-10 bg-zinc-100 flex gap-2 items-center ">
                <p>Share</p>
                <Image
                  src="/frameshare.png"
                  alt="time icon"
                  width={20}
                  height={20}
                />
              </Button>
              <Button className="text-base text-primary font-inter h-10 bg-zinc-100 flex gap-4 items-center ">
                <p>Favorite</p>
                <Image
                  src="/framefavorite.png"
                  alt="time icon"
                  width={20}
                  height={20}
                />
              </Button>
            </div>
          </div>
          <div className="mt-7 text-primary">
            <div>
              <Input
                name="title"
                label="title"
                error={errors.title}
                register={register}
                placeholder="Title"
                className="font-barlow text-5xl text-zinc-300 font-semibold bg-white focus:bg-white focus:text-primary"
              />
              <div className="flex flex-col mt-8 gap-8">
                <Selector
                  ref={statusRef}
                  {...statusOption}
                  defaultValue={taskStatus}
                  onChange={onSelectChange}
                ></Selector>
                <Selector
                  ref={priorityRef}
                  {...priorityOption}
                  onChange={onSelectChange}
                />
                <div className="flex gap-14">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/framecalender.png"
                      alt="time icon"
                      width={24}
                      height={24}
                    />
                    <h2 className="text-primary font-inter">Deadline</h2>
                  </div>
                  <Input
                    register={register}
                    error={errors.description}
                    label="deadline"
                    type="text"
                    className="text-primary font-inter bg-white focus:bg-white"
                    placeholder="22-06-2022"
                    name="deadline"
                  />
                </div>
                <div className="flex gap-14">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/framepen.png"
                      alt="time icon"
                      width={24}
                      height={24}
                    />
                    <h2 className="text-primary font-inter">Description</h2>
                  </div>
                  <Input
                    register={register}
                    error={errors.description}
                    label="description"
                    type="text"
                    className="text-primary font-inter bg-white focus:bg-white"
                    placeholder="Write a Descriptions"
                    name="description"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-7 text-slate-700 font-normal pb-6 border-b-2 border-zinc-300">
            <Plus />
            <h2>Add custom property</h2>
          </div>
          <div className="flex gap-4 mt-8 text-base text-zinc-400 font-normal">
            <p>Start writing, or drag your own files here.</p>
          </div>
        </form>
      </div>
    </div>
  );
};
