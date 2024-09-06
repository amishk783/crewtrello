import { fetchDoc } from "./fetchDoc";
import { fetchDocs } from "./fetchDocs";

export const createList = async (data) => {
  const options = {
    slug: "list",
    method: "POST",
    payload: data,
  };
  return fetchDoc(options);
};

export const updateList = async (data, id) => {
  const options = {
    slug: "list",
    method: "PUT",
    payload: data,
    params: {
      id,
    },
  };
  return fetchDoc(options);
};

export const deleteList = async (params: string) => {
  const options = {
    slug: "list",
    method: "DELETE",
  };
  return fetchDoc(options);
};
export const getAllList = async (id: string) => {
  const options = {
    slug: "list",
    method: "GET",
    params: {
      boardId: id,
    },
  };
  return fetchDocs(options);
};
