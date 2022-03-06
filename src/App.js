import NavBar from "./NavBar";
import Board from "./Board";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Board />
      {/* <SideBar /> */}
    </div>
  );
}

export default App;
