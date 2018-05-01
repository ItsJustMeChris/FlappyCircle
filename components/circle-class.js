class circle {
    constructor(context, x, y, color, radius) {
        this.x = x;
        this.y = y;
        this.context = context;
        this.radius = radius;
        this.context.fillStyle = color;
        this.context.fillStyle = color;
        this.context.beginPath();
        this.alive = true;
        this.jumping = false;
        this.shouldScore = false;
        this.name = "Player One";
        this.score = 0;
        //this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.strokeStyle = "#FFF";
        this.context.stroke();
		this.bird = new Image();
		this.bird.src = 'b.png';
		console.log(this.bird);
		this.bird.onload = function() {
		}

    }

    setName(name) {
        this.name = name;
    }

    update(context) {
		if (context != undefined) {
        this.context.beginPath();
        //this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.strokeStyle = "#FFF";;
        this.context.stroke();
		this.bird = new Image();
		this.bird.src = 'paintedbird.png';
		context.drawImage(this.bird, this.x-25, this.y-25, 50, 50);
		}
    }

    async jump() {
        if (!this.alive) {
            return;
        }
        if (this.y - this.radius < 0) {
            this.y = 0 + this.radius;
            return;
        }
        this.jumping = true;
        for (var i = 0; i < 30; i++) {
            if (!this.alive) {
                return;
            }
            await sleep(1);
            this.y -= 4;
            this.update();
        }
        this.jumping = false;
    }

    async fall() {
        if (!this.alive) {
            return;
        }
        if (!this.jumping) {
            for (var i = 0; i < 5; i++) {
                await sleep(1);
                this.y += 1;
            }
        }
    }

    overLap(other) {
        if (other.type == "rectangle") {
            let DeltaX = this.x - Math.max(other.x, Math.min(this.x, other.x + other.width));
            let DeltaY = this.y - Math.max(other.y, Math.min(this.y, other.y + other.height));
            return (DeltaX * DeltaX + DeltaY * DeltaY) < (this.radius * this.radius);
        } else if (other.type == "circle") {
            let xDist = other.x - this.x;
            let yDist = other.y - this.y;
            return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2)) < this.radius + other.radius;
        }
    }
}
