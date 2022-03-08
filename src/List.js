import { useState } from "react";
import styles from "./List.module.css";

function List({ listName, isAddingList, onFinishAdding }) {
  const [inputListName, setInputListName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFinishAdding(inputListName);
  };

  const handleChange = (e) => {
    setInputListName(e.target.value);
  };

  return (
    <div className={styles.List}>
      {!isAddingList ? (
        listName
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
