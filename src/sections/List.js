import { useEffect, useState } from "react";
import Card from "./Card";
import AddCardButton from "../buttons/AddCardButton";
import CloseButton from "../buttons/CloseButton";
import { fetchCards, postCard, deleteCard } from "../data/CardData";
import styles from "./List.module.css";

function List({ id, listName, onRemove }) {
  const [cardList, setCardList] = useState([]);
  const [cardName, setCardName] = useState("");
  const [isAddingCard, setIsAddingCard] = useState(false);

  useEffect(() => {
    const fetchCardData = async () => {
      const result = await fetchCards(id);
      setCardList(result);
    };
    fetchCardData();
  }, [id]);

  const asyncPostCard = async (listId, cardName) => {
    const cardId = await postCard(listId, cardName);
    return cardId;
  };

  const handleSubmitCard = async (e) => {
    e.preventDefault();
    const cardId = await asyncPostCard(id, cardName);
    setCardList((prev) => prev.concat([{ _id: cardId, name: cardName }]));
    setCardName("");
    setIsAddingCard(false);
  };

  const handleChangeCard = (e) => {
    setCardName(e.target.value);
  };

  const openCardInput = () => {
    setIsAddingCard(true);
  };

  const closeCardInput = () => {
    setCardName("");
    setIsAddingCard(false);
  };

  const removeCard = (cardId) => {
    deleteCard(id, cardId);
    setCardList((prev) => prev.filter((card) => card._id !== cardId));
  };

  const cardListMarkup = cardList.map((card) => (
    <Card
      id={card._id}
      key={card._id}
      cardName={card.name}
      onRemove={removeCard}
    />
  ));

  const addCardInputMarkup = (
    <form onSubmit={(e) => handleSubmitCard(e)}>
      <textarea
        className={styles["list-add-card-text"]}
        value={cardName}
        onChange={handleChangeCard}
        placeholder="Enter a title for this card..."
        autoFocus
      />
      <div className={styles["list-add-card-button-bar"]}>
        <input
          className={styles["list-add-card-submit"]}
          type="submit"
          value="Add card"
        />
        <CloseButton onClose={closeCardInput} size="lg" />
      </div>
    </form>
  );

  return (
    <div className={styles.List}>
      <div className={styles["list-title"]}>
        {listName}
        <CloseButton id={id} onClose={onRemove} size="sm" />
      </div>
      {cardListMarkup}
      {!isAddingCard ? (
        <AddCardButton onClick={openCardInput} />
      ) : (
        addCardInputMarkup
      )}
    </div>
  );
}

export default List;
