//Create a new game area
var game = new gameArea();
//Create it
game.create();
//Create a new player
var player = new circle(game.getContext(), 50, 50, "#fff", 20);
//Create the score text
var score = new text(game.getContext(), "Score: 0", game.getWidth()-150, 30, 30, "#fff");
//Create the fps text
var fps = new text(game.getContext(), "FPS: 0", game.getWidth()-260, 30, 30, "#fff");
//Create a new leaderboard
var lb = new leaderboard();

//Push the player to the game components
game.components.push(player);

//Push the initial walls to the game components
game.components.push(new rectangle(game.getContext(), 500, 0, 80, 250, "#fff", true));
game.components.push(new rectangle(game.getContext(), 500, 450, 80, 250, "#fff", false));

//Function to handle sliding the walls
function handleWalls() {
    //Loop all game components
    game.components.forEach(a => {
        //Check if they are rectangles
        if (a.type == "rectangle") {
            //Update their positions (if a player hits one this prevents it from becoming invisible)
            a.update();
            //Check if overlapping a wall
            if (player.overLap(a)) {
                //Set alive to false
                player.alive = false;
                //Save their score
                lb.saveScore(player.name, player.score);
                //Set the status to over
                return game.status = "over";
            }
            //Slide the walls
            a.slide();
            //Check if the wall is off the screen
            if (a.x <= 0) {
                //Update the score for the wall because we passed it
                player.score++;
                //Remove the wall from the components ultimately removing it fromt he game
                game.components.splice(game.components.indexOf(a), 3);
                //Create our random height for the top wall
                let randomA = Math.floor(Math.random() * (game.canvas.height / 2 - 80)) + 40;
                //Create our random height for the bottom wall
                let randomB = Math.floor(Math.random() * (game.canvas.height / 2 - 80)) + 40;
                //Create the top wall and add it to the components array
                game.components.push(new rectangle(game.getContext(), game.canvas.width, 0, 80, randomA, "#fff", true));
                //Create the bottom wall and add it to the components array
                game.components.push(new rectangle(game.getContext(), game.canvas.width, game.canvas.height - randomB, 80, randomB, "#fff", false));
            }
        }
    });
}

//Our game loop
setInterval(function () {
    //Sanity check for the game state
    if (game.status == "over" || game.status == 'notstarted' || game.status == "notstarted") {
        return;
    }
    //Clear our game area
    game.clear();
    //Handle the walls
    handleWalls();
    //Update the score text
    score.update("Score: " + player.score, 400, 30, 30, "#fff");
    //Update the fps text
    fps.update("FPS: " + game.getFramerate(), 250, 30, 30, "#fff");
    //The player is always falling
    player.fall();
    //Update the players position
    player.update(game.getContext());
}, 15)

//Listen for a click on the page
document.addEventListener('click', function () {
    //If the player has entered their name then we can get started
    if (game.status == 'preped') {
        game.status = 'started';
    }
    //If the game is over then we go back to being prepared
    if (game.status == 'over') {
        game.status = 'preped';
        //Wipe the game components
        game.components = [];
        //Create new initial walls
        game.components.push(new rectangle(game.getContext(), 500, 0, 30, 250, "#fff", true));
        game.components.push(new rectangle(game.getContext(), 500, 450, 30, 250, "#fff", false));
        //Reset alive state
        player.alive = true;
        //Reset score state
        player.score = 0;
    }
    //Sanity check for alive
    if (player.alive) {
        //The player jumps
        player.jump();
    }
})

//Get our name box in the initial popup
var nameBox = document.getElementById('playername');
//Get the close buttom
var closeButton = document.getElementById('closepopup');

//Get the close buttom of the popup
closeButton.addEventListener('click', function() {
    //Hide the popup
    closeButton.parentElement.parentElement.style.display = 'none';
    //Set game status to prepared
    game.status = "preped";
})

//Update the player name when they type
nameBox.onkeyup = function () {
    player.setName(nameBox.value);
}