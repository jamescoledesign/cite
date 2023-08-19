import * as React from "react";
// @ts-ignore
import styles from "./button.module.css"

function alertMe() {
    console.log("Button was clicked");
}

export function Button(props) {
  return <button onClick={alertMe} className={styles.primary}>{props.text}</button>;
}