import { BACKEND_URL } from "./DataConfig";

export const fetchLists = async () => {
  const response = await fetch(`${BACKEND_URL}/lists`);
  const lists = await response.json();
  return lists.lists;
};

export const postList = async (listName) => {
  const fetchOptions = {
    method: "POST",
    body: JSON.stringify({ listName: listName }),
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(`${BACKEND_URL}/lists/new`, fetchOptions);
  const resData = await response.json();
  return resData.id;
};

export const deleteList = async (id) => {
  const fetchOptions = {
    method: "DELETE",
  };
  await fetch(`${BACKEND_URL}/lists/${id}`, fetchOptions);
};
