let arr: any[] = [];

export let length = arr.length;

// search Zotero
export async function searchZotero(query: string) {

    let userId = await figma.clientStorage.getAsync('userId');
    let apiKey = await figma.clientStorage.getAsync('apiKey');

    const response = await fetch("https://api.zotero.org/users/" + userId + "/items/?q=" + query + "&key=" + apiKey);

    const results = await response.json();

    // create HTML elements for each search result
    results.forEach((element: any) => {
        let creators = element.data.creators;
        let title = element.data.title;

        const work = {
        title: title,
        authors: creators
        }

        arr.push(work);
    });

    console.log(arr);
    
    figma.ui.postMessage(arr); // send arr to Figma
}

// reset UI without closing plugin
export function clearEverything(clear: boolean) {
    arr = []; // not working currently
    length = 0; // not working currently
    console.log("reset button clicked");
    clear = false;
}