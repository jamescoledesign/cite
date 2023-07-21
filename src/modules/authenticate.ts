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

