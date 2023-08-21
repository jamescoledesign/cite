import * as React from "react";
// @ts-ignore
import styles from "./modal.module.css"

export const messages = {
  saved: "Your info has been saved. You can now search your Zotero library.",
  areyousure: "Are you sure you want to delete your keys?",
  deleted: "Your info has been deleted. You can now close the plugin or add new keys.",
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

export function aboutModal() {
  displayModal();
  let modalTitle = document.getElementById("modal-title");
  let modalMessage = document.getElementById("modal-message");
  let button1 = document.getElementById("continue");
  let button2 = document.getElementById("close");

  modalTitle.innerHTML = "About"

  modalMessage.innerHTML = `This plugin was created by <a class="aboutlink" href="https://jamescole.info/about/" target="_blank" rel="noopener noreferrer">James Cole</a>.`;
  
  button1.innerHTML = "Close";
  button2.style.display = "none";

  button1.onclick = () => {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
    button2.style.display = "none";
    button1.innerHTML = "Continue";
    button2.innerHTML = "Cancel";
    modalTitle.innerHTML = "Success"
  }
}

export function deletedKeysModal() {
  let modalTitle = document.getElementById("modal-title");
  let modalMessage = document.getElementById("modal-message");
  displayModal();

  let button1 = document.getElementById("continue");
  let button2 = document.getElementById("close");

  modalTitle.innerHTML = "Confirm"
  modalMessage.innerHTML = messages.areyousure;

  button1.innerHTML = "Delete keys";
  button2.innerHTML = "Cancel";

  button1.className = "danger";
  button2.style.display = "unset";

  button1.onclick = () => {
    modalTitle.innerHTML = "Deleted"
    modalMessage.innerHTML = messages.deleted;
    parent.postMessage(
      { pluginMessage: { type: "delete-keys" } },
      "*"
    );

    button1.className = "primary";
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
      let modal = document.getElementById("modal");
      modal.style.display = "none";
      button2.style.display = "none";
      button1.innerHTML = "Continue";
      button2.innerHTML = "Cancel";
    }
  }

  button2.onclick = () => {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
    button2.style.display = "none";
    button1.innerHTML = "Continue";
    button2.innerHTML = "Cancel";
  }

}

export function addModal(t, a) {
  let modalTitle = document.getElementById("modal-title");
  let modal = document.getElementById("modal");
  let modalMessage = document.getElementById("modal-message");

  let button1 = document.getElementById("continue");
  let button2 = document.getElementById("close");

  let selectionTitle = t;
  let selectionAuthors = a;

  displayModal();
  modalTitle.innerHTML = "Confirm"
  button1.innerHTML = "Add item";
  button2.innerHTML = "Cancel";
  button2.style.display = "unset";

  modalMessage.innerHTML = messages.add;
  button2.onclick = () => {
    modal.style.display = "none";
    button2.style.display = "none";
    button1.innerHTML = "Continue";
    button2.innerHTML = "Cancel";
  }
  button1.onclick = () => {
    modalTitle.innerHTML = "Success"
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
      button1.innerHTML = "Continue";
      button2.innerHTML = "Cancel";
    }
    button2.onclick = () => {
      parent.postMessage(
        { pluginMessage: { type: "close-plugin" } },
        "*"
      );
      button2.style.display = "none";
      button1.innerHTML = "Continue";
      button2.innerHTML = "Cancel";
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
        <div className={styles.modalTopbar}><div id="modal-title" className={styles.modalHl}>Success</div>
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