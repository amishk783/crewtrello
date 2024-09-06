"use client";

import api from "@/app/_utils/api/axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "../AuthProvider";
import { fetchDocs } from "@/app/_utils/api/fetchDocs";
import { getAllList } from "@/app/_utils/api/list";
import { getAllCards } from "@/app/_utils/api/card";
import { Card, ListType, Board } from "../../../../typings";

interface BoardContextType {
  currentBoard: Board;
  setBoardState: (board: Board) => void;
  getCurrentBoard: (id: string) => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

const BoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentBoard, setCurrentBoard] = useState<Board>({
    lists: new Map<string, ListType>(),
  });
  const [loading, setLoading] = useState<boolean>(false);

  const { session } = useAuth();

  const getCurrentBoard = useCallback(
    async (id: string) => {
      try {
        if (!session) return;
        setLoading(true);
        const boardId = id;
        console.log("🚀 ~ boardId:", boardId);

        const [fetchedLists, fetchedTasks] = await Promise.all([
          getAllList(id) as unknown as ListType[],
          getAllCards("", id) as unknown as Card[],
        ]);

        const lists = new Map<string, ListType>();
        fetchedLists.forEach((list) => {
          lists.set(list._id, {
            _id: list._id,
            cards: [],
            name: list.name,
            position: list.position,
          });
        });

        fetchedTasks.forEach((task) => {
          const list = lists.get(task.list_id);
          if (list) {
            list.cards.push({
              _id: task._id,
              createdAt: task.createdAt,
              title: task.title,
              status: task.status,
              description: task.description,
              deadline: task.deadline,
              list_id: task.list_id,
            });
          }
        });

        setCurrentBoard((prevBoard) => {
          const updatedBoard = { ...prevBoard, lists };

          return updatedBoard;
        });
      } catch (error) {
        console.log(error);
      }
    },
    [session]
  );
  console.log(currentBoard);

  const setBoardState = (board: Board) => {
    setCurrentBoard(board);
  };

  const contextValue = useMemo(
    () => ({
      getCurrentBoard,
      setBoardState,
      currentBoard,
    }),
    [getCurrentBoard, currentBoard]
  );
  return (
    <BoardContext.Provider value={contextValue}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
export const useBoard = () => {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a ColumnProvider");
  }
  return context;
};
