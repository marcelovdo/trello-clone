import { useState } from "react";
import CloseButton from "../buttons/CloseButton";
import styles from "./FormAddList.module.css";

function FormAddList({ onFinishAdding, onClose }) {
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
      <div className={styles["list-input-button-bar"]}>
        <input
          type="submit"
          value="Add list"
          className={styles["list-input-button"]}
        />
        <CloseButton onClose={onClose} size="lg" />
      </div>
    </form>
  );
}

export default FormAddList;
