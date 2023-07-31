export async function submitQuery(length: number, titleArr: Object[]) {
    if (length === 0) {
        console.log("nothing to add")
    } else {

        console.log("submitted");
        
        let frame = figma.createFrame();
        const titleText = figma.createText();
        const authorText = figma.createText();

        let title = titleArr.toString();
        let authors = "author 1, author 2, author 3" // add here

        titleText.characters = title;
        authorText.characters = authors;

        authorText.characters = "Author 1, Author 2, Author 3, Author 4, Author 5";

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
    }
}