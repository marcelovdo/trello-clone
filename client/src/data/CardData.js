import { BACKEND_URL } from "./DataConfig";

export const fetchCards = async (listId) => {
  const response = await fetch(`${BACKEND_URL}/lists/${listId}/cards`);
  const cards = await response.json();
  return cards.cards;
};

export const postCard = async (listId, cardName) => {
  const fetchOptions = {
    method: "POST",
    body: JSON.stringify({ cardName: cardName }),
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `${BACKEND_URL}/lists/${listId}/cards/new`,
    fetchOptions
  );
  const resData = await response.json();
  console.log("response: ", resData);
  return resData.id;
};

export const deleteCard = async (listId, cardId) => {
  const fetchOptions = {
    method: "DELETE",
  };
  await fetch(`${BACKEND_URL}/lists/${listId}/cards/${cardId}`, fetchOptions);
};
