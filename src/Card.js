//import { useState } from "react";
//import { XIcon } from "@heroicons/react/outline";
import styles from "./Card.module.css";

function Card({ cardName }) {
  return <div className={styles.Card}>{cardName}</div>;
}

export default Card;
