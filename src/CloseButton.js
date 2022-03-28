import { XIcon } from "@heroicons/react/outline";
import styles from "./CloseButton.module.css";

function CloseButton({ id, onClose, size }) {
  const handleClose = () => {
    if (id !== null) {
      onClose(id);
    }
  };

  return <XIcon className={styles.CloseButton} onClick={handleClose} />;
}

export default CloseButton;
