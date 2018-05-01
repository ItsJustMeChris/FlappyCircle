//Class for our game area
class gameArea {
    //Constructor for a game area
    constructor(w, h) {
        //Create a new canvas element
        this.canvas = document.createElement('canvas');
        //Set the status to not started
        this.status = "notstarted";
        //Set the initial FPS to 0
        this.fps = 0;
        //Set the last fps to 0
        this.lastFPS = 0;
        //Our components on the game area
        this.components = [];
        //The canvas width
        this.canvas.width = Math.max(
            document.body.scrollWidth,
            document.documentElement.scrollWidth,
            document.body.offsetWidth,
            document.documentElement.offsetWidth,
            document.documentElement.clientWidth,
            500);
        //The canvas height
        this.canvas.height = 500;
        //The canvas background
        this.canvas.style.backgroundImage = "url('bg.png')";
        //The canvas context
        this.context = this.canvas.getContext('2d');
    }

    //Create our canvas
    create() {
        //Push the canvas onto the dom
        document.body.insertBefore(this.canvas, document.body.childNodes[4]);
    }

    //Function to get the screen width on multiple devices
    getWidth() {
        return Math.max(
            document.body.scrollWidth,
            document.documentElement.scrollWidth,
            document.body.offsetWidth,
            document.documentElement.offsetWidth,
            document.documentElement.clientWidth,
            500
        )
    }

    //Loop a passed function
    loop(passed) {
        //Loop the function in a setInterval()
        this.interval = setInterval(passed, 10);
    }

    //Clear our canvas
    clear() {
        //Clear the canvas within width and height of our canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    //Get the framerate
    getFramerate() {
        if (!this.lastFPS) {
            this.lastFPS = performance.now();
            this.fps = 0;
            return this.fps;
        }
        let delta = (performance.now() - this.lastFPS) / 1000;
        this.lastFPS = performance.now();
        this.fps = 1 / delta;
        return Math.floor(this.fps);
    }

    //return the context
    getContext() {
        return this.context;
    }
}