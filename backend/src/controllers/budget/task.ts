import { Request, Response } from "express";

import Logger from "@/utils/logger";
import { AuthenticatedRequest } from "@/types";
import { taskSchema, updateTaskSchema } from "@/utils/validationSchema";
import Task from "@/db/schema/Task";
import { z } from "zod";

export const createTask = async (req: AuthenticatedRequest, res: Response) => {
  console.log(req.body);

  const validatedData = taskSchema.parse(req.body);

  const user = req.user;

  if (!user) {
    return res.status(400).send({ message: "user is not " });
  }

  try {
    const newTask = new Task({
      ...validatedData,
      user: user as string,
    });
    const savedTask = await newTask.save();

    Logger.silly("Task created succesfully");
    res.status(201).json({ message: "Task created succesfully", savedTask });
  } catch (error) {
    if (error instanceof z.ZodError) {
      Logger.error("Validation error in createTask:", error.errors);
      return res.status(400).json({ errors: error.errors });
    }
    Logger.error("Error in createTask:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllTasks = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (error) {
    Logger.error("Error in getAllTasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTaskById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, user: req.user });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    Logger.error("Error in getTaskById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const validateData = updateTaskSchema.parse(req.body);

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: req.user },
      validateData,
      { new: true, runValidators: true }
    );
    if (!updateTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
  } catch (error) {
    if (error instanceof z.ZodError) {
      Logger.error("Validation error in updateTask:", error.errors);
      return res.status(400).json({ errors: error.errors });
    }
    Logger.error("Error in updateTask:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    Logger.error("Error in deleteTask:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
