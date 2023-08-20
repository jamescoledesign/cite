import * as React from "react";
import { useEffect, useState } from 'react'
// @ts-ignore
import styles from "./nav.module.css"
import { MeatballsMenu } from "../meatballsMenu/MeatballsMenu";

// set active link to page loaded 
export let activeLink = "li1";
let inactiveLink = "li2";

export function Nav(props) {

  function setActive() {
    document.getElementById(activeLink).className += `${' '} + ${styles.active}`;
    setInactive();
  }

  function setInactive() {
    document.getElementById(inactiveLink).className = `${styles.navLink}`;
  }

  function toggleActive(e) {
    let clicked = e.currentTarget.id;
    if (clicked != activeLink) {
      inactiveLink = activeLink;
      activeLink = clicked;
      setActive();
    }
  }

  useEffect(() => {
    setActive();
    console.log(activeLink);
  }, []);

  return ( 
  <nav className={styles.nav} onClick={props.onClick}>
    <ul id="navList">
      <li id="li1" className={styles.navLink} onClick={toggleActive}>API Key</li>
      <li id="li2" className={styles.navLink} onClick={toggleActive}>Search</li>
    </ul>
    <MeatballsMenu />
  </nav>
  );
}