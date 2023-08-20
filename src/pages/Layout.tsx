import * as React from "react";
import { useEffect, useState } from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import { MeatballsMenu } from "../components/meatballsMenu/MeatballsMenu";
// @ts-ignore
import styles from "../components/nav/nav.module.css"

export function Layout() {

    const [activeLink, setActiveLink] = useState("li1");
    const navigate = useNavigate();

    function setLinks(active: string, inactive: string) {
        setActiveLink(active);
        document.getElementById(active).className += `${' '} + ${styles.active}`;
        document.getElementById(inactive).className = `${styles.navLink}`;
      }

      function toggleActive(e) {
        let clicked = e.currentTarget.id;
        if (clicked === "li1") {
            setLinks("li1", "li2");
        } else if (clicked === "li2") {
            setLinks("li2", "li1");
        }
      }
      
      function checkKeys() {
        // check for keys
        parent.postMessage(
            { pluginMessage: { type: "load-keys"} },
            "*"
        );
      }

      onmessage = (event) => {
        let results = event.data.pluginMessage;
        if (results === "Keys found") {
            navigate("/search");
            setLinks("li2", "li1");
        } else {
            navigate("/");
            setLinks("li1", "li2");
        }
      }

      useEffect(() => {
        checkKeys();
        setActiveLink("li2")
        
      }, []);
    
  return (
    <>
        <nav className={styles.nav}>
            <ul id="navList">
                <li>
                    <Link id="li1" onClick={toggleActive} className={styles.navLink} to="/">API Key</Link>
                </li>
                <li>
                    <Link id="li2" onClick={toggleActive} className={styles.navLink} to="/search">Search</Link>
                </li>
            </ul>
            <MeatballsMenu />
        </nav>

        <Outlet />
    </>
  )
};