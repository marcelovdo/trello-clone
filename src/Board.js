import { useState } from "react";
import List from "./List";
import AddListButton from "./AddListButton";
import FormAddList from "./FormAddList";
import styles from "./Board.module.css";

function Board() {
  const [listList, setListList] = useState(["To Do", "Doing", "Done"]);
  const [isAddingList, setIsAddingList] = useState(false);

  const beginAdding = () => {
    setIsAddingList(true);
  };

  const finishAdding = (listName) => {
    setIsAddingList(false);
    setListList((prev) => prev.concat([listName]));
  };

  const removeList = (id) => {
    setListList((prev) => prev.filter((_, i) => i !== id));
  };

  return (
    <div className={styles.Board}>
      {listList.map((listName, i) => (
        <List key={i} id={i} listName={listName} onRemove={removeList} />
      ))}
      {isAddingList ? (
        <FormAddList onFinishAdding={finishAdding} />
      ) : (
        <AddListButton onClick={beginAdding} />
      )}
    </div>
  );
}

export default Board;
