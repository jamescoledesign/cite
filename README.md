# zotero-figma

## About

This plugin allows you to add citations to your Figma and Figjam layouts. It uses the [Zotero Web API](https://www.zotero.org/support/dev/web_api/v3/basics) to get saved publications from a user's Zotero library.  

To search your private libraries, you'll need to provide the plugin your Zotero User ID and API Key. [Click here](https://www.zotero.org/settings/keys/new) to log in to Zotero and create an API key in your Zotero account settings. The plugin saves your credentialls locally so you do not need to enter this information every time you use the plugin. You may need re-enter your credentials if you clear your cache, though. The plugin does not store your credentials anywhere on the web.

## Testing

Figma plugin development information can be found at:
https://www.figma.com/plugin-docs/plugin-quickstart-guide/

### Download and install Node.js
https://nodejs.org/en/download/

### Install dependencies
"npm install"

### Run build and watch 
"npm run build -- --watch"