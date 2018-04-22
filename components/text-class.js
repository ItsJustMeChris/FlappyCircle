class text {
    constructor(content, x, y, size, color) {
        this.ctx = context;
        this.ctx.font = size + "px Arial";
        this.ctx.fillStyle = color;
        this.ctx.textAlign = "center";
        this.ctx.fillText(content, x, y);
    }

    update() {
        this.ctx = gameArea.context;
        this.ctx.font = size + "px Arial";
        this.ctx.fillStyle = color;
        this.ctx.textAlign = "center"
        this.ctx.fillText(content, x, y);
    }
}