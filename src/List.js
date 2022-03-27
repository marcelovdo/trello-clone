import { useState } from "react";
import Card from "./Card";
import TitleClose from "./TitleClose";
import AddCardButton from "./AddCardButton";
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

  const removeCard = (id) => {
    setCardList((prev) => prev.filter((_, i) => i !== id));
  };

  const cardListMarkup = cardList.map((card, i) => (
    <Card id={i} key={i} cardName={card} onRemove={removeCard} />
  ));

  const addCardInputMarkup = (
    <form onSubmit={handleSubmitCard}>
      <textarea
        value={cardName}
        onChange={handleChangeCard}
        placeholder="Enter a title for this card..."
      />
      <input type="submit" value="Add card" />
    </form>
  );

  return (
    <div className={styles.List}>
      <TitleClose id={id} name={listName} onRemove={onRemove} />
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
