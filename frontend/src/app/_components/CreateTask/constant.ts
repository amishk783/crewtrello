import { Option, OptionsType } from "./type";

export const status: Option[] = [
  { id: 0, name: "Not Selected" },
  { id: 1, name: "To Do" },
  { id: 2, name: "In Progress" },
  { id: 3, name: "Under Review" },
  { id: 4, name: "Completed" },
];
export const priority: Option[] = [
  { id: 0, name: "Not Selected" },
  { id: 1, name: "Low" },
  { id: 2, name: "Medium" },
  { id: 3, name: "High" },
];

export const statusOption: OptionsType = {
  title: "Status",
  icon: "/frameloader2.png",
  options: status,
};
export const priorityOption: OptionsType = {
  title: "Priority",
  icon: "/framepriority.png",
  options: priority,
};
