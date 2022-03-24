import { PlusIcon } from "@heroicons/react/outline";
import styles from "./AddCardButton.module.css";

function AddCardButton({ id, onClick }) {
  return (
    <div className={styles.AddCardButton} onClick={onClick}>
      <PlusIcon className={styles["plus-icon"]} />
      Add a card
    </div>
  );
}

export default AddCardButton;
