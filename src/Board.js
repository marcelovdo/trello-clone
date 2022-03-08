import { useState } from "react";
import List from "./List";
import styles from "./Board.module.css";

function Board() {
  const [listList, setListList] = useState(["To Do", "Doing", "Done"]);
  const [isAddingList, setIsAddingList] = useState(false);

  const beginAdding = () => {
    setIsAddingList(true);
  };

  const finishAdding = (listName) => {
    setIsAddingList(false);
    setListList((prev) => prev.concat(listName));
  };

  return (
    <div className={styles.Board}>
      {listList.map((listName, i) => {
        return (
          <List
            key={i}
            listName={listName}
            isAddingList={false}
            onFinishAdding={finishAdding}
          />
        );
      })}
      {isAddingList ? (
        <List listName={""} isAddingList={true} onFinishAdding={finishAdding} />
      ) : (
        <button className={styles["button-add"]} onClick={beginAdding}>
          + Add Another List
        </button>
      )}
    </div>
  );
}

export default Board;
