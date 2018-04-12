//Async function to sleep for x ms
function sleep(ms) {
  //Return a timeout function for x ms
  return new Promise(resolve => setTimeout(resolve, ms))
}

//Create our game area
var gameArea = {
  //Create the canvas for the game
  canvas: document.createElement("canvas"),
  //Current game state
  over: false,
  //Function to start the game
  start: function() {
    //The canvas width
    this.canvas.width = 500
    //The canvas height
    this.canvas.height = 500
    //Make the background grey
    this.canvas.style.background = "#333"
    //Get the canvas context (data)
    this.context = this.canvas.getContext("2d")
    //Add this canvas to the HTML Dom
    document.body.insertBefore(this.canvas, document.body.childNodes[0])
    //Our game update rate
    this.interval = setInterval(updateGameArea, 20)
  },
  //Clear the canvas
  clear: function() {
    //Set the context to nothing
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

function textElement(content, x, y) {
  //Get our game area context
  ctx = gameArea.context
  //Set the font style
  ctx.font = "20px Arial";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText(content, x, y);
  //component update function
  this.update = function(content) {
    //Get our context
    ctx = gameArea.context
    ctx.font = "20px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(content, x, y);
  }
}

//Function to create a game element
function component(name, width, height, color, x, y, borderRadius) {
  this.alive = true
  this.shouldScore = true
  this.score = 0
  //Set component name
  this.name = name
  //Set component width
  this.width = width
  //Set component height
  this.height = height
  //Set component x coord
  this.x = x
  //Set component y coord
  this.y = y
  //Our game area context
  ctx = gameArea.context
  //Fill the context with color
  ctx.fillStyle = color
  //Do the filling at X,Y of XWidth of XHeight
  ctx.fillRect(this.x, this.y, this.width, this.height)
  //Set jumping state to false
  this.jumping = false
  //component update function
  this.update = function() {
    //Get our context
    ctx = gameArea.context
    //Set fill style to color
    ctx.fillStyle = color
    //Do the filling at X,Y of XWidth of XHeight
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
  //Function to move the component by X and Y
  this.move = function(x, y) {
    //Set the X coordinate to move x distance
    this.x += x
    //Set the Y coordinate to move y distance
    this.y += y
  }
  //Function to make component jump
  this.jump = async function() {
    if (!this.alive) {
      return false
    }
    //Set jumping state to true
    this.jumping = true
    //We want to move 30 * 2 spaces up
    for (var i = 0; i < 30; i++) {
      //Sleep to make it smoother
      await sleep(1)
      //Move it up 2 at a time
      this.y -= 2
    }
    //Set jumping state to false after our jump
    this.jumping = false
  }
  //Falling state of the component
  this.fall = async function() {
    if (!this.alive) {
      return false
    }
    if (this.y >= 500 - this.height) {
      this.y = 500 - this.height
      return
    }
    //Check if jumping, if not continue
    if (!this.jumping) {
      //We want to fall 5 spaces, because its always falling unless its jumping smaller is smoother
      for (var i = 0; i < 5; i++) {
        //Sleep for 1ms
        await sleep(1)
        //Move Y by 1 space
        this.y += 1
      }
    }
  }
  //Function to set setDimensions of the component
  this.setDimensions = function(w, h) {
    //Set the width to W
    this.width = w
    //Set the height to H
    this.height = h
  }
  //Function to check if component is overlapping another component
  this.overLap = function(other) {
    return !(other.x > (this.x + this.width) ||
      (other.x + other.width) < this.x ||
      other.y > (this.y + this.height) ||
      (other.y + other.height) < this.y)
  }
}

//Update our game area
function updateGameArea() {
  //Check if game over, early exit
  if (!playerOne.alive) {
    return console.log("GAMEOVER")
  }
  console.log(playerOne.score)
  //Perform overlap check, early exit
  if (playerOne.alive && (playerOne.overLap(wallA) || playerOne.overLap(wallB))) {
    playerOne.alive = false
    return
  }
  if (playerOne.x >= wallA.x && playerOne.shouldScore) {
    playerOne.shouldScore = false
    playerOne.score++
  }
  //Clear game area on frame update
  gameArea.clear()
  //Let player one fall
  playerOne.fall()
  //Check if the walls are
  if (wallA.x <= 0 && wallB.x <= 0) {
    playerOne.shouldScore = true
    //Random height for wall a
    let heightA = Math.floor(Math.random() * (250 - 80)) + 80
    //Random height for wall b
    let heightB = Math.floor(Math.random() * (250 - 80)) + 80
    //Change setDimensions with random height
    wallA.setDimensions(20, heightA)
    //Reset position to right
    wallA.x = 500
    //Change setDimensions with random height
    wallB.setDimensions(20, heightB)
    //Reset position to right
    wallB.x = 500
  }
  //Move left every frame
  wallA.move(-5 - playerOne.score/2, 0)
  //Move left every frame
  wallB.move(-5 - playerOne.score/2, 0)
  //Update component position
  wallA.update()
  //Update component position
  wallB.update()
  playerScore.update("Score: " + playerOne.score)
  //Update component position
  playerOne.update()
}

//Start the game function
function startGame() {
  //Setup the game canvas
  gameArea.start()
  //Setup player 1
  playerOne = new component("player-one", 50, 50, "white", gameArea.canvas.height / 2 - 25, gameArea.canvas.width / 2 - 25)
  //Setup wall a
  playerScore = new textElement('Score: ' + playerOne.score, 400, 20)
  wallA = new component("wallA", 20, 100, "red", 500, 0)
  //Setup wall b
  wallB = new component("wallB", 20, 100, "red", 500, 400)
}

//Register player 1 and player 2 jumpings
document.addEventListener('click', function() {
  playerOne.jump()
})

document.addEventListener('touchend', function() {
  playerOne.jump()
})

//Start the game
startGame()
