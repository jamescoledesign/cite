import * as React from "react";
// @ts-ignore
import styles from "./meatballsMenu.module.css"

let clicked = false;
let open = false;

function btnClick() {
  clicked = !clicked;
  toggleMeatballs();
}

function toggleMeatballs() {
  
  let button = document.getElementById("meatballs");
  let dropdown = document.getElementById("meatball-drop-content");

  if (open === false) {
    button.style.backgroundColor = "var(--main-blue)";
    button.style.color = "white";
    dropdown.style.display = "flex";
    open = true;
  } else if (open === true) {
    button.style.backgroundColor = "white";
    button.style.color = "var(--main-text)";
    dropdown.style.display = "none";
    open = false;
  }
}

// Close the dropdown if the user clicks outside of it, currently blocking button from closing it also


export function MeatballsMenu() {
  return <>
  <svg onClick={btnClick} id="meatballs" className={styles.meatballsMenu} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M11.5 16C11.5 16.8284 10.8284 17.5 10 17.5C9.17157 17.5 8.5 16.8284 8.5 16C8.5 15.1716 9.17157 14.5 10 14.5C10.8284 14.5 11.5 15.1716 11.5 16ZM17.5 16C17.5 16.8284 16.8284 17.5 16 17.5C15.1716 17.5 14.5 16.8284 14.5 16C14.5 15.1716 15.1716 14.5 16 14.5C16.8284 14.5 17.5 15.1716 17.5 16ZM22 17.5C22.8284 17.5 23.5 16.8284 23.5 16C23.5 15.1716 22.8284 14.5 22 14.5C21.1716 14.5 20.5 15.1716 20.5 16C20.5 16.8284 21.1716 17.5 22 17.5Z" fill="currentColor"/>
    </svg>

    <div id="meatball-drop-content" className={styles.dropdownContent}>
      <a href="https://github.com/" target="_blank" rel="noopener noreferrer">Contribute</a>
      <a href="#home">About</a>
  </div>
</>;
}