class gameArea {
    constructor(w, h) {
        this.canvas = document.createElement('canvas');
        this.status = "notstarted";
        this.fps = 0;
        this.lastFPS = 0;
        this.components = [];
        this.canvas.width = Math.max(
            document.body.scrollWidth,
            document.documentElement.scrollWidth,
            document.body.offsetWidth,
            document.documentElement.offsetWidth,
            document.documentElement.clientWidth,
            500);
        this.canvas.height = 500;
        this.canvas.style.backgroundImage = "url('bg.png')";
        this.context = this.canvas.getContext('2d');
    }

    create() {
        document.body.insertBefore(this.canvas, document.body.childNodes[4]);
    }

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

    loop(passed) {
        this.interval = setInterval(passed, 10);
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

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

    getContext() {
        return this.context;
    }
}