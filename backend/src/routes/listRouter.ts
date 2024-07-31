import {
  createList,
  updateList,
  deleteList,
  getAllList,
  getListById,
} from "@/controllers/board/list";

import express from "express";

const router = express.Router();

router.post("/", createList);
router.get("/", getAllList);
router.get("/:id", getListById);
router.put("/:id", updateList);
router.delete("/:id", deleteList);

export const listRouter = router;
