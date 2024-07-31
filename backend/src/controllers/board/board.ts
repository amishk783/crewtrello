import { Response } from "express";
import { AuthenticatedRequest } from "@/types";
import { boardScehma } from "@/utils/validationSchema";
import Board from "@/db/schema/Board";
import Logger from "@/utils/logger";
import { z } from "zod";

export const createBoard = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const validateData = boardScehma.parse(req.body);

    const user = req.user;
    const newBoard = new Board({
      ...validateData,
      user_id: user,
    });

    const savedBoard = await newBoard.save();

    Logger.silly("Board created succesfully");
    res.status(201).json({ message: "Board created succesfully", savedBoard });
  } catch (error) {
    if (error instanceof z.ZodError) {
      Logger.error("Validation error in createBoard:", error.errors);
      return res.status(400).json({ errors: error.errors });
    }
    Logger.error("Error in createBoard:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBoardById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id: boardId } = req.params;

    const board = await Board.findById({ _id: boardId, user_id: req.user });
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
    const boards = await Board.find({ user_id: req.user });
    res.json(boards);
  } catch (error) {
    Logger.error("Error in getAllTasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateBoard = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id: boardId } = req.params;

    const validateData = boardScehma.parse(req.body);

    const updatedBoard = await Board.findOneAndUpdate(
      { _id: boardId, user_id: req.user },
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

  try {
    const deletedBoard = await Board.findOneAndDelete({
      _id: id,
      user_id: req.user,
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
