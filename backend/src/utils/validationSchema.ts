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
  status: z
    .enum(["To Do", "In Progress", "Under Review", "Completed"])
    .default("To Do"),
  deadline: z.coerce.string().transform(Date).optional(),
  priority: z.string().optional(),
});
export const updateTaskSchema = taskSchema.partial();
