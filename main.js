var game = new gameArea(500,500);
game.create();
var player = new circle(game.getContext(), 50, 50, "#fff", 20);
var score = new text(game.getContext(),"Score: 0", 400, 30, 30, "#fff");
var fps = new text(game.getContext(),"FPS: 0", 250, 30, 30, "#fff");

game.components.push(player);

game.components.push(new rectangle(game.getContext(), 500, 0, 30, 250, "#fff", true));
game.components.push(new rectangle(game.getContext(), 500, 450, 30, 250, "#fff", false));

function handleWalls() {
    game.components.forEach(a => {
        if (a.type == "rectangle") {
            a.update();
            if (player.overLap(a)) {
                player.alive = false;
                return game.status = "over";
            }
            a.slide();
            if (a.x <= player.x && player.shouldScore) {
                player.shouldScore = false;
                player.score++;
            }
            if (a.x <= 0) {
                player.shouldScore = true;
                game.components.splice(game.components.indexOf(a), 3);
                let randomA = Math.floor(Math.random() * (game.canvas.height / 2 - 80)) + 40;
                let randomB = Math.floor(Math.random() * (game.canvas.height / 2 - 80)) + 80;             
                game.components.push(new rectangle(game.getContext(), game.canvas.width, 0, 20, randomA, "#fff", true));
                game.components.push(new rectangle(game.getContext(), game.canvas.width, game.canvas.height - randomB, 20, randomB, "#fff", false));                        
            }
        }
    });
}

setInterval(function () {
    if (game.status == "over") {
        return;
    }
    game.clear();
    handleWalls();
    score.update("Score: " + player.score, 400, 30, 30, "#fff");
    fps.update("FPS: " + game.getFramerate(), 250, 30, 30, "#fff");
    player.fall();
    player.update(game.getContext());
}, 15)

document.addEventListener('click', function () {
    if (player.alive) {
        player.jump();
    }
})
