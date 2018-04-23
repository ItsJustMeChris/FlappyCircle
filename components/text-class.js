class text {
    constructor(context, content, x, y, size, color) {
        this.context = context;
        this.context.font = size + "px Arial";
        this.context.fillStyle = color;
        this.context.textAlign = "center";
        this.context.fillText(content, x, y);
    }

    update(content, x, y, size, color) {
        this.context.font = size + "px Arial";
        this.context.fillStyle = color;
        this.context.textAlign = "center"
        this.context.fillText(content, x, y);
    }
}