import { TaskProps } from "@/app/_components/Task";

export type ColumnStatus =
  | "To Do"
  | "In Progress"
  | "Under Review"
  | "Completed";

export interface ColumnType {
  status: ColumnStatus;
  tasks: TaskProps[];
}
export interface ExtendedFormData extends FormData {
  status?: string;
  priority?: string;
}
