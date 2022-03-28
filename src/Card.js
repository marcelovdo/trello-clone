import CloseButton from "./CloseButton";
import styles from "./Card.module.css";

function Card({ id, cardName, onRemove }) {
  return (
    <div className={styles.Card}>
      <div className={styles["card-title"]}>
        {cardName}
        <CloseButton id={id} onClose={onRemove} size="sm" />
      </div>
    </div>
  );
}

export default Card;
