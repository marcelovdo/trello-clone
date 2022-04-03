import { useState } from "react";
import List from "./List";
import AddListButton from "../buttons/AddListButton";
import FormAddList from "../forms/FormAddList";
import styles from "./Board.module.css";

function Board() {
  const [listList, setListList] = useState(["To Do", "Doing", "Done"]);
  const [isAddingList, setIsAddingList] = useState(false);

  const beginAdding = () => {
    setIsAddingList(true);
  };

  const closeAddlListForm = () => {
    setIsAddingList(false);
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
        <FormAddList
          onFinishAdding={finishAdding}
          onClose={closeAddlListForm}
        />
      ) : (
        <AddListButton onClick={beginAdding} />
      )}
    </div>
  );
}

export default Board;
