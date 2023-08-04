// import './style.css'; // not working currently, might need to generate jsx
import { authenticate } from './modules/authenticate';
import { searchZotero, clearEverything } from './modules/search';
import { submitChoices } from './modules/submit'
import { loadPage } from './modules/nav';

function resizeUI() {
  figma.ui.resize(360,540);
}

// load plugin UI

authenticate
  .then(() => {
    loadPage("main");
    resizeUI();
    })
  .catch((error) => {
    loadPage("login");
    resizeUI();
    console.log(error);
  });

// receive pluginMessage values
figma.ui.onmessage = async (pluginMessage) => {

  // set uid and api key when submitted
  let setUid = pluginMessage.userId;
  let setApiKey = pluginMessage.apiKey;

  let search = pluginMessage.search;
  let searchTerm = pluginMessage.keyword; // query
  let selectionTitle = pluginMessage.selectionTitle;
  let selectionAuthors = pluginMessage.selectionAuthors;

  let submit = pluginMessage.submit;
  let clear = pluginMessage.clear;

  let login = pluginMessage.login;
  let done = pluginMessage.done;
  let deleteKeys = pluginMessage.deleteKeys;

  // load fonts
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  // change all of these to switch statements 

  if (login) {
    loadPage("login");
    resizeUI();
    figma.notify(
      "User not authenticated"
    );
  }

  if (done) {
    loadPage("main");
    resizeUI();
    figma.notify(
      "User authenticated"
    );
  }

  if (deleteKeys) {
    figma.clientStorage.deleteAsync('userId');
    figma.clientStorage.deleteAsync('apiKey');
    console.log(figma.clientStorage.keysAsync());
    // loadPage("login");
    resizeUI();
  }

  // set user id

  if (setUid) {
    figma.clientStorage.setAsync('userId', setUid); 
    console.log("Set UID to " + setUid)
  }

  // set API key
  if (setApiKey) {
    figma.clientStorage.setAsync('apiKey', setApiKey); 
    console.log("Set API key to " + setApiKey)
    console.log(await figma.clientStorage.keysAsync()); // gets all keys
  }

  // handle search
  if (search) {
    searchZotero(searchTerm);
  }

  // handle click selection
  if (selectionTitle) {
  console.log(selectionTitle, selectionAuthors);
  }

  // handle submit
  if (submit) {
    submitChoices(1, selectionTitle, selectionAuthors);
  }

  // handle reset
  if (clear) {
    clearEverything(clear);
  }
}