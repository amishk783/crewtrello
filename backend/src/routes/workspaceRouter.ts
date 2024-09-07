import {
  deleteBoard,
  createWorkspace,
  getBoardById,
  getAllBoards,
  updateBoard,
} from "@/controllers/board/workspace";

import express from "express";

const router = express.Router();

router.post("/", createWorkspace);
router.get("/", getAllBoards);
router.get("/:id", getBoardById);
router.put("/:id", updateBoard);
router.delete("/:id", deleteBoard);

export const workspaceRouter = router;
