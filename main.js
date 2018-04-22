var game = new gameArea();
game.create();
var player = new circle(game.getContext(), 50, 50, "#fff", 30);

game.components.push(player);
game.components.push(new rectangle(game.getContext(), 500, 0, 30, 250, "#fff"));
game.components.push(new rectangle(game.getContext(), 500, 450, 30, 250, "#fff"));
function handleWalls() {
    game.components.forEach(a => {
        if (a.type == "rectangle") {
            a.update();
            if (player.overLap(a)) {
                return game.status = "over"
            }
            a.slide();
            if (a.x <= 0) {
                game.components.splice(game.components.indexOf(a), 2);
                let randomA = Math.floor(Math.random() * (game.canvas.height / 2 - 80)) + 40
                let randomB = Math.floor(Math.random() * (game.canvas.height / 2 - 80)) + 80                
                game.components.push(new rectangle(game.getContext(), game.canvas.width, 0, 20, randomA, "#fff"));
                game.components.push(new rectangle(game.getContext(), game.canvas.width, game.canvas.height - randomB, 20, randomB, "#fff"));                        
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
    player.fall();
    player.update();
}, 15)

document.addEventListener('click', function () {
    player.jump();
})