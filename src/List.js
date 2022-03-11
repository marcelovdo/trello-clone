import { useState } from "react";
import { XIcon, PlusIcon } from "@heroicons/react/outline";
import styles from "./List.module.css";

function List({ id, listName, isAddingList, onFinishAdding, onRemove }) {
  const [inputListName, setInputListName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFinishAdding(inputListName);
  };

  const handleChange = (e) => {
    setInputListName(e.target.value);
  };

  const handleRemove = (e) => {
    if (id !== null) {
      onRemove(id);
    }
  };

  return (
    <div className={styles.List}>
      {!isAddingList ? (
        <>
          <div className={styles["list-title"]}>
            {listName}
            <XIcon className={styles["close-icon"]} onClick={handleRemove} />
          </div>
          <div className={styles["list-add-card"]}>
            <PlusIcon className={styles["plus-icon"]} />
            Add a card
          </div>
        </>
      ) : (
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
      )}
    </div>
  );
}

export default List;
