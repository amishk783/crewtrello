import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "./Button";
import { Input } from "./Input";
import { Selector } from "./CreateTask/Selector";
import { useTask } from "@/app/providers/TaskProvider";

import { Plus } from "lucide-react";
import { ExtendedFormData, Option } from "./CreateTask/type";
import { priorityOption, statusOption } from "./CreateTask/constant";
import { TaskProps } from "./Task";
import { useDnD } from "../providers/DndProvider";
import toast from "react-hot-toast";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  deadline: z.string().optional(),
});

export type formData = z.infer<typeof schema>;

interface Props {
  task: TaskProps;
  onClose: () => void;
}
export const EditTask: React.FC<Props> = ({ task, onClose }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(schema),
    defaultValues: { title: task.title, description: task.description },
  });

  const { handleEditTask } = useTask();

  const onSelectChange = () => (selectedOption: Option | null) => {
    console.log("Selected option:", selectedOption);
  };

  const statusRef = React.useRef<HTMLInputElement>(null);
  const priorityRef = React.useRef<HTMLInputElement>(null);

  const handleForm = async (data: formData) => {
    event?.preventDefault();
    let status;
    if (!statusRef.current?.value) return;

    status = statusRef.current?.value as TaskProps["status"];
    const updatedPriority =
      priorityRef.current?.value !== "Not Selected"
        ? priorityRef.current?.value
        : "";
    const priority = updatedPriority as TaskProps["priority"];
    const payload: TaskProps = {
      ...data,
      status,
      ...(priority && { priority }),
      _id: task._id,
    };
    try {
      await handleEditTask(payload);
      toast.success("Task updated succesfully");
      onClose();
    } catch (error) {
      toast.error("Something went wrong! please try again");
      onClose();
    }
  };

  return (
    <div className=" bg-white z-10 overflow-auto">
      <div className="">
        <form id="form" onSubmit={handleSubmit(handleForm)}>
          <div className="text-primary">
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
                  defaultValue={task.status}
                  onChange={onSelectChange}
                ></Selector>
                <Selector
                  defaultValue={task.priority}
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
  );
};
