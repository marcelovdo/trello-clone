import { useState, useEffect } from "react";
import List from "./List";
import AddListButton from "../buttons/AddListButton";
import FormAddList from "../forms/FormAddList";
import { fetchLists, postList, deleteList } from "../data/ListData";
import styles from "./Board.module.css";

function Board() {
  const [listList, setListList] = useState([]);
  const [isAddingList, setIsAddingList] = useState(false);

  useEffect(() => {
    const fetchListData = async () => {
      const result = await fetchLists();
      setListList(result);
    };
    fetchListData();
  }, []);

  const asyncPostList = async (listName) => {
    const id = await postList(listName);
    return id;
  };

  const beginAdding = () => {
    setIsAddingList(true);
  };

  const closeAddlListForm = () => {
    setIsAddingList(false);
  };

  const finishAdding = async (listName) => {
    setIsAddingList(false);
    const id = await asyncPostList(listName);
    setListList((prev) => prev.concat([{ name: listName, _id: id }]));
  };

  const removeList = (id) => {
    deleteList(id);
    setListList((prev) => prev.filter((list) => list._id !== id));
  };

  return (
    <div className={styles.Board}>
      {listList.map((list) => (
        <List
          key={list._id}
          id={list._id}
          listName={list.name}
          onRemove={removeList}
        />
      ))}
      {isAddingList ? (
        <FormAddList
          onFinishAdding={(listName) => finishAdding(listName)}
          onClose={closeAddlListForm}
        />
      ) : (
        <AddListButton onClick={beginAdding} />
      )}
    </div>
  );
}

export default Board;
