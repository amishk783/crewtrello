import * as z from "zod";

export const registerSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.string().optional(),
  listId: z.string().min(1, "List Id is required"),
  deadline: z.coerce.string().transform(Date).optional(),
  priority: z.string().optional(),
});
export const updateTaskSchema = taskSchema.partial();

export const boardScehma = z.object({
  name: z.string().min(1, "Board name is required"),
});

export const listValidationSchema = z.object({
  name: z.string().min(1, "List name is required"),
  position: z.number().optional(),
  boardId: z.string().min(1, "Board Id is required"),
});
