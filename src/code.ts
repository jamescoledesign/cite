import { submitChoices } from './submit'
let arr: any[] = [];
// check that keys are stored: this is working
export const authenticate = new Promise((resolve, reject) => {
  async function getCreds() {
    let storedId = await figma.clientStorage.getAsync('userId');
    let storedKey = await figma.clientStorage.getAsync('apiKey');
    if (storedId && storedKey) {
      console.log("UID is " + storedId);
      console.log("API Key is " + storedKey);
      resolve("User authenticated");
    } else {
      reject("User not authenticated");
    }
  }
  getCreds();
});

figma.showUI(__html__, { themeColors: false, height: 568, width: 320 });

figma.ui.onmessage = async (pluginMessage) => {

  let selectionTitle = pluginMessage.selectionTitle;
  let selectionAuthors = pluginMessage.selectionAuthors;

  // load fonts
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  if (pluginMessage.type === "store-keys") {
    figma.clientStorage.setAsync('userId', pluginMessage.userId); 
    figma.clientStorage.setAsync('apiKey', pluginMessage.apiKey); 
    console.log("Set API key to " + pluginMessage.apiKey);
    // console.log(await figma.clientStorage.keysAsync()); // gets all keys
  }

  if (pluginMessage.type === "delete-keys") {
    figma.clientStorage.deleteAsync('userId');
    figma.clientStorage.deleteAsync('apiKey');
    console.log("Deleted the keys");
    // console.log(await figma.clientStorage.keysAsync()); // gets all keys
  }

  if (pluginMessage.type === "add-items") {
    submitChoices(1, selectionTitle, selectionAuthors);
  }

  if (pluginMessage.type === "close-plugin") {
    figma.closePlugin();
  }

  if (pluginMessage.type === "search-terms") {
    let userId = await figma.clientStorage.getAsync('userId');
    let apiKey = await figma.clientStorage.getAsync('apiKey');
    const response = await fetch("https://api.zotero.org/users/" + userId + "/items/?q=" + pluginMessage.query + "&key=" + apiKey);

    const results = await response.json();

        // create HTML elements for each search result
        results.forEach((element: any) => {
          let title = element.data.title;
          let creators = element.data.creators;
  
          const work = {
          title: title,
          authors: creators
          }
          arr.push(work); // this is working
      });
      figma.ui.postMessage(arr); // send arr to Figma ---- this is working, need to catch arr
      // console.log(arr);   
  }

};
