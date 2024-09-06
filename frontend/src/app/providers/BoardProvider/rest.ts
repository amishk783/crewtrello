import { fetchDoc } from "@/app/_utils/api/fetchDoc";
import { Boards } from ".";
import { fetchDocs } from "@/app/_utils/api/fetchDocs";

export const createBoard = async (data: any) => {
  const options = {
    slug: "board",
    payload: data,
    method: "POST",
  };
  return fetchDoc(options);
};
export const updateBoard = async (data: any) => {
  const options = {
    slug: "board",
    payload: data,
    method: "POST",
  };
  return fetchDoc(options);
};

export const getAllBoards = async () => {
  const options = {
    slug: "board",
    method: "GET",
  };
  return fetchDocs(options);
};
export const getBoardById = async (params: string) => {
  const options = {
    slug: "board",
    method: "GET",
    params,
  };
  return fetchDoc(options);
};
