import { useState } from "react";
import styles from "./FormAddList.module.css";

function FormAddList({ onFinishAdding }) {
  const [inputListName, setInputListName] = useState("");

  const handleSubmitList = (e) => {
    e.preventDefault();
    onFinishAdding(inputListName);
    setInputListName("");
  };

  const handleChangeList = (e) => {
    setInputListName(e.target.value);
  };

  return (
    <form className={styles.FormAddList} onSubmit={handleSubmitList}>
      <input
        className={styles["list-input-name"]}
        type="text"
        placeholder="Enter list title..."
        name="ltitle"
        onChange={handleChangeList}
        value={inputListName}
        autoFocus
        required
      />
      <input
        type="submit"
        value="Add list"
        className={styles["list-input-button"]}
      />
    </form>
  );
}

export default FormAddList;
