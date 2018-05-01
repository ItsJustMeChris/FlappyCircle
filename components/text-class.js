//Class for text elements
class text {
    //Constructor for a text element
    constructor(context, content, x, y, size, color) {
        //Get the context we passed to it
        this.context = context;
        //Set the font size
        this.context.font = size + "px Arial";
        //Set the font color
        this.context.fillStyle = color;
        //Set the font alignment
        this.context.textAlign = "center";
        //Draw our text
        this.context.fillText(content, x, y);
    }

    //Update the text
    update(content, x, y, size, color) {
        //Set the new font size
        this.context.font = size + "px Arial";
        //Set the new font color
        this.context.fillStyle = color;
        //Set the new alignment
        this.context.textAlign = "center"
        //Draw the new text
        this.context.fillText(content, x, y);
    }
}