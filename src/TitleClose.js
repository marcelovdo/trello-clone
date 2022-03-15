import { XIcon } from "@heroicons/react/outline";
import styles from "./TitleClose.module.css";

function TitleClose({ id, name, onRemove }) {
  const handleRemove = () => {
    if (id !== null) {
      onRemove(id);
    }
  };

  return (
    <div className={styles.TitleClose}>
      {name}
      <XIcon className={styles["close-icon"]} onClick={handleRemove} />
    </div>
  );
}

export default TitleClose;
