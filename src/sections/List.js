import { useState } from "react";
import Card from "./Card";
import AddCardButton from "../buttons/AddCardButton";
import CloseButton from "../buttons/CloseButton";
import styles from "./List.module.css";

function List({ id, listName, onRemove }) {
  const [cardList, setCardList] = useState([]);
  const [cardName, setCardName] = useState("");
  const [isAddingCard, setIsAddingCard] = useState(false);

  const handleSubmitCard = (e) => {
    e.preventDefault();
    setCardList((prev) => prev.concat([cardName]));
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

  const removeCard = (id) => {
    setCardList((prev) => prev.filter((_, i) => i !== id));
  };

  const cardListMarkup = cardList.map((card, i) => (
    <Card id={i} key={i} cardName={card} onRemove={removeCard} />
  ));

  const addCardInputMarkup = (
    <form onSubmit={handleSubmitCard}>
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
