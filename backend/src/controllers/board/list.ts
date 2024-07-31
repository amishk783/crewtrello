import { Response } from "express";

import { AuthenticatedRequest } from "@/types";
import { listValidationSchema } from "@/utils/validationSchema";
import List from "@/db/schema/List";
import Logger from "@/utils/logger";
import { z } from "zod";

export const createList = async (req: AuthenticatedRequest, res: Response) => {
  console.log("reqbody", req.body);
  const validateData = listValidationSchema.parse({
    ...req.body,
    boardId: req.body.board_id,
  });
  console.log(validateData.boardId);
  try {
    const newList = new List({
      board_id: validateData.boardId,
      ...validateData,
      user: req.user,
    });
    const savedList = await newList.save();

    Logger.silly("List created succesfully");
    res.status(201).json({ message: "List created succesfully", savedList });
  } catch (error) {
    if (error instanceof z.ZodError) {
      Logger.error("Validation error in createList:", error.errors);
      return res.status(400).json({ errors: error.errors });
    }
    Logger.error("Error in createList:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllList = async (req: AuthenticatedRequest, res: Response) => {
  const { id: boardId } = req.body;
  try {
    const lists = await List.find({ board_id: boardId });
    console.log();
    res.json(lists);
  } catch (error) {
    Logger.error("Error in getAllList:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getListById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { boardId } = req.body;
    console.log("🚀 ~ getListById ~ boardId:", boardId);
    const list = await List.findOne({ _id: id, board_id: boardId });
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    res.json(list);
  } catch (error) {
    Logger.error("Error in getListById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateList = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const validateData = listValidationSchema.parse(req.body);

    const updatedList = await List.findOneAndUpdate(
      { _id: id, board_id: validateData.boardId },
      validateData,
      { new: true, runValidators: true }
    );
    if (!updatedList) {
      return res.status(404).json({ message: "Listnot found" });
    }
    res.json(updatedList);
  } catch (error) {
    if (error instanceof z.ZodError) {
      Logger.error("Validation error in updateTask:", error.errors);
      return res.status(400).json({ errors: error.errors });
    }
    Logger.error("Error in updateList:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteList = async (req: AuthenticatedRequest, res: Response) => {
  const { board_id } = req.body;

  try {
    const deletedList = await List.findOneAndDelete({
      _id: req.params.id,
      board_id,
    });
    if (!deletedList) {
      return res.status(404).json({ message: "List not found" });
    }
    res.json({ message: "List deleted successfully" });
  } catch (error) {
    Logger.error("Error in deleteList:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
