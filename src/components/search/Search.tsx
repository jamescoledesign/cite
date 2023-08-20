import * as React from "react";
// @ts-ignore
import styles from "./search.module.css"
import "../../ui.css"

let query;

// catch arr from code.ts to write title/author to figma

export function SearchField() {

  function handleSubmit(e) {

    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
  
    query = formJson.query; // catch search term

    console.log(formJson.query); 

    // send search to Zotero
    parent.postMessage(
      { pluginMessage: { type: "search-terms", query } },
      "*"
    );  
  }
  
  return (
  <div className={styles.searchContainer}>
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><g id="magnifying-glass--glass-search-magnifying"><path id="Vector" stroke="#3e3e3e" strokeLinecap="round" strokeLinejoin="round" d="M6 11.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"></path><path id="Vector_2" stroke="#3e3e3e" strokeLinecap="round" strokeLinejoin="round" d="M13.5 13.5 10 10"></path></g></svg>

      <input name="query" id="search-field" className={styles.searchfield} placeholder="Search..." type="search" required />

    </form>
  </div>
  )
}