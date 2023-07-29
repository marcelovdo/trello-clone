import NavBar from "./sections/NavBar";
import Board from "./sections/Board";
import styles from "./App.module.css";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

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
