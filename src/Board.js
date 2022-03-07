import { useState } from "react";
import List from "./List";
import styles from "./Board.module.css";

function Board() {
  const [listList, setListList] = useState(["To Do", "Doing", "Done"]);

  return (
    <div className={styles.Board}>
      {listList.map((listName, i) => {
        return <List key={i} listName={listName} />;
      })}
    </div>
  );
}

export default Board;
