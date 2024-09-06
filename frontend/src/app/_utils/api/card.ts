import { fetchDoc } from "./fetchDoc";
import { fetchDocs } from "./fetchDocs";

export const createCard= async (data) => {
  const options = {
    slug: "task",
    method: "POST",
    payload: data,
  };
  return fetchDoc(options);
};

export const updateCard= async (data) => {
  const options = {
    slug: "task",
    method: "PUT",
    payload: data,
  };
  return fetchDoc(options);
};

export const deleteCard= async (params: string) => {
  const options = {
    slug: "task",
    method: "DELETE",
    params,
  };
  return fetchDoc(options);
};
export const getAllCards= async (id: string, boardId: string) => {
  const options = {
    slug: "task",
    method: "GET",
    params: {
      listId: id,
      boardId: boardId,
    },
  };
  return fetchDocs(options);
};
