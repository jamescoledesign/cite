let arr: any[] = [];

async function submitChoices(length: number, titleStr: string, authorArr: String[]) {
    if (length === 0) {
        console.log("nothing to add")
    } else {

        console.log("submitted");
        
        const nodes:SceneNode[] = [];
        const titleText = figma.createText();
        const authorText = figma.createText();

        let frame = figma.createFrame();
        let title = titleStr; // writes to figma
        let authors = authorArr.toString(); // writes to figma

        titleText.characters = title;
        authorText.characters = authors;

        frame.appendChild(titleText);
        frame.appendChild(authorText);

        // Set frame styles
        frame.name = "Citation";
        frame.layoutMode = 'VERTICAL';
        frame.fills = [{ 
            type: 'SOLID', 
            color: { r: 0.89, g: 0.95, b: 1 }
        }];
        frame.strokes = [{
            type: 'SOLID', 
            color: { r: 0, g: 0.33, b: 0.89 }
        }];
        frame.strokeWeight = 2;
        frame.cornerRadius = 6;
        frame.paddingTop = 20;
        frame.paddingRight= 20;
        frame.paddingBottom = 20;
        frame.paddingLeft = 20;
        frame.itemSpacing = 10;
        frame.layoutSizingHorizontal = 'HUG';
        frame.layoutSizingVertical = 'HUG';

        titleText.maxWidth = 400;
        authorText.maxWidth = 200;

        // Set font styles
        titleText.name = 'Title';
        titleText.fontSize = 16;
        authorText.name = 'Authors';
        authorText.textTruncation = "ENDING";
        authorText.fontSize = 13;
        authorText.layoutSizingHorizontal = 'FILL';
        titleText.fills = [{ 
            type: 'SOLID', 
            color: { r: 0, g: 0, b: 0 }
        }];

        nodes.push(frame);
        figma.viewport.scrollAndZoomIntoView(nodes);
    }
}

figma.showUI(__html__, { themeColors: false, height: 568, width: 320 });

figma.ui.onmessage = async (pluginMessage) => {

  // load fonts
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  let selectionTitle = pluginMessage.selectionTitle;
  let selectionAuthors = pluginMessage.selectionAuthors;
  let userId = await figma.clientStorage.getAsync('userId');
  let apiKey = await figma.clientStorage.getAsync('apiKey');

  function sendId() {
    figma.ui.postMessage(`userid: ${userId}`);
  }

  function sendKey() {
    figma.ui.postMessage(`apikey: ${apiKey}`);
  }

  if (pluginMessage.type === "reload-plugin") {
    figma.showUI(__html__, { themeColors: false, height: 568, width: 320 });
  }

  if (pluginMessage.type === "load-keys") {
    if(userId && apiKey) {
      sendId();
      sendKey() 
      figma.ui.postMessage("Keys found");
    } else {
      figma.ui.postMessage("No keys found");
    }
  }

  if (pluginMessage.type === "store-keys") {
    figma.clientStorage.setAsync('userId', pluginMessage.userId); 
    figma.clientStorage.setAsync('apiKey', pluginMessage.apiKey); 
    console.log("Set API key to " + pluginMessage.apiKey);
  }

  if (pluginMessage.type === "delete-keys") {
    if (!userId || !apiKey) {
      console.log("Nothing to delete")
    } else {
      figma.clientStorage.deleteAsync('userId');
      figma.clientStorage.deleteAsync('apiKey');
      console.log("Deleted the keys");
    }

  }

  if (pluginMessage.type === "add-items") {
    submitChoices(1, selectionTitle, selectionAuthors);
  }

  if (pluginMessage.type === "close-plugin") {
    figma.closePlugin();
  }
  
  if (pluginMessage.type === "search-terms") {

      if (userId && apiKey) {
        console.log(`Keys found. UID is ${userId} and API Key is ${apiKey}.`);
        const response = await fetch("https://api.zotero.org/users/" + userId + "/items/?q=" + pluginMessage.query + "&key=" + apiKey);
        
        const resultstype = await response.status;

        if (resultstype === 403) {
          console.log(resultstype);
          figma.ui.postMessage(resultstype);
        }
      
        const results = await response.json();

        // create HTML elements for each search result        
        results.forEach((element: any) => {
          let title = element.data.title;
          let creators = element.data.creators;
  
          const work = {
          title: title,
          authors: creators
          }
          arr.push(work);
        });

        figma.ui.postMessage(arr); 

      } else {
        console.log("No keys found");
        figma.ui.postMessage("No keys found"); 
      }
  }
};
