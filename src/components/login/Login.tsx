import * as React from "react";
import { useState, useEffect } from "react";
import { savedKeysModal, deletedKeysModal } from "../modal/Modal";
// @ts-ignore
import styles from "./login.module.css"
import "../../ui.css"

export function Login() {

  const [inputType, setInputType] = useState("password");
  let userId, apiKey;

  function checkKeys() {
    // check for keys
    parent.postMessage(
        { pluginMessage: { type: "load-keys"} },
        "*"
    );
  }

  // Add keys to input fields if they exist
  onmessage = (event) => {
    let uidField = document.getElementById("uid-field");
    let keyField = document.getElementById("apikey-field");
    let msg = event.data.pluginMessage;
    if (msg.includes("userid:")){
      let uid = msg.split(' ')[1];
      //@ts-ignore
      uidField.value = uid;
    } if (msg.includes("apikey:")){
      let apikey = msg.split(' ')[1];
      //@ts-ignore
      keyField.value = apikey;
    }
    showDeleteButton()
  }

  // remove disabled class onchange
  function enableButton() {
    let btn = document.getElementById("submit-cred");
    let uidField = document.getElementById("uid-field");
    let keyField = document.getElementById("apikey-field");
    //@ts-ignore
    let ulength = uidField.value.length;
    //@ts-ignore
    let klength = keyField.value.length;

    if (ulength < 1 || klength < 1) {
      btn.className = "disabled"
    } else if (ulength > 1 && klength > 1) {
      btn.className = ""
    }
  }

  // Show Delete keys button
  function showDeleteButton() {
      let deleteBtn = document.getElementById("delete-cred");
      deleteBtn.style.display = "unset";
  }

  // Set user ID and API key from input fields on submit
  function handleSubmit(e) {

    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);

    userId = formJson.userId;
    apiKey = formJson.apiKey;

    // Do not submit if there's no form data

    if (userId === "" || apiKey === "") {
      let messaage = "No keys to save. Please add your Zotero User ID and API Key.";
      console.log(messaage);
      alert(messaage);
    } else {
      console.log(formJson);
      parent.postMessage(
        { pluginMessage: { type: "store-keys", userId, apiKey } },
        "*"
      );
      savedKeysModal();
    }
  }

  function showPw() {
    let icon = document.getElementById("pwicon"); 
    if (inputType === "password") {
      setInputType("text");
      icon.innerHTML = `<path d="M10.3657 10.3554C12.0646 9.25145 14.036 8.42859 16.1428 8.42859C20.9257 8.42859 25.0228 12.6714 26.8228 14.8503C27.1074 15.2052 27.2651 15.6663 27.2651 16.1429C27.2651 16.6212 27.1074 17.0806 26.8228 17.4354C25.8303 18.6354 24.14 20.4646 22.0228 21.8634M18.7143 23.4629C17.888 23.7132 17.0274 23.8572 16.1428 23.8572C11.36 23.8572 7.26284 19.6143 5.46284 17.4354C5.17344 17.067 5.01753 16.6114 5.02055 16.1429C5.02055 15.6663 5.17827 15.2052 5.46284 14.8503C6.03369 14.1612 6.83427 13.2629 7.81484 12.3577" stroke="black" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.5667 18.5668C19.1913 17.9202 19.5369 17.0541 19.5291 16.1552C19.5213 15.2562 19.1607 14.3963 18.525 13.7606C17.8893 13.1249 17.0294 12.7644 16.1304 12.7565C15.2315 12.7487 14.3654 13.0943 13.7188 13.7188" stroke="black" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M27.2857 27.2857L5 5" stroke="black" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>`;
    } else {
      setInputType("password");
      icon.innerHTML = `<path d="M26.8023 14.4217C27.0869 14.7766 27.2446 15.2377 27.2446 15.7143C27.2446 16.1926 27.0869 16.652 26.8023 17.0069C25.0023 19.1857 20.9052 23.4286 16.1223 23.4286C11.3395 23.4286 7.24233 19.1857 5.44233 17.0069C5.15293 16.6384 4.99702 16.1828 5.00004 15.7143C5.00004 15.2377 5.15776 14.7766 5.44233 14.4217C7.24233 12.2429 11.3395 8 16.1223 8C20.9052 8 25.0023 12.2429 26.8023 14.4217Z" stroke="black" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.1224 19.1428C17.0317 19.1428 17.9038 18.7816 18.5468 18.1386C19.1898 17.4957 19.551 16.6236 19.551 15.7143C19.551 14.805 19.1898 13.9329 18.5468 13.2899C17.9038 12.6469 17.0317 12.2857 16.1224 12.2857C15.2131 12.2857 14.341 12.6469 13.6981 13.2899C13.0551 13.9329 12.6938 14.805 12.6938 15.7143C12.6938 16.6236 13.0551 17.4957 13.6981 18.1386C14.341 18.7816 15.2131 19.1428 16.1224 19.1428Z" stroke="black" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>`;
    }
  }

  function deleteKeys() {
    deletedKeysModal();
  }
 
useEffect(() => {
  checkKeys();
}, []);

  return <div className="container">
    <form method="post" onSubmit={handleSubmit}>
      <div id="login" className={styles.login}>
        <label htmlFor="User Id" >User ID</label>
        <input required onChange={enableButton} value={userId} name="userId" id="uid-field" className={styles.field} type="text" placeholder="Enter your Zotero User ID" />

        <label htmlFor="API Key">API Key</label>
        <div className={styles.pwField}>
            <input required onChange={enableButton} value={apiKey} name="apiKey" id="apikey-field" className={styles.field} type={inputType} placeholder="Enter your Zotero API key" />
            <svg onClick={showPw} id="pwicon" className={styles.eye} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
              <path d="M10.3657 10.3554C12.0646 9.25145 14.036 8.42859 16.1428 8.42859C20.9257 8.42859 25.0228 12.6714 26.8228 14.8503C27.1074 15.2052 27.2651 15.6663 27.2651 16.1429C27.2651 16.6212 27.1074 17.0806 26.8228 17.4354C25.8303 18.6354 24.14 20.4646 22.0228 21.8634M18.7143 23.4629C17.888 23.7132 17.0274 23.8572 16.1428 23.8572C11.36 23.8572 7.26284 19.6143 5.46284 17.4354C5.17344 17.067 5.01753 16.6114 5.02055 16.1429C5.02055 15.6663 5.17827 15.2052 5.46284 14.8503C6.03369 14.1612 6.83427 13.2629 7.81484 12.3577" stroke="black" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.5667 18.5668C19.1913 17.9202 19.5369 17.0541 19.5291 16.1552C19.5213 15.2562 19.1607 14.3963 18.525 13.7606C17.8893 13.1249 17.0294 12.7644 16.1304 12.7565C15.2315 12.7487 14.3654 13.0943 13.7188 13.7188" stroke="black" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M27.2857 27.2857L5 5" stroke="black" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
        </div>
        <div className="button-group">
          <button type="submit" id="submit-cred" className="disabled">Save keys</button>
          <button type="button" onClick={deleteKeys} id="delete-cred" className={`secondary ${styles.deleteBtn}`}>Delete keys</button>
        </div>
        <a className={styles.helpLink} href="https://www.figma.com/file/3e3oxLwHto7AmPjPhhFCyo/Cite-plugin---guide?type=design&node-id=0%3A1&mode=design&t=sj2qTztbp6IwKGep-1" target="_blank" rel="noopener noreferrer">Need help creating an API key?</a>
      </div>
      </form>
  </div>
}