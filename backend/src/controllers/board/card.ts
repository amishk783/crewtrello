import { Request, Response } from "express";

import Logger from "@/utils/logger";
import { AuthenticatedRequest } from "@/types";
import { taskSchema, updateTaskSchema } from "@/utils/validationSchema";
import Card from "@/db/schema/Card";
import { z } from "zod";

export const createCard = async (req: AuthenticatedRequest, res: Response) => {
  const validatedData = taskSchema.parse(req.body);

  const user = req.user;
  console.log(validatedData.listId);

  try {
    const newCard = new Card({
      ...validatedData,
      list_id: validatedData.listId,
      user_id: user as string,
      board_id: validatedData.boardId,
    });
    const data = await newCard.save();

    Logger.silly("Card created succesfully");
    res.status(201).json({ message: "Card created succesfully", data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      Logger.error("Validation error in createCard:", error.errors);
      return res.status(400).json({ errors: error.errors });
    }
    Logger.error("Error in createCard:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllCards = async (req: AuthenticatedRequest, res: Response) => {
  const { boardId } = req.query;
  console.log("🚀 ~ getAllCards~ board:", boardId);
  try {
    const cards = await Card.find({ user_id: req.user, board_id: boardId });
    console.log("🚀 ~ getAllCards ~ tasks:", cards);
    res.json(cards);
  } catch (error) {
    Logger.error("Error in getAllCards:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCardById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const card = await Card.findOne({ _id: id, user_id: req.user });
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.json(card);
  } catch (error) {
    Logger.error("Error in getCardById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCard= async (req: AuthenticatedRequest, res: Response) => {
  try {
    const validateData = updateTaskSchema.parse(req.body);

    const updatedCard = await Card.findOneAndUpdate(
      { _id: validateData._id, user_id: req.user },
      { ...validateData, list_id: validateData.listId },
      { new: true, runValidators: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.json(updatedCard);
  } catch (error) {
    if (error instanceof z.ZodError) {
      Logger.error("Validation error in updateCard :", error.errors);
      return res.status(400).json({ errors: error.errors });
    }
    Logger.error("Error in updateCard:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCard = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const deletedCard = await Card.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user,
    });
    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    Logger.error("Error in deleteCard:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
