import { useState } from "react";
import { PlusIcon } from "@heroicons/react/outline";
import Card from "./Card";
import TitleClose from "./TitleClose";
import styles from "./List.module.css";

function List({ id, listName, isAddingList, onFinishAdding, onRemove }) {
  const [inputListName, setInputListName] = useState("");
  const [cardList, setCardList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFinishAdding(inputListName);
  };

  const handleChange = (e) => {
    setInputListName(e.target.value);
  };

  const openCardInput = () => {
    // toggle textarea
    setCardList((prev) => prev.concat(["teste"]));
  };

  const removeCard = (id) => {
    setCardList((prev) => prev.filter((_, i) => i !== id));
  };

  const cardListMarkup = cardList.map((card, i) => (
    <Card id={i} key={i} cardName={card} onRemove={removeCard} />
  ));

  const listMarkup = (
    <>
      <TitleClose id={id} name={listName} onRemove={onRemove} />
      {cardListMarkup}
      <div className={styles["list-add-card"]} onClick={openCardInput}>
        <PlusIcon className={styles["plus-icon"]} />
        Add a card
      </div>
    </>
  );

  const formAddListMarkup = (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter list title..."
        name="ltitle"
        onChange={handleChange}
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
