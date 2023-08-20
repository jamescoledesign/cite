import * as React from "react";
import { Modal, addModal } from "../modal/Modal";
// @ts-ignore
import styles from "./results.module.css"
import "../../ui.css"

let title, authors, resultsList, results, searchResults;
let authorArr = []; 

export function Results() {

  function handleClick(evt) {
    let clickedId = evt.target.id.split('-')[1];
    let title = document.getElementById(`title-${clickedId}`);
    let authors = document.getElementById(`authors-${clickedId}`);

    if (title != null && authors != null) {
      let titleStr = title.innerHTML;
      let authorsStr = authors.innerHTML;
      console.log(titleStr + ", " + "By: " + authorsStr); // log title and authors
      addModal(titleStr, authorsStr); // pass title and authors to the modal
    }
  }

 // receive results fom Zotero
 onmessage = (event) => {
  let item = 1;
  searchResults = document.getElementById('search-results');
  results = event.data.pluginMessage;

  if (results === 403) {
    document.getElementById("search-message").innerHTML = "Unable to authenticate user. Did you enter the correct Zotero User ID and API Key?";
  }

  if (results === "No keys found") {
    document.getElementById("search-message").innerHTML = "No keys found. Did you enter a Zotero User ID and API Key?";
  }

  if (typeof results === "object") {
    if (results.length === 0) {
      document.getElementById("search-message").innerHTML = "There are no results matching your search. Please try again.";
    } else if ((results.length > 0) ) {
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
                          let author = `${element.firstName} ${element.lastName}`;
                          authorArr.push(author);
                      });
                      
                      let addSpace = authorArr.join(", ");
                      authorArr = [];
                      authorArr.push(addSpace);
                  }
                  
                  return `<div id=${itemId} class=${styles.resultItem} ><div id=${titleId} class=${styles.title}>${title}</div><div id=${authorId} class=${styles.author}>${authorArr}</div></div>`
              }).join('') +
          '</div>';
          searchResults.innerHTML = resultsList;
      } else {
          document.getElementById('add-selection').style.display = "unset";
      }
    }  
}

  return (
    <>
      <div onClick={handleClick} id="search-results" className={styles.searchResultSection}>
        
        <div id="search-message" className={styles.searchMessage}>Find a publication title and author to add to your document.</div>

      </div>
      <Modal />
    </>
  )
}