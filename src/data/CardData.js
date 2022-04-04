import { BACKEND_URL } from "./DataConfig";

export const fetchCards = async (listId) => {
  const response = await fetch(`${BACKEND_URL}/lists/${listId}/cards`);
  const cards = await response.json();
  return cards.cards;
};

export const postCard = async (cardName) => {
  const fetchOptions = {
    method: "POST",
    body: JSON.stringify({ cardName: cardName }),
    headers: { "Content-Type": "application/json" },
  };
  /*const response = await fetch(`${BACKEND_URL}/lists/new`, fetchOptions);
  const resData = await response.json();
  return resData._id;*/
};

export const deleteCard = async (id) => {
  const fetchOptions = {
    method: "DELETE",
  };
  //await fetch(`${BACKEND_URL}/lists/${id}`, fetchOptions);
};
