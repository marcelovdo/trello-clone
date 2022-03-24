import { PlusIcon } from "@heroicons/react/outline";
import styles from "./AddListButton.module.css";

function AddListButton({ onClick }) {
  return (
    <div className={styles.AddListButton} onClick={onClick}>
      <PlusIcon className={styles["plus-icon"]} />
      Add Another List
    </div>
  );
}

export default AddListButton;
