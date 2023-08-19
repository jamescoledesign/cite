export async function submitChoices(length: number, titleStr: string, authorArr: String[]) {
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