import express from "express";

import {
  createCard,
  getAllCards,
  getCardById,
  updateCard,
  deleteCard,
} from "@/controllers/board/card";
const router = express.Router();

router.post("/", createCard);
router.get("/", getAllCards);
router.get("/:id", getCardById);
router.put("/", updateCard);
router.delete("/:id", deleteCard);

export const todoRouter = router;
