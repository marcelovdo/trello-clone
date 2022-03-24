import { useState } from "react";
import Card from "./Card";
import TitleClose from "./TitleClose";
import AddCardButton from "./AddCardButton";
import styles from "./List.module.css";

function List({ id, listName, isAddingList, onFinishAdding, onRemove }) {
  const [inputListName, setInputListName] = useState("");
  const [cardList, setCardList] = useState([]);
  const [cardName, setCardName] = useState("");
  const [isAddingCard, setIsAddingCard] = useState(false);

  const handleSubmitList = (e) => {
    e.preventDefault();
    onFinishAdding(inputListName);
    setInputListName("");
  };

  const handleSubmitCard = (e) => {
    e.preventDefault();
    setCardList((prev) => prev.concat([cardName]));
    setCardName("");
    setIsAddingCard(false);
  };

  const handleChangeList = (e) => {
    setInputListName(e.target.value);
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

  const listMarkup = (
    <>
      <TitleClose id={id} name={listName} onRemove={onRemove} />
      {cardListMarkup}
      {!isAddingCard ? (
        <AddCardButton onClick={openCardInput} />
      ) : (
        addCardInputMarkup
      )}
    </>
  );

  const formAddListMarkup = (
    <form onSubmit={handleSubmitList}>
      <input
        type="text"
        placeholder="Enter list title..."
        name="ltitle"
        onChange={handleChangeList}
        value={inputListName}
        required
      />
      <input type="submit" value="Add list" />
    </form>
  );

  return (
    <div className={styles.List}>
      {!isAddingList ? listMarkup : formAddListMarkup}
    </div>
  );
}

export default List;
