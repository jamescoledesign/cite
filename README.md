# Cite

## About

The Cite plugin allows you to add citations from Zotero to your Figma files and FigJam boards. You must have a Zotero account, an API Key, and be online to use the plugin.

To search your private libraries, you'll need to provide the plugin your Zotero User ID and API Key.

Once you’ve added your keys, you can search for anything in your Zotero library. The plugin will return a list of titles and authors. You can select an item from the search results and add it to your layout. 

## How to use

### 1. Get your User ID
- Go to [zotero.org/settings/keys](https://www.zotero.org/settings/keys) and copy your userid. Run the plugin and paste your userid into the plugin’s User ID field.

### 2. Create an API Key
- Go back to [zotero.org/settings/keys](https://www.zotero.org/settings/keys) and click “Create new private key”.
- Fill out the form. Make sure “Allow library access” and “Read Only” are enabled. Click “Save Key.”
- Copy the key from the green box. Paste the key into the plugin’s API Key field. Click the “Save Keys” button in the plugin. 

### 3. Search your Zotero library
- In the plugin, enter a keyword into the search field (e.g., cats) and select an item from the list of search results.

### 4. Add the selected item to your Figma or FigJam layout
- Confirm your selection and generate the citation.

_Note: The plugin saves your credentials locally, so you do not need to enter this information every time you use it. However, you may need re-enter your credentials if you clear your cache. The plugin does not store your credentials anywhere on the web._

## Feedback
How do you use this plugin? How would you like to use it? Any and all feedback is welcome. You can add comments as sticky notes to this [FigJam board](https://www.figma.com/file/66ihP4mDifeDy1ILDh7EzK/Cite-plugin-feedback?type=whiteboard&node-id=1%3A563&t=7G827pVi4jkJPF1L-1).

## Roadmap
Future enhancements will be based on user feedback. A few ideas: 
- Add notes to a citation
- Export an image of a source 
- Include tags from sources
- Create a bibliography

## How to contribute
If you’d like to help develop this plugin, feel free to submit an issue or pull request. Code contributors should fork the repo and create a working branch for new changes. Once you’ve made changes, you can create a pull request for review. 

### Some useful guides for contributors
- [Zotero Web API documentation](https://www.zotero.org/support/dev/web_api/v3/start)
- [Figma Plugin API documentation](https://www.figma.com/plugin-docs/)
- Example contribution guide: [GitHub docs contributing guide](https://github.com/github/docs/blob/main/CONTRIBUTING.md)

### Running the plugin locally for development 
- Fork this repo
- Clone your forked repo locally
- Download and install [Node.js](https://nodejs.org/en/download/) if you haven't already done so
- Install dependencies: `npm install`
- Run build and watch in Figma: `npm run dev`

## Acknowledgements
- This plugin uses the [webpack-react](https://github.com/figma/plugin-samples/tree/master/webpack-react) plugin sample from Figma as a base. 

- Icons used in the plugin are mostly from [Streamline](https://www.figma.com/community/plugin/852192486284901337/Streamline-Icons%2C-Illustrations%2C-Elements%2C-Emoji).