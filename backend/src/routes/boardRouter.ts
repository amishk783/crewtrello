import {
  deleteBoard,
  createBoard,
  getBoardById,
  getAllBoards,
  updateBoard,
} from "@/controllers/board/board";

import express from "express";

const router = express.Router();

router.post("/", createBoard);
router.get("/", getAllBoards);
router.get("/:id", getBoardById);
router.put("/:id", updateBoard);
router.delete("/:id", deleteBoard);


export const boardRouter = router;
