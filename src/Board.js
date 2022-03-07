import Card from "./Card";
import styles from "./Board.module.css";

function Board() {
  return (
    <div className={styles.Board}>
      <Card />
      <Card />
    </div>
  );
}

export default Board;
