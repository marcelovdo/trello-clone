import { XIcon } from "@heroicons/react/outline";
import styles from "./CloseButton.module.css";

function CloseButton({ id, onClose, size }) {
  const handleClose = () => {
    onClose(id);
  };

  return (
    <XIcon className={styles[`CloseButton-${size}`]} onClick={handleClose} />
  );
}

export default CloseButton;
