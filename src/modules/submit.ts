export function submitQuery(length: number, arr: Object[]) {
    if (length === 0) {
        console.log("nothing to add")
    } else {
        console.log("submitted")
        const textNode = figma.createText();;
        let text = arr.toString(); // for each item, add line break
        textNode.characters = text;
    }
}