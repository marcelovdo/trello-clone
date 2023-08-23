import { useState, useEffect } from "react";
import List from "./List";
import AddListButton from "../buttons/AddListButton";
import FormAddList from "../forms/FormAddList";
import { fetchLists, postList, deleteList } from "../data/ListData";
import LoadingSpinner from "./LoadingSpinner";
import styles from "./Board.module.css";

function Board() {
  const [listList, setListList] = useState([]);
  const [isAddingList, setIsAddingList] = useState(false);
  const [isLoadingLists, setIsLoadingLists] = useState(false);

  useEffect(() => {
    const fetchListData = async () => {
      setIsLoadingLists(true);
      const result = await fetchLists();
      setListList(result);
      setIsLoadingLists(false);
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
    setListList((prev) => prev.concat([{ name: listName, id: id }]));
  };

  const removeList = (id) => {
    deleteList(id);
    setListList((prev) => prev.filter((list) => list.id !== id));
  };

  const renderButton = isAddingList ? (
    <FormAddList
      onFinishAdding={(listName) => finishAdding(listName)}
      onClose={closeAddlListForm}
    />
  ) : (
    <AddListButton onClick={beginAdding} />
  );

  const renderBoard = (
    <>
      {listList.map((list) => (
        <List
          key={list.id}
          id={list.id}
          listName={list.name}
          onRemove={removeList}
        />
      ))}
      {renderButton}
    </>
  );

  return (
    <div className={styles.Board}>
      {isLoadingLists ? <LoadingSpinner /> : renderBoard}
    </div>
  );
}

export default Board;
