import { useEffect, useState } from "react";
import Card from "./Card";
import AddCardButton from "../buttons/AddCardButton";
import CloseButton from "../buttons/CloseButton";
import LoadingSpinner from "./LoadingSpinner";
import { fetchCards, postCard, deleteCard } from "../data/CardData";
import styles from "./List.module.css";

function List({ id, listName, onRemove }) {
  const [cardList, setCardList] = useState([]);
  const [cardName, setCardName] = useState("");
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isLoadingCards, setIsLoadingCards] = useState(false);

  useEffect(() => {
    const fetchCardData = async () => {
      setIsLoadingCards(true);
      const result = await fetchCards(id);
      setCardList(result);
      setIsLoadingCards(false);
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
    setCardList((prev) => prev.concat([{ id: cardId, name: cardName }]));
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
    setCardList((prev) => prev.filter((card) => card.id !== cardId));
  };

  const cardListMarkup = cardList.map((card) => (
    <Card
      id={card.id}
      key={card.id}
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

  const cardsAndButtonMarkup = (
    <>
      {cardListMarkup}
      {!isAddingCard ? (
        <AddCardButton onClick={openCardInput} />
      ) : (
        addCardInputMarkup
      )}
    </>
  );

  return (
    <div className={styles.List}>
      <div className={styles["list-title"]}>
        {listName}
        <CloseButton id={id} onClose={onRemove} size="sm" />
      </div>
      {isLoadingCards ? <LoadingSpinner /> : cardsAndButtonMarkup}
    </div>
  );
}

export default List;
