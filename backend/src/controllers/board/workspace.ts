import { Response } from "express";
import { AuthenticatedRequest } from "@/types";
import { workspaceValidationSchema } from "@/utils/validationSchema";
import Board from "@/db/schema/Board";
import Logger from "@/utils/logger";
import { z } from "zod";
import Profile from "@/db/schema/Profile";
import Workspace from "@/db/schema/Workspace";

export const createWorkspace = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const validateData = workspaceValidationSchema.parse(req.body);

    const user = req.user;

    const profile = await Profile.findOne({
      user_id: req.user,
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    const newWorkspace = await new Workspace({
      ...validateData,
    });

    newWorkspace.members.push({ role: "admin", profile: profile._id });

    const data = await newWorkspace.save();

    Logger.silly("Workspace created succesfully");
    res.status(201).json({ message: "Workspace created succesfully", data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      Logger.error("Validation error in createWorkspace:", error.errors);
      return res.status(400).json({ errors: error.errors });
    }
    Logger.error("Error in createWorkspace:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBoardById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id: boardId } = req.params;

    const profile = await Profile.findOne({
      user_id: req.user,
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const board = await Board.findById({
      _id: boardId,
      profile_id: profile._id,
    });
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    res.json(board);
  } catch (error) {
    Logger.error("Error in getTaskById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllBoards = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const profile = await Profile.findOne({
      user_id: req.user,
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const boards = await Board.find({ profile_id: profile._id });
    console.log("🚀 ~ boards:", boards);
    res.json(boards);
  } catch (error) {
    Logger.error("Error in getAllTasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateBoard = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id: boardId } = req.params;

    const validateData = workspaceValidationSchema.parse(req.body);

    const profile = await Profile.findOne({
      user_id: req.user,
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const updatedBoard = await Board.findOneAndUpdate(
      { _id: boardId, profile_id: profile._id },
      validateData,
      { new: true, runValidators: true }
    );

    if (!updatedBoard) {
      return res.status(404).json({ message: "Board not found" });
    }
    res.json(updatedBoard);
  } catch (error) {
    if (error instanceof z.ZodError) {
      Logger.error("Validation error in updateBoard:", error.errors);
      return res.status(400).json({ errors: error.errors });
    }
    Logger.error("Error in updateBoard:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBoard = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(500).json({ message: "Id is not provided" });
  }
  const profile = await Profile.findOne({
    user_id: req.user,
  });

  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }
  try {
    const deletedBoard = await Board.findOneAndDelete({
      _id: id,
      profile_id: profile._id,
    });
    if (!deletedBoard) {
      return res.status(404).json({ message: "Board not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    Logger.error("Error in deleteTask:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
