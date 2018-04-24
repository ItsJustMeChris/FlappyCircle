class rectangle {
    constructor(context, x, y, w, h, color, isTop) {
        this.type = "rectangle";
        this.width = w;
        this.height = h;
        this.x = x;
        this.y = y;
        this.context = context;
		this.isTop = isTop;
        this.context.fillStyle = color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
		this.topImage = new Image();
		this.topImage.src = 'pipetop.png';
		this.topImage.onload = function() {
		}
		this.bottomImage = new Image();
		this.bottomImage.src = 'pipebottom.png';
		this.bottomImage.onload = function() {
		}
    }

    update() {
        this.context.fillRect(this.x, this.y, this.width, this.height);
		if (this.isTop) {
			this.context.drawImage(this.topImage, this.x, this.y, this.width, this.height);
		} else {
			this.context.drawImage(this.bottomImage, this.x, this.y, this.width, this.height);
		}	
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

    slide() {
        this.x-=5;
    }
}
