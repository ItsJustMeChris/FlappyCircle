//Rectangle class, or wall class
class rectangle {
    //Constructor for a rectangle
    constructor(context, x, y, w, h, color, isTop) {
        //Set the type to rectangle
        this.type = "rectangle";
        //Set the width to w
        this.width = w;
        //Set the height to h
        this.height = h;
        //Set the x coordinate
        this.x = x;
        //Set the y coordinate
        this.y = y;
        //Get our context we passed to begin drawing
        this.context = context;
        //Is it a top wall or bottom wall
        this.isTop = isTop;
        //Set the fill style and color
        this.context.fillStyle = color;
        //Fill the rectangle
        this.context.fillRect(this.x, this.y, this.width, this.height);
        //new image for the top wall
        this.topImage = new Image();
        //File to load
        this.topImage.src = 'pipetop.png';
        //Load the wall image
		this.topImage.onload = function() {
        }
        //New image for the bottom wall
        this.bottomImage = new Image();
        //Set the file to load
        this.bottomImage.src = 'pipebottom.png';
        //Load the bottom wall image
		this.bottomImage.onload = function() {
		}
    }

    //Update function to update the wall position
    update() {
        //Fill the rectangle at the new position
        this.context.fillRect(this.x, this.y, this.width, this.height);
        //Check if the wall is top or bottom
		if (this.isTop) {
            //Draw the new image position
			this.context.drawImage(this.topImage, this.x, this.y, this.width, this.height);
		} else {
            //Draw the new image position
			this.context.drawImage(this.bottomImage, this.x, this.y, this.width, this.height);
		}	
    }

    //Move the wall
    move(x, y) {
        //Set the new x to x
        this.x = x;
        //Set the new y to y
        this.y = y;
    }

    //Slide the wall
    slide() {
        //Slide 5px to the left
        this.x-=5;
    }
}
