import { useState } from "react";
import List from "./List";
import styles from "./Board.module.css";

function Board() {
  const [listList, setListList] = useState(["To Do", "Doing", "Done"]);

  const addNewList = () => {
    setListList((prev) => prev.concat("New List"));
  };

  return (
    <div className={styles.Board}>
      {listList.map((listName, i) => {
        return <List key={i} listName={listName} />;
      })}
      <button className={styles.buttonAdd} onClick={addNewList}>
        + Add Another List
      </button>
    </div>
  );
}

export default Board;
