import * as React from "react";
import { useEffect, useState } from 'react'
import { Modal, displayModal, addModal, messages } from "../modal/Modal";
// @ts-ignore
import styles from "./results.module.css"
import "../../ui.css"

let title, authors, resultsList, results, searchResults;
let authorArr = []; 

export function Results() {

  function handleClick(evt) {
    let clickedId = evt.target.id.split('-')[1];
    let title = document.getElementById(`title-${clickedId}`).innerHTML;
    let authors = document.getElementById(`authors-${clickedId}`).innerHTML;

    console.log(title + ", " + "By: " + authors); // gets stuff
    
    addModal(title, authors); // pass title and authors to the modal
  }

 // receive results fom Zotero
 onmessage = (event) => {
  let item = 1;
  searchResults = document.getElementById('search-results');
  searchResults.innerHTML = "Loading..."; // add loading msg
  results = event.data.pluginMessage;
  if (typeof results === "object") {
  // pass search results to UI
    resultsList =
      `<div id="list" class=${styles.resultsList}>` +
          results.map(function (result) {

              let itemId = `item${item++}`;
              let titleId = `title-${itemId}`;
              let authorId = `authors-${itemId}`;  
              
              title = result.title;
              authors = result.authors;
              authorArr = []; // clear each time

              if (typeof authors == "undefined") {
                  authorArr.push("Authors not provided");
              } else {
                  authors.forEach(element => {
                      let author = element.lastName + ", " + element.firstName;
                      authorArr.push(author);
                  });
              }
              
              return `<div id=${itemId} class=${styles.resultItem} ><div id=${titleId} class=${styles.title}>${title}</div><div id=${authorId} class=${styles.author}>${authorArr}</div></div>`
          }).join('') +
      '</div>';
      searchResults.innerHTML = resultsList;
  } else {
      document.getElementById('add-selection').style.display = "unset";
  }
}

  return (<>
    <div onClick={handleClick} id="search-results" className={styles.searchResultSection}></div>
    <Modal />
  </>)
}