import styles from "./List.module.css";

function List({ listName }) {
  return <div className={styles.List}>{listName}</div>;
}

export default List;
