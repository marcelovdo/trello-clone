import { BACKEND_URL } from "./DataConfig";

export const fetchLists = async () => {
  const response = await fetch(`${BACKEND_URL}/lists`);
  const lists = await response.json();
  return lists.listNames;
};

export const postList = async () => {};

export const deleteList = async () => {};
