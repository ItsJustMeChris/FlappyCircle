class rectangle {
    constructor(context, x, y, w, h, color) {
        this.type = "rectangle";
        this.width = w;
        this.height = h;
        this.x = x;
        this.y = y;
        this.context = context;
        this.context.fillStyle = color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

    slide() {
        this.x-=5;
    }
}