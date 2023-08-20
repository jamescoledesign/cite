import * as React from "react";
// @ts-ignore
import styles from "./modal.module.css"

export const messages = {
  saved: "Your info has been saved. You can now search your Zotero library.",
  deleted: "Your info has been deleted. You can close the plugin or enter a new Zotero API Key and User ID.",
  add: "Add selected item to Figma?",
  addSuccess: "This citation has been added!"
}

export function displayModal() {
  let modal = document.getElementById("modal");
  modal.style.display = "block";
}

export function savedKeysModal() {
  displayModal();
  let modalMessage = document.getElementById("modal-message");

  let button1 = document.getElementById("continue");
  let button2 = document.getElementById("close");

  modalMessage.innerHTML = messages.saved;

  button1.innerHTML = "Search Zotero";
  button2.style.display = "none";

  button1.onclick = () => {
    // call figma.showUI() to reload plugin
    parent.postMessage(
      { pluginMessage: { type: "reload-plugin" } },
      "*"
    );
  }

}

export function deletedKeysModal() {
  let modalMessage = document.getElementById("modal-message");
  displayModal();

  let button1 = document.getElementById("continue");
  let button2 = document.getElementById("close");

  modalMessage.innerHTML = messages.deleted;

  button1.innerHTML = "Add keys";
  button2.innerHTML = "Close plugin";
 
  button1.onclick = () => {
    // call figma.showUI() to reload plugin
    parent.postMessage(
      { pluginMessage: { type: "reload-plugin" } },
      "*"
    );
  }

  button2.onclick = () => {
    parent.postMessage(
      { pluginMessage: { type: "close-plugin" } },
      "*"
    );
  }
}

export function addModal(t, a) {
  let modal = document.getElementById("modal");
  let modalMessage = document.getElementById("modal-message");

  let button1 = document.getElementById("continue");
  let button2 = document.getElementById("close");

  let selectionTitle = t;
  let selectionAuthors = a;

  displayModal();

  modalMessage.innerHTML = messages.add;
  button2.onclick = () => {
    modal.style.display = "none";
  }
  button1.onclick = () => {
    modalMessage.innerHTML = messages.addSuccess;
    button1.innerHTML = "New search";
    button2.innerHTML = "Close plugin";
    // Submit selection to Figma and write text node
    parent.postMessage({ pluginMessage: { type: "add-items", selectionTitle, selectionAuthors } }, '*');
    // Change modal content
    button1.onclick = () => {
      modal.style.display = "none";
      button2.style.display = "none";
      document.getElementById('search-results').innerHTML = "";
    }
    button2.onclick = () => {
      parent.postMessage(
        { pluginMessage: { type: "close-plugin" } },
        "*"
      );
    }
  };
}

export function Modal() {

  function closeModal() {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
  }

  // Close modal when the user clicks outside of it
  window.onclick = function(event) {
    let modal = document.getElementById("modal");
    if (event.target == modal) {
      closeModal();
    }
  }  

  return <div id="modal" className={styles.modal}>

    <div className={styles.modalContent}>
        <div className={styles.modalTopbar}><div className={styles.modalHl}>Success</div>
            <span className={styles.close} onClick={closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16 15.2931L20.6465 10.6466L21.3536 11.3537L16.7072 16.0002L21.3536 20.6466L20.6465 21.3537L16.0001 16.7073L11.3536 21.3537L10.6465 20.6466L15.2929 16.0002L10.6465 11.3538L11.3536 10.6467L16 15.2931Z" fill="black" fillOpacity="0.8"/>
                    </svg>
            </span>
        </div>

        <p id="modal-message" className={styles.modalp}></p>

        <div className={styles.buttonGroup}>
          <button id="close" className="secondary">Cancel</button>
          <button id="continue" className="primary">Continue</button>
        </div>

    </div>
  </div>
}