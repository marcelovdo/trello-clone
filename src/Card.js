import TitleClose from "./TitleClose";
import styles from "./Card.module.css";

function Card({ id, cardName, onRemove }) {
  return (
    <div className={styles.Card}>
      <TitleClose id={id} name={cardName} onRemove={onRemove} />
    </div>
  );
}

export default Card;
