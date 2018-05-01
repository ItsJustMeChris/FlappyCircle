//Circle class, this is basically our player
class circle {
    //Constructor to create a new circle element
    constructor(context, x, y, color, radius) {
        //Set the x coordinate
        this.x = x;
        //Set the y coordinate
        this.y = y;
        //Get the context that was passed to it to draw on the canvas
        this.context = context;
        //Set the radius of the circle
        this.radius = radius;
        //Set the color of the circle
        this.context.fillStyle = color;
        //Start the path to draw
        this.context.beginPath();
        //Set the alive state
        this.alive = true;
        //Set the jumping state
        this.jumping = false;
        //Set the original name of the element
        this.name = "Player One";
        //Set the original score
        this.score = 0;
        //Set the stroke style
        this.context.strokeStyle = "#FFF";
        //Draw the circle
        this.context.stroke();
        //Create a new image for the bird
        this.bird = new Image();
        //Set the source of the image
        this.bird.src = 'b.png';
        //Load the image
        this.bird.onload = function () {
        }

    }

    //Set the name of the element
    setName(name) {
        //Set name
        this.name = name;
    }

    //Update the position
    update(context) {
        //Check if context actually exists, sometimes it doesn't, this is a sanity check
        if (context != undefined) {
            //being our new path
            this.context.beginPath();
            //Begin our new stroke style
            this.context.strokeStyle = "#FFF";
            //Draw our path
            this.context.stroke();
            //Create the image for the bird
            this.bird = new Image();
            //Set the source for the image
            this.bird.src = 'paintedbird.png';
            //Draw the image
            context.drawImage(this.bird, this.x - 25, this.y - 25, 50, 50);
        }
    }

    //Jump function
    async jump() {
        //Sanity check for the circle being alive
        if (!this.alive) {
            //Quick exit
            return;
        }
        //Sanity check if we're above the sky
        if (this.y - this.radius < 0) {
            //Go lower than the sky
            this.y = 0 + this.radius;
            return;
        }
        //Set jumping to true and begin jump
        this.jumping = true;
        //For loop for our jump
        for (var i = 0; i < 30; i++) {
            //Sanity check if we died mid jump
            if (!this.alive) {
                return;
            }
            //Sleep for 1ms to make it smoother
            await sleep(1);
            //Go up 4px on 1 loop of jump
            this.y -= 4;
            //update for new position
            this.update();
        }
        //jump is over
        this.jumping = false;
    }

    //Fall function
    async fall() {
        //Sanity check for alive
        if (!this.alive) {
            return;
        }
        //Sanity check for if we're jumping
        if (!this.jumping) {
            //Fall loop
            for (var i = 0; i < 5; i++) {
                //Sleep to make it smoother
                await sleep(1);
                //Fall 1px per iteration
                this.y += 1;
            }
        }
    }

    //Overlap checks
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
