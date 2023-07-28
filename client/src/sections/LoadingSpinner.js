import styles from "./LoadingSpinner.module.css";

function LoadingSpinner(props) {
  return (
    <div className={styles["spinner-container"]}>
      <div className={styles["loading-spinner"]}></div>
    </div>
  );
}

export default LoadingSpinner;
